import React, { useEffect, useState } from 'react';
import Header from '../../../component/Header';
import { useLocation, useNavigate } from 'react-router-dom';  //useLocation= ye iske liye Autoimport hua
import axios from 'axios';
import ROUTES from '../../../navigation/Route';

function useQuery() {     //useQuery = ye hmne coustom hoock bnaya //query string ko read OR access krne k liye 
  const {search}= useLocation();
  return React.useMemo(() => new URLSearchParams(search),[search]);
}

function Department() {
const navigate= useNavigate();
const query=  useQuery();  //useQuery = ye hmne coustom hoock bnay h yha pr ye var bna diya 
const [departmentId, setDepartmentId]= useState(null);
const [departments, setDepartments]= useState(null); //isme all dep. aye gy

const [form, setForm]= useState({name:"",image:null,university:query.get("universityId"),  ////universityId = Url mai UnivId ara h to likha Or Id hota url mai to Id likhte
 universityName: decodeURIComponent(query.get("name"))});  // Decode the university name  //ye jis univ. pr click kre gy Page pr uska name b display kr daga 
 
const [formError, setFormError]= useState({name:"",image:""});  //ye Name and Image ki validation k liye h

const changeHandeler=(e)=>{
  setForm({...form,[e.target.name]: e.target.value});
};

function getDepartmentsByUniversity() {  //yha All univ. ko display krne k liye 
  try{
     axios.get("http://localhost:8082/department?universityId=" + query.get("universityId"))  //ye yha query string use kiya 
     .then((d)=>{
      setDepartments(d.data.depData);
     });
  } catch(error){
    alert("Fail to submit data");
  }
}

useEffect(()=> {   //useEffect=> ye Hook hai apne ap call hota h 
  getDepartmentsByUniversity();
}, []);  //[]); => ye dependency arry h empty kr diya ek barr apne app call hoga or badd mai kb chng kre gy Save, Edit, Delete to phir tb calll hoga 

function saveDepartment(){    //ye New Department ko save krne ka code h 
  try{
    let formData= new FormData();
    formData.append("name",form.name);  //formData= ye iamage ko save krne k liye 
    formData.append("image", form.image, form.image.name);
    formData.append("universityId",query.get("universityId"));  //ye univ.Id  backend mai Department contoller mai getDepartmet mai likha h 
    axios.post("http://localhost:8082/department",formData,{
      "content.type":"multipart/from-data",
    }).then((d)=>{
      alert(d.data.message);       //ye msg  bckend mai res.status(201).send({message:"university created"}) =tha se aye ga //data = ye data keyword h 
      getDepartmentsByUniversity();    //ye all dep. desplay krne k liye 
      resetForm();    ////formData= ye iamage ko save krne k liye 
    })
  } catch(error){
    alert("Faild to submit data");
  }
}

function resetForm(){      ///ise textbox apne ap empty honge save ,update k badd
  setForm({name:"",image:null, university:query.get("universityId")});   ////ye Save hone k badd name and image box yha null kr diye //universityId= ye query string se aaye ga 
}
function updateDepartment(){    //ye New Department ko Update krne ka code h 
  try{
    let formData= new FormData();
    formData.append("name",form.name);  //formData= ye iamage ko save krne k liye 
    formData.append("image", form.image, form.image.name);
    formData.append("universityId",query.get("universityId"));  //ye univ.Id  backend mai Department contoller mai UpdateDepartmet mai likha h 
    formData.append("id",departmentId)   //ye Update k liye bss id chiye 
    axios.put("http://localhost:8082/department",formData,{
      "content-type":"multipart/from-data",
    }).then((d)=>{
      alert(d.data.message);       //ye msg  bckend mai res.status(201).send({message:"university created"}) =tha se aye ga //data = ye data keyword h 
      getDepartmentsByUniversity();    //ye all dep. desplay krne k liye 
      resetForm();    ////formData= ye iamage ko save krne k liye 
    })
  } catch(error){
    alert("Faild to submit data");
  }
}
function deleteDepartment(id){     //ye Departmet delete ka code h.
  let ans= window.confirm("Want to delete data");   ////detete se phele ye msg. display 
  if(!ans) return;  //yha agr ans null h to yha se hi return 
  try{
       axios.delete("http://localhost:8082/department",{data:{id:id}})
       .then((d)=>{
        alert(d.data.message);
        getDepartmentsByUniversity();  //jaise table mai data delete, update, save kre gy to getAllUNiversities se boo table pr b show and Display ho jaye ga
        resetForm();
       })
  } catch(error){
     alert("Fail to submit data!!!");
  }
}
function onDepartmentSubmit() {   //ye Department im age and name k liye validation k liye 
  let errors= false;
  let error= {name:"",image:""};
  if(form.name.trim().length==0){  //yha check kiya length 0 hai to yha error=true kr diya  and Msg. display
    errors=true;
    error={...error,name:"Department name empty"};
  }
  if(form.image==null){  //yha check kiya agr Image null hai to Msg. display
    errors= true;
    error={...error,image:"Please select image!!!"};  
  }
  if(errors)
    setFormError(error);
  else{  //agr NAme , Image dono Thik hai to yha
    setFormError(error);  // //agr error ne h to old msgs. ko clear kry
    departmentId? updateDepartment():saveDepartment();  //agr DepId hai to Update kre ga or DepId ne h to Save kre ga 
  }
}
function renderDepartments(){
  return departments?.map((item)=>{  //departments?=jo method suru mai bnaya tha getDepartmentsByUniversity ye departments? bna de aye gy//.map((item)=> ye Loop lda diya one univ. mai 4 Dep. hai to ye 4 times chle ga loop
    return(
      <tr>
        <td>
        <img src={'http://localhost:8082/' + item.image} height="150px" width="200px"/>  {/*//yha dep. ki image aajye gi////1st column Image */}  
        </td>
        <td>{item.name}</td>  {/*2nd column isme dep. ka name aajaye ga */}
        <td>
          <button className='btn btn-info' onClick={()=>{
            navigate(ROUTES.productAdmin.name+"?id="+item._id+"&name="+item.name)
          }}>Add Product</button>  {/*3rd column ye Add Prod. ka button */}
        </td>
        <td>
          <button className='btn btn-primary'
          onClick={()=>{
            setDepartmentId(item._id);
            setForm({...form,name:item.name});
          }}>Edit</button>
        </td>
       <td>
       <button className='btn btn-danger'
        onClick={()=>{
          deleteDepartment(item._id);
        }}>Delete</button>
       </td>
      </tr>
    )
  })
}
  return (
    <div>
      <h2>{form.universityName}</h2> {/* Display the decoded university name */}
      <Header/>
      <div className='row p-2 m-2'>
      <div className="card text-center mx-auto">
  <div className="card-header bg-info text-white">
    {departmentId? "Edit Department":"New Department"}
  </div>
  <div class="card-body">
   <div className='form-group row'>
     <label className='col-4'>University Name</label>
     <div className='col-8'>
        <input type='text' value={query.get("name")} disabled className='form-control'/>   {/* ye University name QUery sring se aagye ga //disabled= ye edit nhiii hoga */}
     </div>
   </div>
   <div className='form-group row'>
     <label className='col-4'>Department Name</label>
     <div className='col-8'>
        <input type='text' className='form-control'name='name' placeholder='Enter Name' onChange={changeHandeler} value={form.name} />   
        <p className='text-danger'>{formError.name}</p>  {/* ye iamge and name ki validation k msg. ko display krne k liye  */}
     </div>
   </div>
   <div className='form-group row'>
     <label className='col-4'>Department Image</label>
     <div className='col-8'>
        <input type='file' className='form-control' onChange={(e)=>{   //image ko access krne k liye yha pr hi function bnaye gy
          let file=e.target.files[0];  //file = var liya //yha p ese access hogi image
          setForm({...form,image:file});
        }} />   
        <p className='text-danger'>{formError.image}</p>
     </div>
   </div>
    </div>
  <div className="card-footer text-muted">
    <button className='btn btn-info' onClick={()=>{onDepartmentSubmit();}}>  {/*ye validation k liye yha pr bna  diya onclick */}
      {departmentId? "Update":"Save"}   {/*//id hai to update nhii h id to save  */}
    </button>
  </div>
</div>
      </div>
      <div className='row border p-2 m-2'>
        <table className='table table-border table-striped table-hover'>
         <thead>
          <tr>
            <th>Dpartment Image</th>
            <th>Department Name</th>
            <th>Add Product</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
         </thead>
         <tbody>{renderDepartments()}</tbody>
        </table>
      </div>
    </div>
  )
}

export default Department
