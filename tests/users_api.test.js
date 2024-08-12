const helper = require('./db_helper')
const User =require('../models/user')
const {test,after,beforeEach,describe} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


beforeEach(async () => {
    
        await User.deleteMany({})
        for(let i=0; i< users.length;i++)
        {   
          let userObject = new User(users[i])
           await userObject.save()
        }
      
      }

)
describe("creation of a new user", async () => {
  test("password is of appropriate length",async () => {
      const initial = await helper.usersIndb()
      const data =   {"username" : "tfdryt",
        "user": "chubtf",
        "password":"43"
    }
      await api.post('/api/users').send(data).expect(400)
      const final = await helper.usersIndb()
      assert.strictEqual(initial.length,final.length)

  })
  test("username is of appropriate length",async () => {
    const initial = await helper.usersIndb()
    const data =   {"username" : "tf",
      "user": "chubtf",
      "password":"4yugu3"
  }
    await api.post('/api/users').send(data).expect(400)
    const final = await helper.usersIndb()
    assert.strictEqual(initial.length,final.length)

})
test("appropriate users are added",async () => {
  const initial = await helper.usersIndb()
  const data =   {"username" : "tfytf",
    "user": "chubtf",
    "password":"4yugu3"
}
  await api.post('/api/users').send(data).expect(201)
  const final = await helper.usersIndb()
  assert.strictEqual(initial.length+1 ,final.length)


})

}
)

