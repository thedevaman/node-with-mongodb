const express = require('express')
const {MongoClient}= require("mongodb")
const app = express()
app.listen(8080,()=>console.log("server is running"))

const mongo = new MongoClient("mongodb://localhost:27017")
mongo.connect()

.then(()=>console.log("Database Connected"))


.catch(()=>console.log("Database not Connected"))