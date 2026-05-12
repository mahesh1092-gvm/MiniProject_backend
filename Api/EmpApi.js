import exp from 'express'
import { EmpModel } from '../modules/employSchema.js'
export const empapp=exp.Router()
//create employee
empapp.post('/create',async(req,res)=>
{
    //req from body
const Emp=req.body
//create emp
const newEmp=new EmpModel(Emp)
//save emp
const result=await newEmp.save()
//response
res.status(200).json({message:"Employe created " ,payload:result})
})
//Get employee
empapp.get('/list',async(req,res)=>{

    const allEmp=await EmpModel.find()
    if(!allEmp){
        res.json("No employee")
    }
    res.json({message:"List of employees",payload:allEmp})
})
empapp.put("/update/:id",async(req,res)=>{
//get product id
const Empid=req.params.id
//get data from body
const Edata=req.body
//compare and update
const UpdateProduct=await EmpModel.findByIdAndUpdate(Empid,
                                                  {$set:{...Edata}},
                                                  { returnDocument:"after"}
                                                )

res.status(200).json({message:"User Updated",payload:UpdateProduct})

})
empapp.delete("/delete/:id",async(req,res)=>
{   //get user id
    const uid=req.params.id
    //delete user id
    const EmployeeDelet=await EmpModel.findByIdAndDelete(uid)
   if(!EmployeeDelet){
    return res.status(404).json({message:"Employee not Found"})
   }
    res.status(200).json({message:"Employee Deleted",payload:EmployeeDelet})
})

