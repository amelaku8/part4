const express = require("express")
require('express-async-errors')
const app = express()
const cors = require('cors')
const morgan = require("morgan")
const tokenExtractor = require('./middleware/tokenExtractor')

const userRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const configs = require('./utils/config')
const mongoose = require("mongoose")
const mongoUrl = configs.MONGODB_URI

mongoose.connect(mongoUrl)
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(tokenExtractor)
app.use('/api/blogs',blogsRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)
module.exports = app