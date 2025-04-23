import ProductModel from "../models/Product.js"

export const CreateProduct= async (req,res)=> {     //ye product save ka code h 
    try{
        let images= req?.files?.map((item)=>{
            return item.filename;
        });
     const prodData= await ProductModel.create({
       name:req.body.name,
       description:req.body.description,
       qty:req.body.qty,
       price:req.body.price,
       images:images,       
       department:req.body.departmentId,
     });
     if(prodData)res.status(201).send({message:"product craeted!!!"});
     else res.status(404).send({message:"Unable to create product!!!"});
    } catch(error) {
       console.log("Fail to submit data");
    }
};
export const UpdateProduct= async (req,res)=> {     //ye product update ka code h 
    try{
        let images= req?.files?.map((item)=>{
            return item.filename;
        });
     const prodData= await ProductModel.findByIdAndUpdate(  {_id:req.body.id},
        {
       name:req.body.name,
       description:req.body.description,
       qty:req.body.qty,
       price:req.body.price,
       images:images,
       department:req.body.departmentId,
     });
     if(prodData)res.status(200).send({message:"product update!!!"});
     else res.status(404).send({message:"Unable to update product!!!"});
    } catch(error) {
       console.log("Fail to submit data");
    }
};
export const DeleteProduct= async (req,res)=> {     //ye product delete ka code h 
    try{
     const prodData= await ProductModel.deleteOne({_id:req.body.id});
     if(prodData)res.status(200).send({message:"product delete!!!"});
     else res.status(404).send({message:"Unable to delete product!!!"});
    } catch(error) {
       console.log("Fail to submit data");
    }
};
export const GetProductByDepartmentId = async (req, res)=>{   //ye all products k display ka code
    try{
          const prodData= await ProductModel.find({
            department:req.query.departmentId,  //query= es query string se depId pass kr di //iise bs Product table ka all data mile ga and Dep. se bs id aayee ga --to iske liye populate lgana
          }).populate({path:"department", populate:[{path:"university"}]});   //ye Dep. table ka sara data aagya //product mai university and department ko call(access) kr diya
          res.status(200).send({prodData});  //ye all product display ho gye
    } catch(error){
           console.log("Fail to submit data");
    }
};
export const GetProductDetail= async(req,res)=>{    //ye productdetail button ka code 
    try{
         const prodData= await ProductModel.findOne({_id:req.query.id})   //findOne== ye single recode display kre ag mtlb details pr click kr k ek product ki detail show kre ga 
         .populate({    
            path:"department",  //.populate= yha product dtails mai department and university b display krne 
            populate: [{path: "university"}]});
         res.status(200).send({prodData});
    } catch(error) {
   console.log("Fail to submit data");
    }
};
export const UpdateProductQty= async(req, res)=>{    //ye product ki quantity update code//jaise total=10 and 5 buy kr li to 5 hi dsiplay ho   
    try{                                             
         let productInDb= await ProductModel.findOne({_id:req.body.id});  //findOne= ek yah find kr diya //{_id:req.body.id} =  
         let active = true;
         if(productInDb.qty - req?.body.qty <=0) active= false;
         let prodData= await ProductModel.findByIdAndUpdate({_id:req.body.id},
            {
                qty:productInDb.qty - req.body.qty,
                active: active,
            }
         );
         if(prodData) res.status(200).send({message:"Product Quantity update!!!"});
         else res.status(404).send({message:"Unable to update Product quantity"});
    } catch(e){
        res.status(404).send({error:e?.message})
        // console.log("Fail to submit data");
    }
};

