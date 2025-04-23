import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema(
    {
    name:{
       type:String,
       required:true,
    },
    image:{
        type:String,
        required:true,
     },
     university:{
        type:mongoose.Schema.ObjectId,   //ye University model yha FK bna diya //and iski Datatype hai
        ref:"university",  //yha FK key bna di
        required:true,
     },
},
{timestamps: true}
);

const DepartmentModel= mongoose.model("department", DepartmentSchema);  //department => ye FK k liye bna liya yha
export default DepartmentModel;