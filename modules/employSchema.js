import { Schema, model } from "mongoose";
const emoloyeeSchema=new Schema({
    name:{
        type:String,
        required:"Name is Required"
    },
    email:{
        type:String,
        required:"Email is required",
        unique:[true,"email alredy exist"]
        
    },
    mobile:{
        type:Number,
        required:"Mobil is  required"
    },
    designasation:{
        type:String,
        required:"Designation is required"
    },
    companyName:{
        type:String,
        required:"Company name is required"
    }
},{versionKey:false
})
export const EmpModel=model('Employee',emoloyeeSchema)