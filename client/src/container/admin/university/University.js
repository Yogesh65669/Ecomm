import React, { useEffect, useState } from 'react';
import Header from '../../../component/Header';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import ROUTES from '../../../navigation/Route';
// import '../../../styles/UniversityAdmin.css'

function University() { 
const[UniversityId,setUniversityId]= useState(null);   //ye Id update k liye 
const[Universities,setUniversities]= useState(null);   //ye var Display k liye  
const[form,setform]= useState({name:"", image:null}); //isme data aye ga 
const[formError,setformError]= useState({name:"", image:null});   //ye var image validation k liye 
const navigate= useNavigate();   //navigate = this hook us use to go on another page 

useEffect(()=>{  //ye Hook hai iise apne ap getAllUniversity function call hoga.  
  getAllUniversities();    //yha getAlluniversities ko call kr diya 
}, []);   // ()=>{  --> ye dependency array h ye emplty kr diya //ye ek hi barr call hoga jb iss component ko use kr gy or badd mai jb hm isme kuch change kre gy

const changeHandler=(e)=>{  //yha aero function bna diya 
  setform({...form,[e.target.name]: e.target.value});
};

function saveUniversity(){    //ye new university save ka code 
  try{
    let formData=new FormData();
    formData.append("name",form.name); 
    formData.append("image", form.image, form.image.name);  //formData= ye iamage ko save krne k liye 
    axios.post("http://localhost:8082/university",formData, {
      "content.type": "multipart/from-data",
    }).then((d)=>{
      alert(d.data.message)  //ye msg  bckend mai res.status(201).send({message:"university created"}) =tha se aye ga //data = ye data keyword h 
      getAllUniversities();   //jaise table mai data delete, update, save kre gy to getAllUNiversities se boo table pr b show and Display ho jaye ga  
      resetForm();   //formData= ye iamage ko save krne k liye 
    })
  } catch(error){  
    alert("Faild to submit data !!");
  }
}
function updateUniversity(){    //ye Update university ka code 
  try{
    let formData=new FormData();
    formData.append("name",form.name); 
    formData.append("image", form.image, form.image.name);  //formData= ye iamage ko save krne k liye 
    formData.append("id",UniversityId); //ye Id Update k liye chiye 
    axios.put("http://localhost:8082/university",formData, {
      "content.type": "multipart/from-data",
    }).then((d)=>{
      alert(d.data.message)  //ye msg  bckend mai res.status(201).send({message:"university created"}) =tha se aye ga //data = ye data keyword h 
      getAllUniversities();   //ye get all univ. k liye 
      resetForm();   //ye save k badd textbox khali ho jaye 
    })
  } catch(error){  
    alert("Faild to submit data !!");
  }
}
function deleteUniversity(id){    //ye University delet ka code h
     let ans= window.confirm("want to delete data");  //detete se phele ye msg. display 
     if(!ans) return;  //yha agr ans null h to yha se hi return 
     try{
      axios.delete("http://localhost:8082/university",{data:{id:id}})
      .then((d)=>{
        alert(d.data.message);
        getAllUniversities();
        resetForm();
      });
  } catch(error){
    alert("Faild to submit data!!!");
  }
}
function getAllUniversities(){     //ye University display k lye
  try{
       axios.get("http://localhost:8082/university").then((d)=>{
         setUniversities(d.data.univData);   //backend msg. display
       });
  } catch(error){
     alert("Faild to submit data!!!");
  }
}
function resetForm(){  //ise textbox apne ap empty honge save ,update k badd
  setform({name:"",image:null});  //ye name and image box yha null kr diye 
};



function onUnivetsitySubmit(){   //ye university name and image ki valisation k liye 
  let errors= false;
  let error={name:"",image:""};
  if(form.name.trim().length==0) { //yha check kiya length 0 hai to yha error=true kr diya
    errors=true;   //yha p error true kr diya 
  error={...error,name:"University name empty"};  //ne kiya h univ name enter to ye msg. display ho jaye ga 
  }
  if(form.image==null){   //ye image ki validation k liye
    errors=true;
    error={...error,image:"Please select image"}
  } 
  if(errors) 
    setformError(error);  //agr kuch empty h to yha se error aajaye ga //setformError= ye upr likha h 
  else
  {   //agr esa ne h
    setformError(error)  //agr error ne h to old msgs. ko clear kry
    UniversityId ? updateUniversity() : saveUniversity();  //agr univId hai to Update kre ga or UnivId niii h to Save kre 
  }
} 
function renderUniversities(){
  return Universities?.map((item)=>{   //.map((item)=>{   ----> ye Lopp lga diya 
    return(
      <tr>
        <td>
           <img src={"http://localhost:8082/"+item.image}/>  {/*ye !st column h image ka//ye image display krani h sbse  phele to ye ismage k liye */}
        </td>
        <td>{item.name}</td>  {/* ye h 2nd column//ye University name display k liye*/}  
        <td>
          <button className='btn btn-info'
          onClick={()=>{
            navigate(   //ye Navigate upr Hooks mai liya h //jaise Angular mai ROuter use hota h 
              ROUTES.departmentAdmin.name+ //ROUTS= ye route Files se yah //departmentAdmin = ye column liya h// name = isme URL ka nam h
              "?universityId="+  //ye QUery qtring 
               item._id+   //ye UnivId item._id se aaye ga
              "&name="+item.name); //item.name=url mai university ka name b leke ajna h // & = ye multipal university hai is liye use hota h....
          }}>Add Department</button>  {/*ye 3rd column addDepartment k button k kiye  */}
        </td>
        <td>
          <button className='btn btn-primary'
          onClick={()=>{
            setUniversityId(item._id);
            setform({...form,name:item.name});
            }}>Edit</button>
        </td>
        <td>
          <button className='btn btn-danger'
          onClick={()=>{
            deleteUniversity(item._id);
          }}>Delete </button>
        </td>
      </tr>
    )
  })
}
 return (
    <>
       <h2>Admin University</h2>  {/*ye page pr sbse upr display hoga  */}
       <div className='universityAdmin-container'>
      <Header/>
       <div className='row p-2 m-2'> 
        <div class="card text-center mx-auto">
       <div class="card-header bg-info">{UniversityId? "Edit University":"New University"}</div>  {/* agr univId hai to Edit or ne h to add new univ */}
      <div class="card-body">
      <div className='form-group row'>
       <label className='col-4'>University Name</label>
       <div className='col-8'>
        <input type='text' name='name' className='form-control' placeholder='Enter Name' onChange={changeHandler} value={form.name}/>
         <p className='text-danger'>{formError.name}</p>  {/* ye iamge and name ki validation k msg. ko display krne k liye  */}
       </div>
      </div>
      <div className='form-group row'>
       <label className='col-4'>University Image</label>
       <div className='col-8'>
        <input type='file' className='form-control' onChange={(e)=>{  //image ko access krne k liye yha pr hi function bnaye gy
         let file = e.target.files[0]; //file = var liya //yha p ese access hogi image 
         setform({...form,image: file});
        }} />
        <p className='text-danger'>{formError.image}</p>
       </div>
      </div>
  </div>
  <div class="card-footer text-muted">
    <button className='btn btn-info' onClick={()=>{onUnivetsitySubmit();}}>   {/*ye validation k liye yha pr bna  diya onclick */}
       {UniversityId ? "Update":"Save"}  {/*//id hai to update nhii h id to save  */}
    </button>
  </div>
  </div>
    </div>
    <div className='border p-2 m-2'>   {/* yah se h employee Table start*/}
  <table className='table table-border table-striped table-active'>   
<thead>
  <tr>
    <th>University Image</th>
    <th>University Name</th>
    <th>Add department</th>
    <th>Edit</th>
    <th>Delete</th>
  </tr>
</thead>
<tbody>{renderUniversities()}</tbody>  {/*ye func. upr bnaya h = isme data display krana h Loop lga k*/ }
  </table>
  </div>
  </div>
    </>
  )
}

export default University


