import React, {useState} from 'react';
import useAuth from '../hooks/useAuth';
import { Modal } from './Modal';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const { REACT_APP_BASE_URL } = process.env;

const adminForm = {
    display: 'flex',
    width: '200px',
    rowGap: '10px'
}

const input = {
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



export const AdminButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {setAuth} = useAuth();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const nav = useNavigate();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { 
        username: "",
        password: "",
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      requestOptions.body.username = user;
      requestOptions.body.password = pwd;

      axios.post(REACT_APP_BASE_URL+"api/Auth/Authenticate", requestOptions).then((response) => {
          if(response.data){
            setAuth({user});
            //navigate to admin if successful sign in
            nav('/Admin');
          }else{
            alert("Username and password incorrect");
          }
        })
      setUser('');
      setPwd('');
    }
     
  return (
    <div>
        <button className="navBar__button" onClick={() => setIsOpen(true)}>Admin</button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <form style={adminForm} onSubmit={handleSubmit}>
          <input 
            style={input} 
            type="text" 
            name="username" 
            placeholder='Username' 
            onChange={(e) => setUser(e.target.value)} 
            value={user}
            required/>
          <input 
            style={input} 
            type="password" 
            name="password" 
            placeholder='Password'
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required/>
        <input style={formSubmit} className="formSubmit" type="submit" value="Submit" />
        </form>
        </Modal>
    </div>
  )
}