let users = require('../data/users.json')

const {v4: uuidv4} = require('uuid')

const {  writeDataToFile } = require('../util')

function findAll(){
    return new Promise((resovle,reject)=>{
        resovle(users)
    })
}

function findById(id){
    return new Promise((resovle,reject)=>{
        const user = users.find((p)=> p.id === id)
        resovle(user)
    })
}

function create(user){
    return new Promise((resovle,reject)=>{
        const newUser = {id:uuidv4(),...user}
        users.push(newUser)
        writeDataToFile('./data/users.json',users)
        resovle(newUser)
    })
}

function update(id,user){
    return new Promise((resovle,reject)=>{
        const index = users.findIndex((p)=>p.id === id)
        users[index] = {id, ...user}
        writeDataToFile('./data/users.json',users)
        resovle(users[index])
    })
}

function remove (id){
    return new Promise((resovle,reject)=>{
       users = users.filter((p) =>p.id !==id )
        writeDataToFile('./data/users.json',users)
        resovle()
    })
}


module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
} 