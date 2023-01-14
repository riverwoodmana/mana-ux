import React, {useState} from 'react'
import { Modal } from './Modal'
import axios from 'axios';
const { REACT_APP_BASE_URL } = process.env;

const volunteerForm = {
    display: 'flex',
    width: '200px',
    rowGap: '10px'
}

const volunteerInput = {
    fontSize: '16px',
    borderTop: '0 solid',
    borderLeft: '0 solid',
    borderRight: '0 solid',
    borderBottom: '1px solid #495057',
    color: '#495057',
    outline: 'none'
}

const formSubmit = {
    display: 'grid',
    gridColumn: '1 / span 2',
    border: 'none',
    backgroundColor: '#ffa94d',
    height: '30px'
}

export const VolunteerButton = () => {
    const [isOpen, setIsOpen] = useState(false)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { 
          fullName: "",
          email: "",
          phone: "",
        }
      };

    function sendEmail(e) {
        e.preventDefault();

        //excluding special characters from certain input
        const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
        const regex2 = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
        let newName = e.target.name.value;
        newName = newName.replace(regex, '');
        let newPhone = e.target.phone.value;
        newPhone = newPhone.replace(regex2, '');
        requestOptions.body.fullName = newName;
        requestOptions.body.email = e.target.email.value;
        requestOptions.body.phone = newPhone;
  
        axios.post(REACT_APP_BASE_URL+"api/SendEmail/volunteer", requestOptions).then((response) => {
            console.log(response.data.body);
            console.log(response);
            })
            e.target.reset();
            alert("Volunteer signed up successfully");
          e.target.reset();
      }
  return (
    <div>
        <button className="navBar__button" onClick={() => setIsOpen(true)}>Volunteer</button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <form style={volunteerForm} onSubmit={sendEmail}>
            <input style={volunteerInput} type="text" name="name" placeholder='Full Name'/>
            <input style={volunteerInput} type="email" name="email" placeholder='Email'/>
            <input style={volunteerInput} type="text" name="phone" placeholder='Phone'/>
        <input style={formSubmit} className="formSubmit" type="submit" value="Submit" />
        </form>
        </Modal>
    </div>
  )
}
