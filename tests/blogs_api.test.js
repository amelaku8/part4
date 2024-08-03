const {test,after,beforeEach,describe} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')
const { initial } = require('lodash')
const api = supertest(app)

const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      
    },
    {
    
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    },
    {

      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    },
    {
      
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      
    },
    {
      
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      
    },
    {
      
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      
    }  
  ]

beforeEach(async () => {
  await Blog.deleteMany({})
  for(let i=0; i< blogs.length;i++)
  {   
    let BlogObject = new Blog(blogs[i])
     await BlogObject.save()
  }

})

describe('get method works' ,  () => {
test('blogs are returned as json',async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type',/application\/json/)
})

test('number of blogs is correct', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body)
    assert.strictEqual(response.body.length,blogs.length)
})

test('id is the identifier for each blog', async () => {
    const response = await api.get('/api/blogs')
    const ids= response.body.map(r => r.id)
    for(let i=0; i< response.body.length ;i++){
        r = await api.get(`/api/blogs/${response.body[i].id}`)
        assert.deepStrictEqual(r.body,response.body[i])
    }
})
})

dummy = {
    title:'dddd',
    author: 'dfsafd',
    url:"3234242",
    likes:12
}
describe('post method works' , () => {
    test('number of notes is increased', async () => {
        await api.post('/api/blogs').send(dummy)
        const r = await api.get('/api/blogs')
        assert.strictEqual(r.body.length, (blogs.length+1))
    })

    test('like defaults to 0 if not given',async () =>{
        dd = {
            title:'def',
            author: 'errr',
            url: 'dfdd'
        }
        await api.post('/api/blogs').send(dd)
        response = await api.get('/api/blogs')
        
        assert.strictEqual(response.body.length,blogs.length+1)
     
        
    })

      
    
})

after(async () => await mongoose.connection.close())

