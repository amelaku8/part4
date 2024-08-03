blogsRouter = require("express").Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response,next) => {
    const blogs = await Blog.find({})
    await response.json(blogs)
      
  })
blogsRouter.get('/:id', async (request,response,next) => {
  const blog = await Blog.findById(request.params.id)
  await response.json(blog)
})  

blogsRouter.post('/', async (request, response,next) => {
  
  console.log(request.body)
  const blog = new Blog({
     'url': request.body.url,
     'author': request.body.author,
     'likes': request.body.likes || 0 ,
     'title': request.body.title
     })



    result = await blog.save()
    await response.status(201).json(result)
      
  })
  
module.exports = blogsRouter