const express= require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const serverless = require('serverless-http')

require ('dotenv').config()

const app=express()
const port = process.env.PORT || 5050
app.use(cors())
app.use(express.json());


// console.log("token", process.env.Question_API_TOKEN)

//can also be written as:
// const db = "mongodb://localhost:5050/example";

// mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports.handler = serverless(app)

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const url = process.env.Question_API_TOKEN
mongoose.connect(url,connectionParams)
.then(()=>{
    console.log("connected to database")
}).catch(err=>{
    console.log("error connecting to mongodb:", err);
})

const questionRoutes = require('./routes/questions')
app.use('./netlify/functions/api', questionRoutes)

app.listen(port,()=>{
    console.log("app is listening on port", port);
})