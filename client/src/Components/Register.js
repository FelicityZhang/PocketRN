import { withRouter } from 'react-router';
import firebase from '.././firebase.config';
import React, { Component, useEffect} from 'react';
import Appointment from './appointment'
import styled from 'styled-components';
import { Link} from 'react-router-dom';


class Register extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            name: "",
            time: "",
            city: "",
        }
    }

    doctor = this.props.location.state.user
    userAppointments = this.props.appointmentList.filter(appointment=>
        {return appointment.doctor === this.doctor.name})
    
    onFormChange = event => {
        const { name, value } = event.target;
        this.setState( {
            [ name ]: value
        } )
    }
    onFormSubmit = event => {
        event.preventDefault();
        let data = {
            name: this.state.name,
            time: this.state.time,
            city: this.state.city,
            doctor: this.doctor.name,
            status: 'pending'
        }

        let appointmentRef = firebase.database().ref('appintments')
        appointmentRef.push(data)

      this.setState( {
            name: "",
            time: "",
            city: "",
        } )

        this.props.history.push('/appointment/confirm');
    }
    render() {
        // console.log('appointmentList',this.props.appointmentList)
    return(
    <div>
            <div className="createContactPage">
                <h2 className="title">Book an appointment with Dr. {this.doctor.name}</h2>
                <form onSubmit={ this.onFormSubmit } id="bldgForm">
                   <FormField>
                        <label htmlFor="name">Contact Name: </label>
                        <input
                            onChange={ this.onFormChange }
                            type="text"
                            id="newContactName"
                            name="name"
                            placeholder="Contact Name"
                            value={ this.state.name }
                        />
                    </FormField>
                    <FormField>
                        <LabelName>Time: </LabelName>
                        <input
                            onChange={ this.onFormChange }
                            type="text"
                            name="time"
                            placeholder="time"
                            value={ this.state.time }
                        />
                    </FormField>
                    <FormField>
                        <LabelName>city : </LabelName>
                        <input
                            onChange={ this.onFormChange }
                            type="text"
                            name="city"
                            placeholder="City of contact"
                            value={ this.state.city }
                        />
                    </FormField>
                    <div className="control">
                        <button type="submit"> making appointment
                        </button>
                    </div>
                </form>

            </div>

            <DoctorsAppoint>
            <h3>{this.doctor.name}'s Appointments</h3>
                 <AppointsContainer>
                {this.userAppointments && this.userAppointments.map( (appointment,index) => 
                <Appointment appointment={appointment} key={index}/>          
                )
                }
                </AppointsContainer>
            </DoctorsAppoint>
    </div>)
    }
}


export default withRouter( Register );

const AppointsContainer = styled("div")`
    text-decoration: none;
    display:flex;
    flex-direction:row;
    justify-content: center;
    width:80%;
    margin-top:20px;
    flex-wrap:wrap;
`

const DoctorsAppoint = styled("div")`
    display:flex;
    flex-direction:column;
    align-items: center;
    width:100%;
    margin-top:50px;
`

const FormField= styled("div")`
    margin: 10px;
`

const LabelName=styled("label")`
margin-left: 70px;
`