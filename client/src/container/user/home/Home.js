import React, { useEffect, useState } from 'react';
import Header from '../../../component/Header';
import {useNavigate} from 'react-router-dom';  //ye next page pr jane k liye 
import axios from 'axios';
import ROUTES from '../../../navigation/Route';
import '../../../styles/Home.css'

function Home() {
const navigate=useNavigate();  //useNavigate --> ye hook hai naxt page pr jane k liye (Universty se Department page pr jana h to use kiya )
const[universities, setUniversities]= useState(null);   //ye hi likha h bs universities ko display krne k liye

function getUniversities() {   //ye all uiversities ko home pr fetch krne k liye bna diya 
  try{
       axios.get("http://localhost:8082/university").then((d)=>{
        setUniversities(d.data.univData);
       });
  } catch(error){
    console.log("Unable to access API!!!");
  }
}
useEffect(()=>{  //iise apne app call kr dega  All getuniversities ko 
  getUniversities();
},[]);    //[]); = ye empty depsndency array bna diya

function renderUiversities(){
  return universities?.map((item)=>{   //ye Loop lga di //(item)= ==> item mai ek ek university ki detail aye gi
   return(
    <div className='col-3'>
  <div class="card">
  <img class="card-img-top" src={"http://localhost:8082/" + item.image} />
  <div class="card-body">
    <h5 class="card-title">{item.name}</h5>
   <a class="btn btn-primary text-white" 
   onClick={()=>{navigate(ROUTES.departmentUser.name + "?id=" + item._id);  //ye query string se pass kr diya //jo Univ. id pass kre uske dep. ane chiye
    }}>View Departments</a>
  </div>
  </div>
    </div>
     )
  })
}

  return (
    <div>
      <div className='home-container'>
      <Header/>
      <div className='row m-2'>{renderUiversities()}</div>
    </div>
    </div>
  )
}

export default Home
