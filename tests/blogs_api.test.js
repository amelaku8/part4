const {test,after,beforeEach,describe} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./db_helper')
const Blog = require('../models/blog')
const User = require('../models/blog')
const { initial } = require('lodash')
const api = supertest(app)



beforeEach(async () => {
  
  await User.deleteMany({})
  for (let i = 0; i< helper.users;i++){
    const userObject = new User(helper.users[i])
    await userObject.save()
  }
})

describe('get method works' ,  () => {
test.only('blogs are returned as json',async () => {
  r =   await api.get('/api/blogs').expect(200).expect('Content-Type',/application\/json/)
  console.log(r.response)
})

test('number of blogs is correct', async () => {
    const response = await api.get('/api/blogs')
    const r  = await helper.blogsIndb()
    assert.strictEqual(response.body.length,r.length)
})

test('id is the identifier for each blog', async () => {
    const response = await api.get('/api/blogs')
    
    for(let i=0; i< response.body.length ;i++){
        id = response.body[i].id
        console.log(id)
        assert(id) 
    }
})
})


describe('post method works' , async () => {
  beforeEach(async () => {
  for(let i = 0; i< helper.blogs; i++){
      let user = await User.find({username:helper.blogs[i].username})
      user = user.toJSON()
      const blog = {...helper.blogs[i].blog,userId:user.id}
      const blogObject = new Blog(blog)
      await blogObject.save()  
    }
  })

  test('number of blogs is increased', async () => {
    z = await helper.blogsIndb()
    await api.post('/api/blogs').send(dummy)
    const r = await api.get('/api/blogs')
    assert.strictEqual(r.body.length, (z.length+1))
    })

  test('like defaults to 0 if  given',async () =>{
    dd = {
      title:'def',
      author: 'errr',
      url: 'dfdd'
    }
    z = await helper.blogsIndb()
    await api.post('/api/blogs').send(dd)
    response = await api.get('/api/blogs')
        
    assert.strictEqual(response.body.length,z.length+1)  
    })
  test('no url return response 400', async () => {
      dd = {
        title: "def",
        author: "dsdaf",
        likes: 32
      }
      await api.post('/api/blogs').send(dd).expect(400)
    })
})

describe('delete method works' , async () =>{
  test('delete a single blog', async () =>{
    const r = await  api.get('/api/blogs') 
    const id =r.body[0].id
    
    await api.delete(`/api/blogs/${id}`).expect(204)
  } )
})

describe('put method works', async () =>{
        
  test('number of likes changes', async () => {
    const r = await api.get('/api/blogs')
    const id = r.body[0].id
    await api.put(`/api/blogs/${id}`)
    .send({...r.body[0],likes:(r.body[0].likes+1) }).expect(200)
    
    const d = await helper.getBlogById(id)
    assert.strictEqual(d.likes, r.body[0].likes +1)
  }
  )
}
)

after(async () => await mongoose.connection.close())