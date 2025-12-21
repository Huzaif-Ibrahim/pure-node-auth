const URL = require('url')

const routes = []

const add = (method, path, handler) => {
    routes.push({ method, path, handler })
}

const addMiddleware = (method, path, middleware, handler) => {
    routes.push({ method, path, middleware, handler })
}

const handle = (req, res) => {
    const parsedUrl = URL.parse(req.url, true)
    const path = parsedUrl.pathname

    const route = routes.find((r) => {
        return r.path === path && r.method === req.method
    })

    if (!route) {
        res.writeHead(404)
        return res.end('No route found!')
    }

    req.query = parsedUrl.query
    route.middleware ? route.middleware(req, res, route.handler) : route.handler(req, res)
}

module.exports = { add, handle, addMiddleware }