import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import noteRoutes from './routes/noteRoutes.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express()

dotenv.config()

app.use(bodyParser.json({ limit : "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit : "30mb", extended: true }))
app.use(cors())

app.use('/notes', noteRoutes)
app.use('/users', userRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, {  //
    useNewUrlParser : true, 
    useUnifiedTopology : true,
    useCreateIndex : true
})
    .then(()=> app.listen(PORT, () => console.log(`Server is running on ${PORT} babyyy`)))
    .catch((error) => console.log(error))
    
mongoose.set('useFindAndModify', false)
