const mongoose= require('mongoose')

const connectDB = (url) => {
    mongoose.set('strictQuery', true);

    mongoose.connect(url)
    .then(() => console.log('Database connected'))
    .catch((error) => console.log(error.message))
}

module.exports= connectDB;