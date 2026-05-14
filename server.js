import exp from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { empapp } from './Api/EmpApi.js'
import cors from'cors'
config()

 const app=exp()
app.use(exp.json())
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://mini-project-frontend-beryl.vercel.app/"
  ],
  credentials: true
}));
app.use('/employee',empapp)


//db connection
async function connectDb(){
  try{
    await connect(process.env.DB_URL)
    console.log("DB Connection successful")
    app.listen(process.env.PORT||5000,()=>
    console.log(`Server connected Succesfully with port ${process.env.PORT}`)
    )
  }
  catch(err){
    console.log(`Error  occured at connecting server ${err}`)
  }  
}
connectDb()
//errors validation
app.use((err,req,res,next)=>{
    console.log(err.name)
    //validation error"
    if(err.name=='ValidationError'){
        return res.status(400).json({message:"Error occured",error:err.message})
    }
    //cast error"CastError//based on match"
    if(err.name=='CastError'){
        return res.status(400).json({message:"Error occured",error:err.message})
    }

    //server side error
    res.status(500).json({message:"Error Occured",error:err.message})

})

export default app