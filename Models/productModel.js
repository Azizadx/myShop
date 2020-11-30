let products = require('../data/products.json')
const {v4: uuidv4} = require('uuid')

const {  writeDataToFile } = require('../util')
function findAll(){
    return new Promise((resovle,reject)=>{
        resovle(products)
    })
}

function findById(id){
    return new Promise((resovle,reject)=>{
        const product = products.find((p)=> p.id === id)
        resovle(product)
    })
}

function create(product){
    return new Promise((resovle,reject)=>{
        const newProduct = {id:uuidv4(),...product}
        products.push(newProduct)
        writeDataToFile('./data/products.json',products)
        resovle(newProduct)
    })
}

function update(id,product){
    return new Promise((resovle,reject)=>{
        const index = products.findIndex((p)=>p.id === id)
        products[index] = {id, ...product}
        writeDataToFile('./data/products.json',products)
        resovle(products[index])
    })
}

function remove (id){
    return new Promise((resovle,reject)=>{
       products = products.filter((p) =>p.id !==id )
        writeDataToFile('./data/products.json',products)
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