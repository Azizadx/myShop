const Product = require('../Models/productModel')
const { getPostData } = require('../util')

async function getProducts(req, res) {
    try {
        const products = await Product.findAll()


        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(products))
    }
    catch (error) {
        console.log(error)
    }
}


async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id)
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product not found ' }))
        }
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(product))
        }
    }
    catch (error) {
        console.log(error)
    }
}


async function createProduct(req, res) {

    try {
        const body = await getPostData(req)
        const { title, description, price } = JSON.parse(body)
        const product = {
            title,
            description,
            price
        }
        const newProduct = await Product.create(product)
        console.log(newProduct)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newProduct))
    }
    catch (error) {
        console.log(error)
    }
}

async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id)
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product not found ' }))
        }
        else {
            const body = await getPostData(req)
            const { title, description, price } = JSON.parse(body)
            const productData = {
                title:title || product.title,
                description:description || product.description,
                price:price || product.price
            }
            const newProduct = await Product.update(id,productData)
            console.log('update Product information',newProduct)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(newProduct))
        }

    }
    catch (error) {
        console.log(error)
    }

}


async function deleteProduct(req,res,id){
    try {
        let product = await Product.findById(id)
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product not found ' }))
        }
        else {
            await Product.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({message:`Product ${id} remove`}))
        }
    }
    catch (error) {
        console.log(error)
    }   
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}