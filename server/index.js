const express = require('express')
const app = express()
const mongoose = require("mongoose")
const {createLogger, transports} = require("winston")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require('dotenv').config()

const vehicles = require('./routes/vehicle')
const dealer = require('./routes/dealer')
const consumer = require('./routes/consumer')
const transaction = require('./routes/transaction')


const logger = createLogger({
    level:'info',
    transports: [
        new transports.Console({level:'error'}),
        new transports.Console({level:'info'})
    ],
    exceptionHandlers: [
        new transports.File({filename:'exceptions.log'})
    ],
    rejectionHandlers: [
        new transports.File({filename:'rejections.log'})
    ]
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use('/dealer', dealer)
app.use('/consumer', consumer)
app.use('/transaction', transaction)
app.use('/', vehicles)


mongoose.connect(process.env.MONGODB_URI)
    .then(logger.info('Connected to MongoDB'))

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    logger.info(`Connected at port ${PORT}`)
})
