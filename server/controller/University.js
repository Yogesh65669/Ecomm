import UniversityModel from "../models/University.js"

export const CreateUniversity= async(req, res)=>{      //ye new university ko save krne j ka code h 
    
    try{
         const univData=await UniversityModel.create({
            name:req.body.name,  
            image:req?.file?.filename,  //? => ye null kr diya agr user n apni img upload ne ki to null kr dega 
         });
         if(univData) res.status(201).send({message:"University created!!!"});
         else res.status(404).send({message:"Unable to create university!!!"});
        }   catch(error){
        console.log("Faild to submit data!!!!",error);
    }
};
export const updateUniversity= async(req, res)=>{      //ye new university ko save k ka code h 
    try{
         const univData=await UniversityModel.findByIdAndUpdate({_id:req.body.id},   //ye update mai pass krna h _id
        {
            name:req.body.name,  
            image:req?.file?.filename,  //? => ye null kr diya agr user n apni img upload ne ki to null kr dega 
         });
         if(univData) res.status(200).send({message:"University unpdated!!!"});
         else res.status(404).send({message:"Unable to update university!!!"});
        }   catch(error){
        console.log("Faild to submit data!!!!");
    }
};
export const DeleteUniversity= async(req, res)=>{      //ye new university ko Delete krne ka code h 
    try{
         const univData=await UniversityModel.deleteOne({_id:req.body.id});   //ye delete mai pass krna h _id
         if(univData) res.status(200).send({message:"University deleted!!!"});
         else res.status(404).send({message:"Unable to delete university!!!"});
        }   catch(error){
        console.log("Faild to submit data!!!!");
    }
};
export const GetUniversities=async (req, res)=>{
    try{
        const univData=await UniversityModel.find();
        res.status(200).send({univData});
    } catch(error) {
        console.log("Fail to submit data");
    } 
};