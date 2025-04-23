import UserModel from "../models/User.js"

export const Register= async (req,res) =>{    //Create New user code 
    try{
    let userInDb= await UserModel.findOne({email:req.body.email});//yha email ko user name bna diya 
    if(userInDb){  //yha check kiya isname se koi already register to ne h 
        res.status(404).send({message:"User already created with this email"});
        return;  //agr is email se already user bna h to tha se hi return
    }
    let userData= await UserModel.create({
        ...req.body,  //yha user models se columns ka data yha fetch kr diya //...=> spread opr.
        profilePic:req?.file?.filename, //ismage pass ne hogi isme ... to alag se pass ki 
    });
    if(userData) res.status(201).send({message:"user created"});
    else res.status(404).send({message:"unable to create user"});
    } catch (e){
        res.status(404).send({error:e?.message});  //({error:e?.message})==> ye Actual message bejne k kiye h 
    }
}; 
export const Login = async(req,res)=>{
    try{
       let userInDb= await UserModel.findOne({
        email:req.body.email,   //yha pr login k liyye find hoga email and password 
        password:req.body.password,
       });
       if(userInDb) res.status(200).send({id:userInDb._id, role:userInDb.role});
       else res.status(404).send({message:"Wrong user / password"});
    } catch(e){
        res.status(404).send({error:e?.message});
    }
};

export const getUser=async(req,res)=>{
    try {    
        const users = await UserModel.find({}); // Retrieve all users
    
        if (users && users.length > 0) {
          const sanitizedUsers = users.map(user => {
            const { password, ...userData } = user.toObject();
            return userData;
          });
          res.status(200).send(sanitizedUsers);
        } else {
          res.status(404).send({ message: "No users found" });
        }
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    };