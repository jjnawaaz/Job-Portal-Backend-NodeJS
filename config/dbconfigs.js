import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDB Database ${mongoose.connection.host}`.bgGreen.white)
    } catch (err) {
        console.log(`MongoDB Error ${err}`.bgRed.white)
    }
}

export default connectDB
