import React, { useState } from 'react'
import Header from '../../component/Header'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import ROUTES from '../../navigation/Route';

function Register() {
  const[form, setForm]= useState({  //ye textboxes k liye save k liye 
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
  });
  const[formError, setFormError]= useState({  //ye textboxes k validation liye k liye 
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
  });
  const navigate = useNavigate(); //next page pr jane k liye Regiater k badd Login page pr jana h

  const changeHandler=(e)=>{   //ye textboxes ka data access krne k liye 
      setForm({...form,[e.target.name]: e.target.value});
  };

  function saveUser(){   //ye New user k register k liye 
    try{
         axios.post("http://localhost:8082/register",form).then((d)=>{
          alert(d.data.message)
          navigate(ROUTES.login.name)  //iise Register k badd Login page pr aajaye gy 
         })
    } catch(error) {
      alert("Faild to submit data");
    }
  }
  function onSubmitUser(){   //ye textbox ki validation k liye 
    let errors= false;
    let error = {
      firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
    };
    if(form.firstName.trim().length==0){
      errors= true;
      error= {...error,firstName: "First name Empty!!"}
    }
    if(form.lastName.trim().length==0){
      errors= true;
      error= {...error,lastName: "Last name Empty!!"}
    }
    if(form.email.trim().length==0){
      errors= true;
      error= {...error,email: "Email Empty!!"}
    }
    if(form.password.trim().length==0){
      errors= true;
      error= {...error,password: "Password Empty!!"}
    }
    if(form.confirmPassword.trim().length==0){
      errors= true;
      error= {...error,confirmPassword: "Confirm Password Empty!!"}
    }
    if(form.password != form.confirmPassword)  //yha check kiya password and confirm password sanme h yaa nhiii
      {
        errors=true;
        error= {...error,confirmPassword:"Password and Confirm Password must be same!!"}
      }
      if(!(form.password.trim().length >= 6 && form.password.trim().length<=12)) //ye password ki length 6 se 12 char. mai honii chiye 
      {
        errors= true;
        error= {...error,password:"Password length b/w 6 to 12 chars long!!!",  
        };
      }
     if(errors) setFormError(error);  //old error messges ko clear kr dega
     else {
      setFormError(error);
      saveUser();  //yha user ko save kr diya 
    }
  }
    return (
    <div>
      <Header/>
      <div className='row p-2 m-2'>
      <div class="card text-center mx-auto">
  <div class="card-header bg-info text-white">
    Register
  </div>
  <div class="card-body">
    <div className='form-group row'>
    <label className='col-4'>First Name</label>
    <div className='col-8'>
    <input type='text' name='firstName' className='form-control' placeholder='First Name' onChange={changeHandler} />
    <p className='text-danger'>{formError.firstName}</p>
    </div>
    </div>
    <div className='form-group row'>
    <label className='col-4'>Last Name</label>
    <div className='col-8'>
    <input type='text' name='lastName' className='form-control' placeholder='Last Name' onChange={changeHandler} />
    <p className='text-danger'>{formError.lastName}</p>
    </div>
    </div>
    <div className='form-group row'>
    <label className='col-4'>Email</label>
    <div className='col-8'>
    <input type='text' name='email' className='form-control' placeholder='email@gmail.com' onChange={changeHandler} />
    <p className='text-danger'>{formError.email}</p>
    </div>
    </div>
    <div className='form-group row'>
    <label className='col-4'>Password</label>
    <div className='col-8'>
    <input type='password' name='password' className='form-control' placeholder='Enter Password' onChange={changeHandler} />
    <p className='text-danger'>{formError.password}</p>
    </div>
    </div>
    <div className='form-group row'>
    <label className='col-4'>Confirm Password</label>
    <div className='col-8'>
    <input type='password' name='confirmPassword' className='form-control' placeholder='Confirm Password' onChange={changeHandler} />
    <p className='text-danger'>{formError.confirmPassword}</p>
    </div>
    </div>
  </div>
  <div class="card-footer text-muted">
    <button className='btn btn-info' onClick={() => {
      onSubmitUser();
    }}>Register</button>
  </div>
</div>
      </div>
    </div>
  )
}

export default Register
