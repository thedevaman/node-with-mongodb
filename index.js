const express = require('express')
const {MongoClient}= require("mongodb")
const app = express()
let db = null
app.listen(8080,()=>console.log("server is running"))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const mongo = new MongoClient("mongodb://localhost:27017")
mongo.connect()

.then((conn)=>{
    db = conn.db("coading_ott")
})


.catch(()=>console.log("Database not Connected"))

app.post("/users",async(req,res)=>{

    const userCollection = db.collection("users")
    await userCollection.insertOne(req.body)
    res.status(200).json({message:"User Created"})
})