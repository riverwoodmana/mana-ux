import React, {useState} from 'react'
import { Modal } from './Modal'
import axios from 'axios';
const { REACT_APP_BASE_URL } = process.env;

const RequestForm = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  width: '550px',
  columnGap: '10px',
  marginBottom: '10px',
}

const RequestFormStart = {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '8px',
}

const RequestFormEnd = {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '5px'
}

const RequestInput = {
  fontSize: '16px',
  borderTop: '0 solid',
  borderLeft: '0 solid',
  borderRight: '0 solid',
  borderBottom: '1px solid #495057',
  color: '#495057',
  outline: 'none'
}

const RequestInputInterval = {
  fontSize: '16px',
  borderTop: '0 solid',
  borderLeft: '0 solid',
  borderRight: '0 solid',
  borderBottom: '0 solid',
  color: '#495057',
  outline: 'none',
}

const RequestInputIntervalSpan = {
  marginRight: '5px'
}

const RequestInputIntervalSelect = {
  fontSize: '16px',
  borderTop: '0 solid',
  borderLeft: '0 solid',
  borderRight: '0 solid',
  borderBottom: '1px solid #495057',
  color: '#495057',
  outline: 'none'
}

const RequestInputNumberContainer = {
  display: 'flex',
  justifyContent: 'space-between'
}

const RequestInputNumber = {
  fontSize: '16px',
  borderTop: '0 solid',
  borderLeft: '0 solid',
  borderRight: '0 solid',
  borderBottom: '1px solid #495057',
  color: '#495057',
  outline: 'none',
  width: '40px'
}

const RequestInputLabel = {
  fontSize: '16px',
  color: '#495057',
  display: 'flex',
  gap: '5px'
}

const RequestDate = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
}

const formSubmit = {
  display: 'grid',
  gridColumn: '1 / span 2',
  border: 'none',
  backgroundColor: '#ffa94d',
  height: '30px'
}

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
const today = new Date();
const minimumDate = today.addDays(5);
const alertDay = today.addDays(6);
const day = minimumDate.getDate();
const month = minimumDate.getMonth() + 1;
const year = minimumDate.getFullYear();
const minDateAlert = `${month}-${alertDay}-${year}`;
const minDate = new Date(`${year}-${month}-${day}`);


export const RequestButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  //setting up object to be sent to back end
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { 
      fullName: "",
      street: "",
      city: "",
      zip: "",
      email: "",
      phone: "",
      adults: 1,
      kids: 0,
      interval: "",
      startDate: "",
      dropOff: "",
      dietaryRestrictions: "",
      specialRequests: "" 
    }
  };

  //function to check the date to verify it is at least 7 days in the future
    function checkDate(){
      let input = document.getElementsByName("startDate");
      let form = document.getElementsByName("form");
      let chosenDate = new Date(form[0].startDate.value);
      let day = chosenDate.getDate();
      let month = chosenDate.getMonth() + 1;
      let year = chosenDate.getFullYear();
      let chosenDateCompare = new Date(`${year}-${month}-${day}`);

      if(chosenDateCompare > minDate){
        input[0].setCustomValidity('');
      }else{
        input[0].setCustomValidity('Please choose date after ' + minDateAlert);
      }
      input[0].reportValidity();
    }

    function sendEmail(e) {
      e.preventDefault();

      //excluding special characters from certain input
      const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
      const regex2 = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
      let newName = e.target.name.value;
      newName = newName.replace(regex, '');
      let newPhone = e.target.phone.value;
      newPhone = newPhone.replace(regex2, '');
      //setting data with values from form
      requestOptions.body.fullName = newName;
      requestOptions.body.street = e.target.street.value;
      requestOptions.body.city = e.target.city.value;
      requestOptions.body.zip = e.target.zipcode.value;
      requestOptions.body.email = e.target.email.value;
      requestOptions.body.phone = newPhone;
      requestOptions.body.adults = e.target.adults.value;
      requestOptions.body.kids = e.target.kids.value;
      requestOptions.body.interval = e.target.interval.value;
      requestOptions.body.startDate = e.target.startDate.value;
      requestOptions.body.dropOff = e.target.dropOff.value;
      requestOptions.body.dietaryRestrictions = e.target.diet.value;
      requestOptions.body.specialRequests = e.target.special.value;

      let chosenDate = new Date(e.target.startDate.value);
      let day = chosenDate.getDate();
      let month = chosenDate.getMonth() + 1;
      let year = chosenDate.getFullYear();
      let chosenDateCompare = new Date(`${year}-${month}-${day}`);
      
      //checks if date chosen is after 7 days
      if(chosenDateCompare > minDate){
        //connection to backend
        axios.post(REACT_APP_BASE_URL+"api/SendEmail/create", requestOptions).then((response) => {
        //you need to drill down into the data field you want in the response
        console.log('Response 1:'+response.data.fullName);
        console.log(response);
        })
        e.target.reset();
        alert("Request submitted successfully");
      }
    }
return (
  <div>
      <button className="navBar__button" onClick={() => setIsOpen(true)}>Request</button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={sendEmail} name="form">
          <div style={RequestForm}>
            <div style={RequestFormStart}>
              <input style={RequestInput} type="text" name="name" placeholder='Full Name' required/>
              <input style={RequestInput} type="text" name="street" placeholder='Street' required/>
              <input style={RequestInput} type="text" name="city" placeholder='City' required/>
              <input style={RequestInput} type="text" name="zipcode" placeholder='Zip Code' required/>
              <input style={RequestInput} type="email" name="email" placeholder='Email' required/>
              <input style={RequestInput} type="text" name="phone" placeholder='Phone' required/>
              <div style={RequestInputNumberContainer}>
                <span style={RequestInputLabel}>
                  <label>Adults:</label>
                  <input style={RequestInputNumber} type="number" name="adults" placeholder='0' min="1" max="10" required/>
                </span>
                <span style={RequestInputLabel}>
                  <label>Kids:</label>
                  <input style={RequestInputNumber} type="number" name="kids" placeholder='0' min="0" max="10"/>
                </span>
              </div>
              <div style={RequestInputNumberContainer}>
                <span style={RequestInputInterval}>
                  <label style={RequestInputIntervalSpan}>Delivery Interval:</label>
                  <select name="interval" id="interval" style={RequestInputIntervalSelect}>
                    <option value="continuous">Every day</option>
                    <option value="everyother">Every other day</option>
                  </select>
                </span>
              </div>
              <span style={RequestDate}>
                <label>5 day train start date:</label>
                <input style={RequestInput} type="date" name="startDate" id='startDate' min={minDate} required/>
              </span>
              <span style={RequestDate}>
                <label>Drop off time 4pm-8pm:</label>
                <input style={RequestInput} type="time" name="dropOff" min="16:00" max="20:00" required/>
              </span>
            </div>
            <div style={RequestFormEnd}>
              <span>
                <label>Dietary Restrictions:</label>
                <textarea rows="9" cols="35" name="diet" placeholder='ex. No dairy'></textarea>
              </span>
              <span>
                <label>Special Requests/Other Notes:</label>
                <textarea rows="9" cols="35" name="special" placeholder='ex. Phone call before showing up'></textarea>
              </span>
            </div>
          </div>
          <input onClick={checkDate} style={formSubmit} className="formSubmit" type="submit" value="Submit" />        
        </form>
      </Modal>
  </div>
)
}
