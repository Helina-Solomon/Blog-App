import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'

dotenv.config()

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('Mongo is connected!')
}
)
.catch((err) => {
    console.log(err)
})

const app = express()

app.use(express.json())

app.listen( 3000, () => {

    console.log('Server running on port 3000')
})

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)

//middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error! '
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})