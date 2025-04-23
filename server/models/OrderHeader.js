import mongoose from "mongoose";
const OrderHeaderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Shipped','Canceled'],
    default: 'Approved',
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  paymentDate: {
    type: Date,
  },
name:{
  type:String,
  required:true
},
streetAddress:{
  type:String,
  required:true
},
city:{
  type:String,
  required:true
},
state:{
  type:String,
  required:true
},
postalCode:{
  type:Number,
  required:true
},
phoneNumber:{
  type:String,
  required:true
}
});

const OrderHeader = mongoose.model('OrderHeader', OrderHeaderSchema);
export default OrderHeader;