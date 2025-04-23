import React, { useEffect, useState } from 'react'
import Header from '../../../component/Header'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

function useQuery(){       //useQuery = ye hmne coustom hoock bnaya //query string ko read OR access krne k liye 
  const {search}= useLocation();
  return React.useMemo(()=> new URLSearchParams(search),[search]);
}

function Product() {
const query= useQuery();
const[productId, setProductId]= useState(null);   //ye Id Update and delete k liye liya 
const[products, setProducts]= useState(null);  //isme all product aaye gy
const[form, setForm]= useState({  ///isme data aye ga  
  name:"",
  images:null,
  departmentId:query.get("id"),  ////universityId = Url mai UnivId ara h to likha Or Id hota url mai to Id likhte
  description:"",
  qty:10,
  price:0
});
const[formError, setFormError]= useState({  //ye Validation k liye 
  name:"",
  images:"",
  description:"",
  qty:"",
  price:"",
});
function getProductsByDepartment(){    //ye All products ko display/fetch kerne k liye 
  try{
    axios.get("http://localhost:8082/product?departmentId="+query.get("id"))  //ye query sting se access kiya
    .then((d)=>{
      setProducts(d.data.prodData);
    });
  } catch(error){
    alert("Unable to access API!!!");
  }
}
useEffect(()=>{  //useEffect= ye hoock hai ek barr apne app call honge all products then phir jab hm change kre gy tb honge
  getProductsByDepartment();  //ye upr bnaya function apne ap call hoga ab 
},[]);  //[]); => ye dependenct array bna  diya empty, 

function saveProduct(){    //ye Product save ka code 
  try{
    const formData= new FormData();
    for(let i=0; i < form.images.length;i++){    //ye products ki multipal images hongi to Loop lga diya 
      formData.append("images", form.images[i],form.images[i].name); 
      formData.append("name", form.name);
      formData.append("description",form.description);
      formData.append("price", form.price);
      formData.append("qty",form.qty);
      formData.append("departmentId",query.get("id")) 
      axios.post("http://localhost:8082/product",formData,{
        "content-type":"multipart/form-data",
      }).then((d)=>{
        alert(d.data.message);
        getProductsByDepartment();
        resetForm();  //ye niche bnaya h function
      })
    }
  } catch(error){
alert("Faild to submit data");
  }
}
function updateProduct(){    //ye Product Update ka code 
  try{
    const formData= new FormData();
     for(let i=0; i < form.images.length;i++){    //ye products ki multipal images hongi to Loop lga diya 
      formData.append("images", form.images[i],form.images[i].name); 
      formData.append("name", form.name);
      formData.append("description",form.description);
      formData.append("price", form.price);
      formData.append("qty",form.qty);
      formData.append("departmentId",query.get("id")) 
      formData.append("id",productId);
      axios.put("http://localhost:8082/product",formData,{
        "content-type":"multipart/form-data",
      }).then((d)=>{
        alert(d.data.message);
        getProductsByDepartment();
        resetForm();  //ye niche bnaya h function
      })
    }
  } catch(error){
alert("Faild to submit data");
  }
}

function resetForm(){  //resetForm => ye save k badd textbox empty ka code 
setForm({
  name:"",
  images:null,
  departmentId:query.get("id"),
  description:"",
  qty:10,
  price:0,
})
}
function deleteProduct(id){    //ye Product delete ka code 
  let ans= window.confirm("Want to delete data");   ////detete se phele ye msg. display 
  if(!ans) return;  //yha agr ans null h to yha se hi return 
  try{
      axios.delete("http://localhost:8082/product",{data:{id:id}})   //{data:{id:id}})--> ye delete k liye yha id pass kr di 
      .then((d)=>{
        alert(d.data.message);
        getProductsByDepartment();
        resetForm();  
      })
  } catch(error){
    alert("Faild to submit data");
  }
}
function onProductSubmit(){

  let errors= false;  //ye var. liya or false kr diya 
  let error= {name:"",images:"",description:"",qty:"",price:""};  //ye name k liye 
  if(form.name.trim().length == 0){  //agr lenth 0 hai to niche errors= true kr diya 
    errors= true;
    error={...error,name:"Product name Empty!!!"};  //ye msg. display
  }
  if(form.description.trim().length == 0){
    errors= true;
    error={...error,description:"Product description Empty!!!"};  //ye msg. display
  }
  if(form.qty == "" || form.qty == 0){
    errors= true;
    error={...error,qty:"Please enter quantity!!!"};  //ye msg. display
  }
  if(form.price == "" || form.price == 0){
    errors= true;
    error={...error,price:"Please enter Price!!!"};  //ye msg. display
  }
  if(form.images == null){
    errors= true;
    error={...error,images:"Please enter image!!!"};  //ye msg. display
  }
  if(errors)setFormError(error) ; //ye old errors ko remove kr dega
  else { //all columns thik h to yha else mai
setFormError(error);
     productId? updateProduct():saveProduct();  //id h to update ni h Id to save
  }  
}
const changeHandeler=(e)=>{   ///changeHandeler--> ye data access krne k liye  
  setForm({...form,[e.target.name]: e.target.value});
};
function renderProducts(){
  return products?.map((item)=>{
    return(
      <tr>
        <td>
          <img src={"http://localhost:8082/" + item.images[0]} height="150x" width="150px"/>  {/*[0]} --> ye single image hi keani h abi table pr display */}
        </td>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>{item.price}</td>
        <td>{item.qty}</td>
        <td>
          <button className='btn btn-info' onClick={()=>{
            setProductId(item._id);
            setForm({...form,
              name:item.name,
              description:item.description,
              price:item.price,
              qty:item.qty,
            })
          }}>Edit</button>
        </td>
        <td>
          <button className='btn btn-danger' onClick={()=>{
            deleteProduct(item._id);
          }}>Dlete</button>
        </td>
      </tr>
    )
  })
}
  return (
    <div>
     <Header/>
     <div className='row p-2 m-2'>
     <div class="card text-center mx-auto">
    <div class="card-header bg-info text-white">
    {productId? "Edit product":"New Product"}
   </div>
   <div class="card-body">
    <div className='form-group row p-2 m-2'>
    <label className='col-4'>Department Name</label>
    <div className='col-8'>
     <input type='text' value={query.get("name")} disabled className='form-control' />
    </div>
    </div>
    <div className='form-group row p-2 m-2'>
    <label className='col-4'>Product Name</label>
    <div className='col-8'>
     <input type='text' className='form-control' placeholder='Product Name' name='name' onChange={changeHandeler} value={form.name}/>
     <p className='text-danger'>{formError.name}</p>
    </div>
    </div>
    <div className='form-group row p-2 m-2'>
    <label className='col-4'>Product Description</label>
    <div className='col-8'>
     <input type='text' className='form-control' placeholder='Product Description' name='description' onChange={changeHandeler} value={form.description}/>
     <p className='text-danger'>{formError.description}</p>
    </div>
    </div>
    <div className='form-group row p-2 m-2'>
    <label className='col-4'>Product Price</label>
    <div className='col-8'>
     <input type='number' className='form-control' placeholder='Product Price' name='price' onChange={changeHandeler} value={form.price}/>
     <p className='text-danger'>{formError.price}</p>
    </div>
    </div>
    <div className='form-group row p-2 m-2'>
    <label className='col-4'>Product Qty</label>
    <div className='col-8'>
     <input type='number' className='form-control' placeholder='Product Qty' name='qty'onChange={changeHandeler} value={form.qty}/>
     <p className='text-danger'>{formError.qty}</p>
    </div>
    </div>
    <div className='form-group row p-2 m-2'>
    <label className='col-4'>Product Image</label>
    <div className='col-8'>
     <input type='file' className='form-control' multiple onChange={(e)=>{
      let files= e.target.files;
      setForm({...form,images: files});
     }}/>
     <p className='text-danger'>{formError.images}</p>
    </div>
    </div>
   </div>
  <div class="card-footer text-muted">
    <button className='btn btn-info' onClick={()=>{
      onProductSubmit();
    }}>{productId? "Update" : "Save"}</button>  
  </div>   {/* productId = id h to Update ne h to save   */}
      </div>
      </div>
      <div className='row border p-2 m-2'>
        <table className='table table-border table-striped table-active'>
         <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th> Description</th>
            <th> Price</th>
            <th> Quantity</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
         </thead>
         <tbody>{renderProducts()}</tbody>
        </table>
      </div>
   </div>
  )
}

export default Product
