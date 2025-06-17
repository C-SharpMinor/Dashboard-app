const dotenv= require('dotenv')
const express= require('express')
const mongoose= require('mongoose')
const cors= require('cors')
const connectDB= require('./mongodb/connect')

dotenv.config()

const app= express()
app.use(express.json({limit : '50mb'}))
app.use(cors())

const PORT= process.env.PORT || 3000

app.get('/', (req, res)=>{
    res.send("Welcome to the server")
})

// const startServer= async () =>{
//     try{
//         await connectDB(process.env.MONGO_URI)
//     }
//     catch(error){
//         console.log(error)
//     }
// }

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log('Database connected'))
.catch((error)=> console.log('Database connection failed:', error.message))

// const userSchema= new mongoose.Schema({
//     name: String,
//     email: String
// })
// const userModel= new mongoose.model('employee', userSchema)
// const employee1= new userModel({
//     name: 'John Doe',
//     email: 'john@gmail.com'})

// employee1.save()
// .then(() => console.log('Employee saved'))

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`)
})