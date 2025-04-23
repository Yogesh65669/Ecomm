
// import ShoppingCartModel from "../models/ShoppingCart.js";
import OrderHeader from "../models/OrderHeader.js";
export const getOrderDetails=async(req,res)=>{
    try {
        const orderData=await OrderHeader.findOne({_id:req.body.id});
        res.status(201).send({orderData});
    } catch (error) {
        console.log('fail to fetch data');
    }
}
export const CreateOrderHeader=async(req,res)=>{
    try {
        const orderData=await OrderHeader.create({
            userId:req.body.userId,
            totalAmount:req.body.totalAmount,
          //  orderStatus:req.body.orderStatus,
           // orderDate:req.body.orderDate,
            paymentDate:req.body.paymentDate,
            name:req.body.name,
            streetAddress:req.body.streetAddress,
            city:req.body.city,
            state:req.body.state,
            postalCode:req.body.postalCode,
            phoneNumber:req.body.phoneNumber
        });
        if(orderData) res.status(201).send({message:"order Created"});
        else res.status(404).send({message:"Unable to create order"});
    } catch (error) {
        console.log('fail ot fetch data');
        
    }
}
