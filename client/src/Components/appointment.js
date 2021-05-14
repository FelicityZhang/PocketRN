import firebase from '.././firebase.config';
import React from 'react'
import { Link} from 'react-router-dom';
import styled from 'styled-components';


export default function Appointment({appointment}) {

 const cancelAppointment = () =>{
        let appointmentRef = firebase.database().ref("appintments").child(appointment.id)
         appointmentRef.update({status: 'cancelled'})
        //  appointmentRef.remove()
     }
 
  const approveAppointment = () =>{
    let appointmentRef = firebase.database().ref("appintments").child(appointment.id)

    appointmentRef.update({status: 'approved'})
     }

    if(appointment.status=='pending')
    return (
        <ItemContainer>
           <h4>{appointment.name}</h4>
           <h6>Time: {appointment.time}</h6>
            <h6>Location: {appointment.city}</h6>
           <ChangeStatus>
           <Link to='/appointment/cancelled'>
            <button onClick={cancelAppointment}>Cancel</button>
            </Link>
            <Link to='/appointment/approved'>
            <button onClick={approveAppointment}>Approve</button>
            </Link>
            </ChangeStatus>
        </ItemContainer>
    )
    if(appointment.status=='cancelled' || 'approved')
    return(
            <ItemContainer>
            <h4>{appointment.name}</h4>
            <h7>Status: {appointment.status}</h7>
            <h6>Time: {appointment.time}</h6>
            <h6>Location: {appointment.city}</h6>
            </ItemContainer>
       )
}


const ItemContainer = styled("div")`
    width: 180px;
    height: 200px;
    margin-top:15px;
    margin-left:20px;
    background-color:lightblue
`

const ChangeStatus =  styled("div")`
display:flex;
flex-direction:row;
justify-content: space-around;
margin-top: 10px;
margin-left:20px;
width:80%;
`