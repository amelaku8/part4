const Blog =  require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const config = require('../utils/config')


const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI)

const users = [
    {"username" : "Baryaw d",
        "name": "shanqo",
        "passwordHash":"43w dad dfsdf65"
    },
    {"username" : "Abebe",
      "name": "beso",
      "passwordHash":"dafefe43wresdf65"
  },
  {"username" : "Chala",
    "name": "chube",
    "passwordHash":"43wdafresdf65"
}
]
const blogs = [
    { 
      username:"Baryaw d",

      blog:{
        title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      
    }},
    {
      username:"Abebe",
      blog:{
        title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,}
    },
    {
      username:"Chala",
      blog:{  
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    }
  },
    {
     username:"Abebe",
     blog:{ 
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
     }
    },
    {
      username:"Chala",
      blog: {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      }
    },
    {
      username:"Baryaw d",
      blog:{
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      }
    }  
  ]

const makeBlogEntries = async () => {
  for(let  i = 0; i< blogs.length; i++  ){
    const user = User.findOne({"username":blogs[i].username})
    const blog = new Blog({...blogs[i].blog,userId:user._id
      })

      await blog.save()
  }
}


 
const blogsIndb = async () => {
    r = await Blog.find({})
    return r

}

const getBlogById = async (id) =>{
    r = await Blog.findById(id)


    return r.toJSON()
}
const usersIndb = async () => {
    r = await User.find({})
    return r

}

module.exports ={blogsIndb,getBlogById,usersIndb,users,blogs}