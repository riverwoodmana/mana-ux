import { Header } from "./components/Header";
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Modal } from './components/Modal';
const { REACT_APP_BASE_URL } = process.env;

function Admin() {
    const container = {
        display: 'flex',
        columnGap: '30px',
        justifyContent: 'center',
        padding: '50px 0'
    }

    const refresh = {
        display: 'flex',
        columnGap: '100px',
        alignItems: 'center'
    }

    const refreshButton = {
        border: '1px solid black',
        backgroundColor: '#ffa94d',
        height: '30px',
        borderRadius: '4px',
        cursor: 'pointer'
    
    }

    const volunteers = {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        minWidth: '500px',
        border: '2px solid black',
        minHeight: '950px',
        alignItems: 'center',
        paddingBottom: '50px'
        
    }
    const v_volunteers = {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '460px',
        border: '2px solid black',
        height: '400px',
        overflow: 'auto',
        backgroundColor: 'white',
        paddingLeft: '10px',
    }



    const requests = {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        minWidth: '500px',
        border: '2px solid black',
        minHeight: '950px',
        alignItems: 'center'
        
    }

    const [vol, set_vol] = useState([]);
    const [unv_vol, setunv_vol] = useState([]);
    const [req, set_req] = useState([]);
    const [unv_req, setunv_req] = useState([]);
    const [voldata, set_voldata] = useState([]);
    const [reqdata, set_reqdata] = useState([]);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);


      const modal = {
        height: '300px',
        width: '350px',
        padding: '10px',
        borderRadius: '4px',
      }

    function refreshVol(){
        getVolunteers();
        getVolunteersUnverified();
    }

    function refreshReq(){
        getRequests();
        getRequestsUnverified();
    }

    async function getVolunteerSingle(e) {
        e.preventDefault();
        await axios.get(REACT_APP_BASE_URL+"api/sendemail/volunteer/get/"+e.target.id.value).then((response) => {
          console.log(response.data);
          set_voldata(response.data);
          })
          console.log(voldata);
          setIsOpen1(true);
          e.target.reset();
      }
      async function getRequestSingle(e) {
        e.preventDefault();
        await axios.get(REACT_APP_BASE_URL+"api/sendemail/create/get/"+e.target.id.value).then((response) => {
            console.log(response.data);
            set_reqdata(response.data);
          })
          console.log(reqdata);
          setIsOpen2(true);
          e.target.reset();
      }

    function verifyVol(e){
        e.preventDefault();
        axios.post(REACT_APP_BASE_URL+"api/SendEmail/volunteer/"+e.target.id.value, requestOptions).then((response) => {
            console.log(response);
        })
        e.target.reset();
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: { 
          id: "",
          link: ""
        }
      };

    function verifyReq(e){
        e.preventDefault();

        requestOptions.body.id = e.target.id.value;
        requestOptions.body.link = e.target.link.value;
        axios.post(REACT_APP_BASE_URL+"api/SendEmail/create/verify", requestOptions).then((response) => {
            console.log(response);
        })
        e.target.reset();

    }
    
    async function getVolunteers() {
        await axios.get(REACT_APP_BASE_URL+"api/SendEmail/volunteerVerified").then((response) => {
          set_vol(response.data);
          })
      }

    async function getVolunteersUnverified() {
        await axios.get(REACT_APP_BASE_URL+"api/SendEmail/volunteerUnverified").then((response) => {
            setunv_vol(response.data);
            })
    }

    async function getRequests() {
        await axios.get(REACT_APP_BASE_URL+"api/SendEmail/requestVerified").then((response) => {
            set_req(response.data);
            })
    }

    async function getRequestsUnverified() {
        await axios.get(REACT_APP_BASE_URL+"api/SendEmail/requestUnverified").then((response) => {
            setunv_req(response.data);
            })
    }

    //Run functions on mount to pull in all data
    useEffect(() =>{
        getVolunteers();
        getVolunteersUnverified();
        getRequests();
        getRequestsUnverified();
    },[]);

    return (
        <div className="container">
        <Header />
            <div style={container}>
                <div style={volunteers}>
                    <div style={refresh}><h1>Volunteers</h1><button style={refreshButton} onClick={refreshVol}>Refresh</button></div>
                    <span>Verified Volunteers</span>
                    <form onSubmit={getVolunteerSingle}><input type="text" name="id" placeholder="Volunteer ID" required/><button>Get Details</button></form>
                    <div style={v_volunteers}>{vol.map((volunteer,index)=>(
                        <p key={index}>{volunteer.id} : {volunteer.name}</p>
                    ))}</div>
                    <span>Unverified Volunteers</span>
                    <form onSubmit={verifyVol}><input type="text" name="id" placeholder="Volunteer ID"/><button>Verify Volunteer</button></form>
                    <div style={v_volunteers}>{unv_vol.map((unv_volunteer,index)=>(
                        <p key={index}>{unv_volunteer.id} : {unv_volunteer.name}</p>
                    ))}</div>
                </div>
                <div style={requests}>
                <div style={refresh}><h1>Requests</h1><button style={refreshButton} onClick={refreshReq}>Refresh</button></div>
                    <span>Verified Requests</span>
                    <form onSubmit={getRequestSingle}><input type="text" name="id" placeholder="Request ID" required/><button>Get Details</button></form>
                    <div style={v_volunteers}>{req.map((req,index)=>(
                        <p key={index}>{req.id} : {req.name}</p>
                    ))}</div>
                    <span>Unverified Requests</span>
                    <form onSubmit={verifyReq}><input type="text" name="id" placeholder="Request ID" required/><input type="text" name="link" placeholder="Meal Train link" required/><button>Verify Request</button></form>
                    <div style={v_volunteers}>{unv_req.map((unv_req,index)=>(
                        <p key={index}>{unv_req.id} : {unv_req.name}</p>
                    ))}</div>
                </div>
            </div>
            <Modal open={isOpen1} onClose={() => setIsOpen1(false)}>
                <div style={modal}>
                    ID: {voldata.id}<br/> 
                    Name: {voldata.name}<br/> 
                    Phone: {voldata.phone}<br/> 
                    Email: {voldata.email}<br/> 
                    Que: {voldata.que}<br/> 
                    Verified: {voldata.verified}
                </div>
            </Modal>
            <Modal open={isOpen2} onClose={() => setIsOpen2(false)}>
                <div style={modal}>
                ID: {reqdata.id}<br/>
                Name: {reqdata.name}<br/> 
                Phone: {reqdata.phone}<br/> 
                Email: {reqdata.email}<br/> 
                Meal Train Link: {reqdata.url}<br/> 
                Volunter 1 ID: {reqdata.v1}<br/> 
                Volunter 2 ID: {reqdata.v2}<br/>
                Volunter 3 ID: {reqdata.v3}<br/>
                Volunter 4 ID: {reqdata.v4}<br/>
                Volunter 5 ID: {reqdata.v5}<br/>
                Verified: {reqdata.verified}
                    
                </div>
            </Modal>
        </div>
    )
}

export default Admin;