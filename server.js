const http = require('http')
require('dotenv').config()
const { add, addMiddleware, handle } = require('./core/router.js')
const { register, login, home, loginGet, registerGet, userLogout } = require('./controllers/userController.js')
const { dashboard, adminLogin, adminLoginGet, adminLogout } = require('./controllers/adminController.js')
const { userAuth, adminAuth } = require('./core/middlewares.js')

addMiddleware('GET', '/home', userAuth, home)
addMiddleware('GET', '/dashboard', adminAuth, dashboard)
add('GET', '/register', registerGet)
add('GET', '/', loginGet)
add('GET', '/admin-login', adminLoginGet)
add('POST', '/register', register)
add('POST', '/login', login)
add('POST', '/admin-login', adminLogin)
add('GET', '/logout', userLogout)
add('GET', '/admin-logout', adminLogout)

const server = http.createServer()
server.on('request', (req, res) => {
    handle(req, res)
})

server.listen(4000, () => {
    console.log('Requests are listening to port 4000.')
})