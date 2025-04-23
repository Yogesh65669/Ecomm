import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
    name:{
       type:String,
       required:true,
    },
    description:{
        type:String,
        required:true,
     },    
     price:{
        type:Number,
        required:true,
     },     
     qty:{
        type:Number,
        required:true,
     },
     active:{    //product h b ya ne h 
        type:Boolean,  //yha agr product ne hoga to ye active false kr dega //and product h to True kr dega
        default:true,
      
     },     
     images:{  //ye yha image null kr di agr kisi n upload ne krni h image to ki null
        type:[String],   //ye array bna diya bcs product ki multipal images hai and university , dep. ki kam image h 
     },
     department:{
        type:mongoose.Schema.Types.ObjectId,   //is iski Datatype h 
        ref:"department",   //ye Department model ko yha forigne key bna diya 
        required:true,
     },
    },
    {timestamps:true}
);
const ProductModel= mongoose.model("product", ProductSchema);
export default ProductModel;