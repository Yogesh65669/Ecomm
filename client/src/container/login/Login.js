import React, { useState } from 'react'
import Header from '../../component/Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import ROUTES from '../../navigation/Route';

function Login() {
  const navigate= useNavigate();   //ye hoock h next page pr jane k liye //USER login k badd home page pr  and ADMIN login k badd UniversityAdmin page pr jaye ga  
 const[form, setForm]= useState({ email:"", password:""});
 const[formError, setFormError]= useState({ email:"", password:""});
 
 const changeHandler= (e) => {  //ye Textbox ka data access krne k liye 
  setForm({...form,[e.target.name]: e.target.value});
 };

 function LoginCheck(){    //ye Login ki API
  try{
    axios.post("http://localhost:8082/login", form).then((d)=>{
      localStorage.setItem("id", d.data.id);     //localStorage == ye local storage mai bna diya .Ab puri application mai use kr lenge 
      localStorage.setItem("role",d.data.role);   //yha Role b bna diya localStorage mai hi //Ye Backend mai User.Controller mai Login action mai bnaya h   
      if(d.data.role == "admin") navigate(ROUTES.universityAdmin.name);  //yha bta diya agr ADMIN Role login krta h to bo universityAdmin page pr chla jaye ga
      else navigate(ROUTES.home.name);  // agr Admin nhii h tooo...USER home page pr chla jaye ga user
    }).catch((e) => {
      alert("Wrong User / Password");   //agr glt username and password h to ye
      setForm({ email:"", password:""});
    })
  } catch(error) {
    alert(error?.message);
  }
 }
function onLoginSubmit() {   //ye email and password ki validation k liye 
  let errors= false;
  let error= {email:"", password:""};
  if(form.email.trim().length == 0) {  
    errors= true;
    error= {...error, email: "Email Empty"};
  }
  if(form.password.trim().length == 0) {
    errors= true;
    error= {...error, password: "Password Empty"};
  }
  if(errors) setFormError(error);  //kuch or glt hai to yha 
    else 
  {
    setFormError(error);  //yha old Errors ko clear kr diya 
    LoginCheck();  //ye tha Login kr diya Login check ko cll kr diya 
  }
}
  return (
    <div>
      <Header/>
      <div className='row p-2 m-2'>
      <div class="card text-center mx-auto">
  <div class="card-header bg-success text-white">
    Login
  </div>
  <div class="card-body">
    <div className='form-group row'>
    <label className='col-4'>UserName</label>
    <div className='col-8'>
    <input type="text" name='email' className='form-control' placeholder='Enter username' onChange={changeHandler} value={form.email} />
    <p className='text-danger'>{formError.email}</p>
    </div>
    </div>
    <div className='form-group row'>
    <label className='col-4'>Password</label>
    <div className='col-8'>
    <input type="password" name='password' className='form-control' placeholder='Enter Password' onChange={changeHandler} value={form.password} />
    <p className='text-danger'>{formError.password}</p>
    </div>
    </div>
  </div>
  <div class="card-footer text-muted">
    <button className='btn btn-success' onClick={() => {
      onLoginSubmit();
    }}>Login</button>
  </div>
</div>
      </div>
    </div>
  )
}

export default Login
