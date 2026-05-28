const express = require('express')
const {MongoClient,ObjectId}= require("mongodb")
const app = express()
let db = null
app.listen(8080,()=>console.log("server is running"))

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

    const userCollection = db.collection("users")
    await userCollection.insertOne(req.body)
    res.status(200).json({message:"User Created"})
})

app.get("/users-list",async(req,res)=>{

    const userCollection = db.collection("users")
   const users = await userCollection.find().toArray()
    res.status(200).json({message:"User list",users})
})

app.put("/users-update/:id",async(req,res)=>{
    const id = new ObjectId(req.params.id)
    const body = req.body

    const userCollection = db.collection("users")
    const updatedusers = await userCollection.updateOne({_id:id},{$set:body})

     res.status(200).json({message:"User Updated"})

})

app.delete("/users-delete/:id",async(req,res)=>{
    const id = new ObjectId(req.params.id)
    const userCollection = db.collection("users") 
    const deleteUsers = await userCollection.deleteOne({_id:id})
    res.status(200).json({message:"User Deleted"})
})