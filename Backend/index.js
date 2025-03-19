import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './db/connectDb.js'
import { connectCloudinary } from './utils/connectCloudinary.js'
import { clerkWebHooksController } from './controller/webhooksController.js'


dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post("/clerk", express.json(), clerkWebHooksController)


app.listen(PORT, (err) =>{
    err ? console.log(`Error in Running Server - ${err.message}`) : console.log(`Server Running Successfully`)
    connectDb()
    connectCloudinary()
})


