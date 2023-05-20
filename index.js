// API Documentation
import swaggerui from 'swagger-ui-express'
import swaggerDoc from 'swagger-jsdoc'

// Importing from packages
import express from 'express'
import 'express-async-errors'
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan'

//Security packages
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

// Importing from files
import connectDB from './config/dbconfigs.js';
import errorHandler from './middlewares/errorHandler.js';

//Importing the Routes
import testRoute from './routes/test.js'
import authRoute from './routes/auth.Routes.js'
import userRoute from './routes/user.Routes.js'
import jobRoute from './routes/jobs.Routes.js'

// Dot env config
dotenv.config();

//MongoDB Connection
connectDB()

// Swagger API Configs
// Swagger API Options
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Job Portal Application',
            description: 'Node ExpressJs Job Portal Application'
        },
        servers: [
            {
                url: "https://job-portal-backend-nodejs.onrender.com/"
            }
        ]
    },
    apis: ['./routes/*.js']
}

const spec = swaggerDoc(options)

const app = express();

//Middleware
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// Routes
app.use('/api/v1/test', testRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/jobs', jobRoute)

//Home route
app.use('/api-doc', swaggerui.serve, swaggerui.setup(spec))

// Error Handler 
app.use(errorHandler)

//Port 
const PORT = process.env.PORT || 8080

// Server
app.listen(PORT, () => {
    console.log(`Server Started in ${process.env.DEV_MODE} mode on PORT no ${PORT} `.bgWhite.black)
})
