const jwt = require('jsonwebtoken')
const blogsRouter = require("express").Router()
const Blog = require('../models/blog')
const User = require('../models/user')




blogsRouter.get('/', async (request, response,next) => {
    const blogs = await Blog.find({}).populate('user',{username:1,name:1})
    await response.json(blogs)
      
  })

  blogsRouter.get('/:id', async (request,response,next) => {
  const blog = await Blog.findById(request.params.id)
  if(blog){
  await response.json(blog)
  return
  }
  await  response.status(404).end()
})  

blogsRouter.post('/', async (request, response,next) => {
    
  const decodedToken = jwt.verify(request.token,process.env.SECRET)
  if(!decodedToken.id){
    return response.status(401).json({error:"token invalid"})
  }
  if (request.body.url && request.body.title) {
    const user = await User.findById(decodedToken.id)
    console.log(user)
    const blog = new Blog({
      'url': request.body.url,
      'author': request.body.author,
      'likes': request.body.likes || 0 ,
      'title': request.body.title,
      "user" : decodedToken.id
      })

 
      
     result = await blog.save()
     user.blogs = user.blogs.concat(result._id)
     await user.save()
     await response.status(201).json(result)
     return
  }
  
    await response.status(400).end()
      
  })

blogsRouter.delete('/:id', async (request,response,next) => {
  const decodedToken = jwt.verify(request.token,process.env.SECRET)
  if(!(decodedToken.id)){
    return response.status(400).json({error:"Invalid user"})
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === decodedToken.id){

  await Blog.findByIdAndDelete(request.params.id)
  
  await response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request,response,next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    likes : body.likes,
    url: body.url
  }
  r = await Blog.findByIdAndUpdate(request.params.id,blog,{new:true} )
  await response.status(200).json(r) 
} 
)
  
module.exports = blogsRouter