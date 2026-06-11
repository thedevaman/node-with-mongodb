const express = require('express')
const {MongoClient,ObjectId}= require("mongodb")
const cors = require("cors")
const app = express()
let db = null


app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const mongo = new MongoClient("mongodb://localhost:27017")
mongo.connect()

.then((conn)=>{
    db = conn.db("coading_ott")
    console.log("Database Connected")
})


.catch(()=>console.log("Database not Connected"))

app.post("/users",async(req,res)=>{
  try{
    const userCollection = db.collection("users")
    await userCollection.insertOne(req.body)
    res.status(200).json({message:"User Created"})
  }catch(err){
    res.status(500).json({message:err.message})
  }
    
})

app.get("/users-list",async(req,res)=>{

    try{
  const userCollection = db.collection("users")
   const users = await userCollection.find().toArray()
    res.status(200).json(users)
    }catch(err){
    res.status(500).json({message:err.message})
    }

  
})

app.put("/users-update/:id",async(req,res)=>{

    try{
  const id = new ObjectId(req.params.id)
    const body = req.body

    const userCollection = db.collection("users")
    const updatedusers = await userCollection.updateOne({_id:id},{$set:body})

     res.status(200).json({message:"User Updated"})
    }catch(err){
    res.status(500).json({message:err.message})
    }
    
  

})

app.delete("/users-delete/:id",async(req,res)=>{

    try{
       const id = new ObjectId(req.params.id)
    const userCollection = db.collection("users") 
    const deleteUsers = await userCollection.deleteOne({_id:id})
    if(deleteUsers.deletedCount > 0)
    {
        throw new Error("User not found")
    res.status(200).json({message:"User Deleted"})
    }
    }catch(err){
      res.status(500).json({message:err.message})
    }

  
})

app.listen(8080,()=>console.log("server is running"))