import Contact from "../container/contact/Contact.js"; //
import About from "../container/about/About.js";  //
import Support from "../container/support/Support.js";//
import Login from "../container/login/Login.js";//
import Register from "../container/register/Register.js";//
import University from "../container/admin/university/University.js";//
import Department from "../container/admin/department/Department.js";//
import Product from "../container/admin/product/Product.js";//
import Home from "../container/user/home/Home.js";//
import UserDepartment from "../container/user/department/UserDepartment.js";//
import UserProduct from "../container/user/product/UserProduct.js";//
import ProductDetails from "../container/user/productdetails/ProductDetails.js";
import Cart from "../container/cart/Cart.js";
import Summary from "../container/cart/Summary.js";
import OrderSuccess from "../container/cart/OrderSuccess.js";
import UserManagement from "../container/admin/user/UserManagement.js";
import OrderManagement from "../container/admin/order/OrderManagement.js";
import { Component } from "react";
// import UserManagement from "../container/admin/user/UserManagement.js";

const ROUTES={
about:{
    name:"/about",    //ye rout ka name  
    Component:<About/>,   //help mai ne aye ga to save kr lena ctrl+s  //namespace ai .js lga do
},  
contact:{
    name:"/contact",
    Component:<Contact/>,
},
support:{
    name:"/support",
    Component:<Support/>,
},
cart:{
    name:"/cart",
    Component:<Cart/>,
},
summary:{
    name:"/summary",
    Component:<Summary/>,
},
orderSuccess:{
    name:"/orderSuccess",
    Component:<OrderSuccess/>,
},

login:{
    name:"/login",
    Component:<Login/>,
},
register:{
    name:"/register",
    Component:<Register/>,
},
universityAdmin:{       //Ab Admin k component ki routing kre gy
    name:"/universityAdmin",
    Component:<University/>,
},
departmentAdmin:{       
    name:"/departmentAdmin",
    Component:<Department/>,
},
productAdmin:{       
    name:"/productAdmin",
    Component:<Product/>,
},
home:{        //ye USER cpmponent ki routing
    name:"/",  //kuch ne likha to direct home pr jaye ga 
    Component:<Home/>,
},
departmentUser:{       
    name:"/departmentUser",
    Component:<UserDepartment/>,
},
productUser:{       
    name:"/productUser",
    Component:<UserProduct/>,
},
productDetail:{       
    name:"/productDetail",
    Component:<ProductDetails/>,
},
userManagement:{
    name:"/user-management",
    Component:<UserManagement/>
},
OrderManagement:{
    name:"/order-management",
    Component:<OrderManagement/>
}


};
export default ROUTES;   //ye khud likhna h 