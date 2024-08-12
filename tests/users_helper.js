const User = require('../models/user')
const mongoose = require('mongoose')
const config = require('../utils/config')

const MONGODB_URI = config.MONGODB_URI

mongoose.connect(MONGODB_URI)

const usersIndb = async () => {
    r = await User.find({})
    return r

}



module.exports ={usersIndb}