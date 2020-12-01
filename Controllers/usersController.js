const User = require('../Models/userModel')
const { getPostData } = require('../util')

async function getUsers(req, res) {
    try {
        const users = await User.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(users))
    }
    catch (error) {
        console.log(error)
    }
}

async function createUser(req, res) {
    try {
        const body = await getPostData(req)
        const { username, email, password } = JSON.parse(body)
        const user = {
            username,
            email,
            password
        }
        const newUser = await User.create(user)
        console.log(newUser)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newUser))
    }
    catch (error) {
        console.log(error)
    }
}

async function getUser(req,res,id){
     try {
        const user = await User.findById(id)
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'User not found ' }))
        }
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(user))
        }
    }
    catch (error) {
        console.log(error)
    }
}

async function updateUser(req, res,id) {
    try {
        const user = await User.findById(id)
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product not found ' }))
        }
        else {
            const body = await getPostData(req)
            const { username, email, password } = JSON.parse(body)
            const userData = {
                username:username || user.username,
                email:email || user.email,
                password:password || user.password
            }
            const upP = await User.update(id,userData)
            console.log('update User information',upP)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(upP))
        }

    }
    catch (error) {
        console.log(error)
    }

}

async function deleteUser(req,res,id){
    try {
       const user = await User.findById(id)
       if (!user) {
           res.writeHead(404, { 'Content-Type': 'application/json' })
           res.end(JSON.stringify({ message: 'User not found ' }))
       }
       else {
        await User.remove(id)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({message:`User ${id} remove`}))
    }

   }
   catch (error) {
       console.log(error)
   }
}


module.exports = {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
}