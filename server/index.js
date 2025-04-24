import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import { CreateUniversity, DeleteUniversity, GetUniversities, updateUniversity } from "./controller/University.js";
import { CreateDepartment, DeleteDepartment, GetDepartmentByUniversityId, UpdateDepartment } from "./controller/Department.js";
import { CreateProduct, DeleteProduct, GetProductByDepartmentId, GetProductDetail, UpdateProduct, UpdateProductQty } from "./controller/Product.js";
import { getUser, Login, Register } from "./controller/User.js";
import { createPaymentIntent } from "./controller/payment.js";
import { createOrder, deleteOrder, getOrderById, OrderController, updateOrder, updateOrderStatus } from "./controller/Order.js";
import sendSMS from "./twilioService.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.post('/makeCall', async (req, res) => {
    try {
        const call = await client.calls.create({
            twiml: '<Response><Say>Hello from your Node application!</Say></Response>', // कॉल के दौरान बोला जाने वाला टेक्स्ट
            to: '+your phone number', // कॉल करने वाला नंबर
            from: '+15017122661', // Twilio नंबर
        });

        res.json({ message: 'Call initiated successfully', callSid: call.sid });
    } catch (error) {
        console.error('Error initiating call:', error);
        res.status(500).json({ error: 'Failed to initiate call' });
    }
});

async function makeCall(phone, textToSpeak) {
    try {
        const call = await client.calls.create({
            twiml: `<Response><Say>${textToSpeak}</Say></Response>`, 
            to: '+your phone number',
            from: '+15017122661', 
        });

        return { success: true, callSid: call.sid };
    } catch (error) {
        console.error('Error initiating call:', error);
        return { success: false, error: error.message };
    }
}



//University API
const storageUniv= multer.diskStorage({   //storageUniv=ye var h univercity k liye 
    destination:"uploadsUniv/",  //ye uploadUniv  =ye folder ka name
    filename:(req,file,cb) =>{
    cb(null, `${Date.now()}--${file.originalname}`);
    } 
});

const uploadUniv = multer({storage:storageUniv})  //ye  multer image k liye 

//URL => //http://localhost:8082/university  
app.post("/university",uploadUniv.single("image"),CreateUniversity);  //Ye Departmant ki API bna di 
app.put("/university",uploadUniv.single("image"),updateUniversity);
app.delete("/university", DeleteUniversity);
app.get("/university", GetUniversities);

//Department  API 
const storageDep= multer.diskStorage({   //storageUniv=ye var h Department k liye 
    destination:"uploadsDep/",  //ye uploadsDep  =ye folder ka name
    filename:(req,file,cb) =>{
    cb(null, `${Date.now()}--${file.originalname}`);
    } 
});
const uploadDep = multer({ //ye  multer image k liye 
    storage:storageDep
});  
 
//URL => //http://localhost:8082/department  ////Ye Departmant ki API bna di 
app.post("/department",uploadDep.single("image"),CreateDepartment);  
app.put("/department",uploadDep.single("image"),UpdateDepartment);
app.delete("/department", DeleteDepartment);
app.get("/department", GetDepartmentByUniversityId);

//Product API 
const storageProd= multer.diskStorage({   //storageProd=ye var h Product k liye 
    destination:"uploadsProd/",  //ye uploadsProd  =ye folder ka name
    filename:(req,file,cb) =>{
    cb(null, `${Date.now()}--${file.originalname}`);
    } 
});
const uploadProd = multer({ //ye  multer image k liye 
    storage:storageProd
});  
 
//URL => //http://localhost:8082/product  ////Ye Product ki API bna di 
app.post("/product",uploadProd.array("images"),CreateProduct);  
app.put("/product",uploadProd.array("images"),UpdateProduct);
app.delete("/product", DeleteProduct);
app.get("/product", GetProductByDepartmentId);
app.get("/productdetails", GetProductDetail);
app.post("/updateProductQty", UpdateProductQty);

//ab User Model ki API 
app.post("/register",Register);
app.post("/login",Login);
app.get('/getUser',getUser);

app.post("/create-payment-intent", createPaymentIntent);

//order
app.post("/orders",createOrder);
app.post("/getOrder",getOrderById);
app.put("/updateOrder",updateOrder);
app.delete("/deleteOrder",deleteOrder);
app.put("/updateOrderStatus",updateOrderStatus);
app.get("/orderRoutes",OrderController);


//Image Access Display on table 
app.use(express.static("uploadsUniv/"));
app.use(express.static("uploadsDep/"));
app.use(express.static("uploadsProd/"));







//ye DB connect kr diya 
mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("database connected");
    app.listen(process.env.PORT,()=> {
        console.log("server running at port");
    });
})
.catch(()=> {
    console.log("database connection error");
});
