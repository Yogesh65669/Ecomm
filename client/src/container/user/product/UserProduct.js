import React, { useEffect, useState } from 'react'
import Header from '../../../component/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import ROUTES from '../../../navigation/Route';
import '../../../styles/UserProduct.css'

function useQuery(){    //useQuery--> ye custom hoock bnaya h Query string ko accesss krne k liye 
  const{search}= useLocation();
  return React.useMemo(()=> new URLSearchParams(search),[search]); 
}

function UserProduct() {
  const query= useQuery();  //ye Query string ko access krne k liye 
  const navigate = useNavigate();  //ye Next page  pr jane k liye //product page se product deatil page pr jana h 
  const[products, setProducts]= useState(null);  //ye display all products k liye 

  function getProductByDepartmant() {
    try{
        axios.get("http://localhost:8082/product?departmentId=" + query.get("id"))
        .then((d)=>{
          setProducts(d.data.prodData);  //ERROR YHA CHECK this sanme in im=ndex.js in backend 
        }); 
    } catch(error){ 
        console.log("Unable to fetch ptoducts!!!");
    }
  }
 useEffect(()=>{  //ye Hoock aone app cll krta h starting mai 
  getProductByDepartmant();   //isko call  kre gy 
 },[]);

 function renderProducts(){
  return products?.map((item)=>{
    return(
 <div className='col-3'>
  <div class="card">   
  <img class="card-img-top" src={"http://localhost:8082/" + item.images}  height="200px" width="100px"   />
  <div class="card-body ">
    <h5 class="card-title ">{item.name}</h5>
    <h5 class="card-title">{item.description}</h5> 
    <h5 class="card-title">{item.price}</h5> 
    <h5 class="card-title">{item.qty}</h5> 
 
    <a class="btn btn-primary text-white"
     onClick={()=>{navigate(ROUTES.productDetail.name + "?id=" + item._id);
    }}>Product Detail</a>
  </div>
</div>
 </div>
    )
  })
}

  return (
    <div>
      <div className='userProduct-container'>
      <Header/>
      <div className='row m-2'>{renderProducts()}</div>
    </div>
    </div>
  )
}

export default UserProduct
