import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
    firstName:{
       type:String,
       required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,  //yha required ne likhna h bcs user ki mrzi h profile pic post krni ya ne
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user",
    },
},
{timestamps:true}
);

const UserModel= mongoose.model("user",UserSchema);
export default UserModel;