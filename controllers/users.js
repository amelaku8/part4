const mongoose = require('mongoose')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.post('/',async (request,response) => {
    const {username, name,password} = request.body
    if(username.length < 4 || password.length < 4){
        response.status(400).json({error: "invalid username or password"})
        return
    }   
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)

    const user = new User({username,name,passwordHash})

    const savedUser = await user.save()

    response.status(201).json(savedUser)

})
 
userRouter.get('/', async (request,response) => {
    const users = await  User.find({}).populate('blogs',{title:1,likes:1,url:1})
    response.status(200).json(users)
})

module.exports = userRouter
