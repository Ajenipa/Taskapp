const express = require('express')
require('dotenv').config()
const connectDB = require("./db/connection")
const errorHandler = require("./middleware/errorHandler")
const route = require("./route/taskr")
const app = express()
const notfound =  require("./middleware/not-found")
app.use(express.urlencoded({extended:false}))
app.use(express.json())
const PORT = process.env.PORT_NAME
app.use(express.static("./public"))
app.use("/api/v1/tasks", route)
app.use(notfound)
app.use(errorHandler)
const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=>{
            console.log(`listening on port ${PORT}`)
        })

    }catch(error){
            console.log(error)

    }
}

start()
