const express = require("express")
require('express-async-errors')
const app = express()
const cors = require('cors')
const morgan = require("morgan")

const blogsRouter = require('./controllers/blogs')
const configs = require('./utils/config')
const mongoose = require("mongoose")
const mongoUrl = configs.MONGODB_URI

mongoose.connect(mongoUrl)
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use('/api/blogs',blogsRouter)

module.exports = app