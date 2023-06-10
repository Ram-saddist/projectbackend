const express =require("express")
const app=express();
const cors=require("cors")
const bodyParser=require("body-parser")
const port= process.env.PORT|| 4000;
const mongoose =require("mongoose")
const Content=require("./schema")

app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())

app.use(cors())

mongoose.connect("mongodb+srv://Lokesh1452739:Lokesh1452739@cluster0.s8qbfbt.mongodb.net/firstdb?retryWrites=true&w=majority")
    .then(()=>{
        console.log("Mongodb connected successfully")
    })
    .catch((err)=>{
        console.log(err)
    })

app.get("/",(req,res)=>{
    res.send("API is working")
})

app.get("/users",async(req,res)=>{
    await Content.find()
        .then(found=>res.json(found))
})

app.post("/store",(req,res)=>{
    const {username,password}=req.body
    const newData=new Content({
        username,password
    })
    newData.save()
    res.send()
})

app.listen(port,()=> console.log("server is running on port",port))