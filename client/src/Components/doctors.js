import firebase from '../firebase.config';
import { Link } from 'react-router-dom';
import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import doctorImg from '../Image/doctorsmile.jpeg'

function Doctors() {
  const [users,setUsers]=useState([])

const fetchUsers=async()=>{
    const db=firebase.firestore();
  const response=db.collection('Users');
  const data=await response.get();
  data.docs.forEach(item=>{
    setUsers(users=>[...users,item.data()])
   })
};

useEffect(() => {
  fetchUsers({});
},[])
// console.log(users)

  return (
    <DoctorsContainer>
      {
        users && users.map(user=>{
          return(
            <DoctorInfo key={user.id} >
              <DoctorImage  src={doctorImg}/>
              <h4>{user.name}</h4>
              <p>{user.type}</p>
              {/* <Link params={user} to={'doctors/' + user.name}>make an appointment</Link> */}
              <ItemContainer 
              key = {user.name}
              to={{
                  pathname:`doctors/${user.name.replace(/\s/g, '')}`,
                  state:{user: user}
                  }}>make an appointment</ItemContainer>
            </DoctorInfo>
          )
        })
      }

  
    </DoctorsContainer>
  );
}

export default Doctors;


const ItemContainer = styled(Link)`
    text-decoration: none;

`
const DoctorsContainer = styled("div")`
    display:flex;
    justify-content: center;
    width:100%;
    margin-top:50px;
`
const DoctorInfo = styled('div')`
    width:220px;
    height:300px;
    background-color:lightgrey;
    margin-left: 50px;
`

const DoctorImage = styled.img`
    width: 100px;
    height: 100px;
    margin: 20px;
`;