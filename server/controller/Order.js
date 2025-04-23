import OrderModel from "../models/Order.js";

export const OrderController=async (req,res)=>{
    try {
        const orders=await OrderModel.find().populate('userId','username email').populate('items.productId','name description');
        res.json(orders);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

export const getOrderById=async(req,res)=>{
    try {
        console.log("get orders route hit");
        const order=await OrderModel.findById(req.params.orderId).populate('userId','username email').populate('items.productId','name description');
        if(!order) {
            return res.status(404).json({message:'Order Not Found'});
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({error:error.message});   
    }
};

export const createOrder=async(req,res)=>{
    try {
        const newOrder=new OrderModel(req.body);
        const savedOrder=await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({error:error.message});   
        
    }
};

export const updateOrder=async(req,res)=>{
    try {
        const updatedOrder=await OrderModel.findByIdAndUpdate(req.params.orderId,req.body,{new:true});
        if(!updatedOrder) {
            return res.status(404).json({message:'Order Not Found'});
        }
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({error:error.message});      
    }
};

export const deleteOrder=async(req,res)=>{
    try {
        const deletedOrder=await OrderModel.findByIdAndDelete(req.params.orderId);
        if(!deletedOrder) {
            return res.status(404).json({message:'Order Not Found'});
        }
        res.json({message:'Order Deleted Successfully'});
    } catch (error) {
        res.status(500).json({error:error.message});   
    }
};

export const updateOrderStatus=async(req,res)=>{
    try {
        const updatedOrder=await OrderModel.findByIdAndUpdate(
            req.params.orderId,
            {status:req.body.status},
            {new:true}
        );
        if(!updatedOrder) {
            return res.status(404).json({message:'order not found'})
        }
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({error:error.message});   
    }
};
