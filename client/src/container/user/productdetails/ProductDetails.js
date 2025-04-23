// import React, { useEffect, useState } from 'react'
// import Header from '../../../component/Header'
// import { useLocation, useNavigate } from 'react-router-dom'
// import axios from 'axios';


// function useQuery(){    //useQuery--> ye custom hoock bnaya h Query string ko accesss krne k liye 
//   const{search}= useLocation();
//   return React.useMemo(()=> new URLSearchParams(search),[search]); 
// }

// function ProductDetails() {
//  const query= useQuery();
//  const navigate = useNavigate();  //ye Next page  pr jane k liye //product page se product deatil page pr jana h 
//  const[productDet, setProductDet]= useState();

//  function getProductDetail(){  //getProductDetail
//   try{
//       axios.get("http://localhost:8082/productdetails?id=" + query.get("id"))
//       .then((d)=>{
//         setProductDet(d.data.prodData);
//       });
//   } catch(error) {
//     console.log("Ubable to fetch product detail!!!");
//   }
//  }
//  useEffect(()=>{
//   getProductDetail();
//  },[]);

//  function renderImages() {   //ye Multipal images display krne k liye 
//        return productDet?.images?.map((item)=>{  //ye images? column ka name  hai //yha imsges k liye loop lga dii 
//           return(
//             <img src={"http://localhost:8082/" + item} height="300px" width="400px" />
//           );
//        });
//       }
//   return (
//     <div>
//       <Header/>
//       <div className='row m-2 p-2'>
//       <div className='col-3 mx-auto'>
//       <div class="card" >
//     <div style={{display:"flex", flexDirection:"row"}}>
//       {renderImages()}
//     </div>
//   <div class="card-body">
//     <h5 class="card-title">Name: {productDet?.name}</h5>
//     <h5 class="card-title">Description: {productDet?.description}</h5>
//     <h5 class="card-title">Price: {productDet?.price}</h5>
//     <h5 class="card-title">
//       Qty:<input type='number' name='qty'/></h5>
//       <a className='btn btn-primary text-white'>
//         Add To Cart
//       </a>
//   </div>
// </div>
//       </div>
//       </div>
//     </div>
//   )
// }

// export default ProductDetails


import React, { useEffect, useState } from 'react';
import Header from '../../../component/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../styles/ProductDetail.css'

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ProductDetails() {
  const query = useQuery();
  const navigate = useNavigate();
  const [productDet, setProductDet] = useState();
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");

  function getProductDetail() {
    try {
      axios.get("http://localhost:8082/productdetails?id=" + query.get("id"))
        .then((d) => {
          setProductDet(d.data.prodData);
        });
    } catch (error) {
      console.log("Unable to fetch product detail!!!");
    }
  }

  useEffect(() => {
    getProductDetail();
  }, []);

  function renderImages() {
    return productDet?.images?.map((item) => {
      return (
        <img src={"http://localhost:8082/" + item} height="300px" width="400px" alt="Product" />
      );
    });
  }

  function addToCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let itemIndex = cart.findIndex(item => item._id === productDet._id);
    if (itemIndex !== -1) {
      cart[itemIndex].qty += qty;
    } else {
      cart.push({ ...productDet, qty: qty });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    // Trigger storage event to update cart count
    window.dispatchEvent(new Event('storage'));
    // Reset quantity box to one
    setQty(1);
    // Display success message
    setMessage("Your product has been added to the cart!");
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
  }

  return (
    <div>
      <div className='product-Detail-container'>
      <Header />
      <div className='row m-2 p-2'>
        <div className='col-3 mx-auto'>
          <div className="card">
            <div style={{ display: "flex", flexDirection: "row" }}>
              {renderImages()}
            </div>
            <div className="card-body">
              <h5 className="card-title">Name: {productDet?.name}</h5>
              <h5 className="card-title">Description: {productDet?.description}</h5>
              <h5 className="card-title">Price: {productDet?.price}</h5>
              <h5 className="card-title">
                Qty:
                <input
                  type='number'
                  name='qty'
                  value={qty}
                  min="1"
                  onChange={(e) => setQty(parseInt(e.target.value))}
                />
              </h5>
              <button className="btn btn-primary text-white" onClick={addToCart}>
                Add To Cart
              </button>
              {message && <div className="alert alert-success mt-3">{message}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ProductDetails;
