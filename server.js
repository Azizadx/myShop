const http = require('http')
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('./Controllers/productsController')
const { getUsers, createUser, getUser, updateUser,  deleteUser } = require('./Controllers/usersController')
const server = http.createServer((req, res) => {
    if (req.url === '/api/products') {

        if (req.method === 'GET') {
            getProducts(req, res)
        }


        else if (req.method === 'POST') {
            createProduct(req, res)
        }

        // else if (req.url.match(/\/api\/products\/([0-9]+)/) && ) {
        //     const id = req.url.split('/')[3]
        //     updateProduct(req, res, id)
        // }

        // else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE') {
        //     const id = req.url.split('/')[3]
        //     deleteProduct(req, res, id)
        // }

        else {
            res.writeHead(404, { 'Content-Type': 'appliction/json' })
            res.end(JSON.stringify({ message: 'Not found' }))
        }
    }

    else if (req.url === '/api/users') {

        if (req.method === 'GET') {
            getUsers(req, res)
        }

        else if (req.method === 'POST') {
            createUser(req, res)
        } 
    }


    else if (req.url.match(/\/api\/products\/([0-9]+)/)) {
        if (req.method === 'GET') {
            const id = req.url.split('/')[3]
            getProduct(req, res, id)
        }
        else if (req.method === 'PUT') {
            const id = req.url.split('/')[3]
            updateProduct(req, res, id)
        }
        else if (req.method === 'DELETE') {

            const id = req.url.split('/')[3]
            deleteProduct(req, res, id)
        }
    }


    else if (req.url.match(/\/api\/users\/([0-9]+)/)) {
        if (req.method === 'GET') {
            const id = req.url.split('/')[3]
            console.log(id)
            getUser(req, res, id)
        }
        else if (req.method === 'PUT') {
            const id = req.url.split('/')[3]
            updateUser(req, res, id)
        }
        else if (req.method === 'DELETE') {

            const id = req.url.split('/')[3]
            deleteUser(req, res, id)
        }
    }

    else {
        res.writeHead(404, { 'Content-Type': 'appliction/json' })
        res.end(JSON.stringify({ message: 'Page Not found' }))
    }


})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`server running on port ${PORT}`))