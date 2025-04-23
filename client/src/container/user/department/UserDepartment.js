import React, { useEffect, useState } from 'react'
import Header from '../../../component/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import ROUTES from '../../../navigation/Route';
import '../../../styles/UserDepartment.css'

function useQuery(){
  const{search}= useLocation();
  return React.useMemo(()=>new URLSearchParams(search),[search]);
 }

 function UserDepartment() {
  const query= useQuery();
  const navigate= useNavigate();  //useNavigate-->ye hoock Next page pr jane k liye //Dep. se product page pr jana h
  const[departments, setDepartments]= useState(null);   //ye All departmrnts ko display krne k liye

  function getDepartmentsByUniversity(){  //ye all dep ko display and fetch krne k liye 
    try{
         axios.get("http://localhost:8082/department?universityId="+ query.get("id"))  //ye String Query se university k hissab se Dep. aye gy..
         .then((d)=>{
          setDepartments(d.data.depData);
         });
    } catch(error) {
      console.log("Unable to fetch Departments!!!");
    }
  }

  useEffect(()=>{    //useEffect--> ye Hoock hai apne ap call hoge iise 
    getDepartmentsByUniversity();   //ye apne ap call hoga 
  },[]);

  function renderDepartments(){   
    return departments?.map((item)=>{
      return(
        <div className='col-3'>
        <div class="card">                                       
  <img class="card-img-top" src={"http://localhost:8082/" + item.image} />  {/* image size--> height="150px" width="200px"// ab  dep. ki image display ho gyi cards mai  */}
  <div class="card-body">
    <h5 class="card-title">{item.name}</h5>
    <a  class="btn btn-primary text-white" onClick={()=>{
      navigate(ROUTES.productUser.name + "?id=" +(item._id)); // koi error aya to yha check krne h 
    }}>View Products</a>
  </div>
</div>
        </div>
      )
    })
  }
  return (
    <div>
      <div className='userDepartment-container'>
      <Header/>
      <div className='row m-2'>{renderDepartments()}</div>
    </div>
    </div>
  )
}

export default UserDepartment
