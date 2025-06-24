const dotenv= require('dotenv')
const express= require('express')
const mongoose= require('mongoose')
const cors= require('cors')
const propertyRouter = require('./routes/propertyRoutes.js')
const userRouter = require('./routes/userRoutes.js')

dotenv.config()

const app= express()
app.use(express.json({limit : '50mb'}))
app.use(cors())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/properties', propertyRouter)




const PORT= process.env.PORT || 3000

app.get('/', (req, res)=>{
    res.send("Welcome to the server")
})


mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log('Database connected'))
.catch((error)=> console.log('Database connection failed:', error.message))


app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`)
})
