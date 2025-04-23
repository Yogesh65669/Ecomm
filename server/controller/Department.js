import DepartmentModel from "../models/Departmnet.js"

export const CreateDepartment= async (req, res)=> {
    try{
         const depData = await DepartmentModel.create({
          name:req.body.name,
          image:req?.file?.filename,
          university:req.body.universityId,
         });
         if(depData) res.status(201).send({message:"Department created!!!"});
         else res.status(404).send({message:"Unable to craete department!!!"});
    } catch(error) {
          console.log("Fail to submit data");
    }
};
export const UpdateDepartment= async (req, res)=> {
    try{
         const depData = await DepartmentModel.findByIdAndUpdate({_id:req.body.id},
        {
          name:req.body.name,
          image:req?.file?.filename,
          university:req.body.universityId,
         });
         if(depData) res.status(200).send({message:"Department Updated!!!"});
         else res.status(404).send({message:"Unable to upadte department!!!"});
    } catch(error) {
          console.log("Fail to submit data");
    }
};
export const DeleteDepartment= async (req, res)=> {
    try{
         const depData = await DepartmentModel.deleteOne({_id:req.body.id});
         if(depData) res.status(200).send({message:"Department deleted!!!"});
         else res.status(404).send({message:"Unable to delete department!!!"});
    } catch(error) {
          console.log("Fail to submit data");
    }
};
export const GetDepartmentByUniversityId= async (req, res)=> {
    try{
        const depData= await DepartmentModel.find({
            university:req.query.universityId,
        }).populate("university");  
        res.status(200).send({depData});
    } catch(error) {
         console.log("Fail to submit data");
    }
};
