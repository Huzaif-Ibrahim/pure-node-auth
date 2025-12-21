const ejs = require('ejs')
const fs = require('fs')
const URL = require('url')
const { bodyParser } = require('../core/bodyParser.js')
const { getUser, saveUser } = require('../db/userModel.js')
const { hashPassword, comparePassword } = require('../utils/hash.js')
const { sign } = require('../core/jwtAuth.js')

const register = async (req, res) => {
    try {
        const body = await bodyParser(req)
        const users = getUser()

        const { hash, salt } = await hashPassword(body.password)

        const newUser = {
            name: body.name,
            email: body.email,
            password: hash,
            salt
        }

        const token = sign(`${newUser.name}|${newUser.email}`)

        users.push(newUser)
        saveUser(users)

        res.writeHead(302, { 'Location': '/home', 'Set-Cookie': `token=${token}; HttpOnly` })
        return res.end()

    } catch (error) {
        const template = fs.readFileSync('./views/register.ejs', 'utf-8')
        const html = ejs.render(template, { errorMessage: error.message })

        res.writeHead(401, { 'Content-type': 'text/html' })
        return res.end(html)
    }
}

const login = async (req, res) => {
    try {
        const body = await bodyParser(req)

        const users = getUser()
        const user = users.find(u => u.email === body.email)

        if (!user) {
            const template = fs.readFileSync('./views/login.ejs', 'utf-8')
            const html = ejs.render(template, { errorMessage: 'No user found!' })

            res.writeHead(401, { 'Content-type': 'text/html' })
            return res.end(html)
        }

        const isCompare = await comparePassword(body.password, user.password, user.salt)

        if (!isCompare) {
            const template = fs.readFileSync('./views/login.ejs', 'utf-8')
            const html = ejs.render(template, { errorMessage: 'Email or Password is incorrect!' })

            res.writeHead(401, { 'Content-type': 'text/html' })
            return res.end(html)
        }

        const token = sign(`${user.name}|${user.email}`)

        res.writeHead(302, { 'Location': '/home', 'Set-Cookie': `token=${token}; HttpOnly` })
        return res.end()

    } catch (error) {
        console.log(error.message)
        const template = fs.readFileSync('./views/login.ejs', 'utf-8')
        const html = ejs.render(template, { errorMessage: error.message })

        res.writeHead(401, { 'Content-type': 'text/html' })
        return res.end(html)
    }
}

const loginGet = (req, res) => {
    const parsedUrl = URL.parse(req.url, true)
    const errorMessage = parsedUrl?.query?.errorMessage

    const template = fs.readFileSync('./views/login.ejs', 'utf-8')
    const html = ejs.render(template, { errorMessage })

    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end(html)

}

const registerGet = (req, res) => {
    const template = fs.readFileSync('./views/register.ejs', 'utf-8')
    const html = ejs.render(template)

    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end(html)

}

const home = (req, res) => {
    const template = fs.readFileSync('./views/home.ejs', 'utf-8')
    const html = ejs.render(template, { userName: req.userName })

    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end(html)
}

const userLogout = (req, res) => {
    res.writeHead(302, {
        'Set-Cookie': 'token=; HttpOnly; Max-Age=0',
        'Location': '/'
    })
    res.end()
}

module.exports = {
    register,
    login,
    home,
    loginGet,
    registerGet,
    userLogout
}