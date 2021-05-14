import './App.css';
import {Switch, Route } from 'react-router-dom';
import Doctors from './Components/doctors.js'
import Register from './Components/Register.js'
import React,{useState,useEffect} from 'react';
import firebase from './firebase.config';
import CancelledPage from './Components/cancelledPage'
import ApprovedPage from './Components/approvedPage'
import Confirmpage from './Components/confirmpage.js'


function App() {
  const [appointmentList, setAppointmentList] = useState()
 
const fetchAppointments=async()=>{
  const appointmentsRef = firebase.database().ref('appintments')
   await appointmentsRef.on('value', (appointment)=>{
    console.log('cnsjdcndsc',appointment.val())
    const appointments = appointment.val()
    const appointmentList = []
    for(let id in appointments){
        appointmentList.push({id,...appointments[id]})
        // appointmentList.push(appointments[id])

    }
    setAppointmentList(appointmentList)
    console.log(appointmentList)
})
}

  useEffect(()=>{
    fetchAppointments({})
},[]
)
  return (
    <div className="App">
      <header className="App-header">
        <div>Make an appointment</div>
      </header>
        <Switch>
          <Route exact path='/' render={ () => <Doctors /> } />
          <Route path='/doctors/:id' render={ () => <Register appointmentList={appointmentList}/> } />
          <Route  path='/appointment/cancelled' render={ () => <CancelledPage /> } />
          <Route  path='/appointment/approved' render={ () => <ApprovedPage /> } />
          <Route  path='/appointment/confirm' render={ () => <Confirmpage /> } />
        </Switch>
    </div>
  );
}

export default App;