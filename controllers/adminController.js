const fs = require('fs')
const ejs = require('ejs')
const URL = require('url')
const { bodyParser } = require("../core/bodyParser")
const { sign } = require("../core/jwtAuth")

const adminLogin = async (req, res) => {
    try {
        const { email, password } = await bodyParser(req)

        if (!email || !password) {
            const template = fs.readFileSync('./views/admin-login.ejs', 'utf-8')
            const html = ejs.render(template, { errorMessage: 'Incomplete credientials' })

            res.writeHead(401, { 'Content-type': 'text/html' })
            return res.end(html)
        }

        const isCorrect =
            email === 'admin@gmail.com' &&
            password === 'huzaif'

        if (!isCorrect) {
            const template = fs.readFileSync('./views/admin-login.ejs', 'utf-8')
            const html = ejs.render(template, { errorMessage: 'Incorrect credientials' })

            res.writeHead(401, { 'Content-type': 'text/html' })
            return res.end(html)
        }

        const token = sign(email + password)

        res.writeHead(302, { 'Location': '/dashboard', 'Set-Cookie': `token=${token}; HttpOnly` })
        return res.end()

    } catch (error) {
        console.log(error.message)
        const template = fs.readFileSync('./views/admin-login.ejs', 'utf-8')
        const html = ejs.render(template, { errorMessage: error.message })

        res.writeHead(401, { 'Content-type': 'text/html' })
        return res.end(html)
    }
}

const adminLoginGet = (req, res) => {
    const parsedUrl = URL.parse(req.url, true)
    const errorMessage = parsedUrl?.query?.errorMessage

    const template = fs.readFileSync('./views/admin-login.ejs', 'utf-8')
    const html = ejs.render(template, { errorMessage })

    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end(html)
}

const dashboard = (req, res) => {
    const template = fs.readFileSync('./views/dashboard.ejs', 'utf-8')
    const html = ejs.render(template)

    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end(html)
}

const adminLogout = (req, res) => {
    res.writeHead(302, {
        'Set-Cookie': 'token=; HttpOnly; Max-Age=0',
        'Location': '/admin-login'
    })
    res.end()
}

module.exports = { dashboard, adminLogin, adminLoginGet, adminLogout }