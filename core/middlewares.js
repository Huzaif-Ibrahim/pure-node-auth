const { verify } = require("./jwtAuth")

const userAuth = async (req, res, next) => {
    try {
        const token = req.headers.cookie ? req.headers.cookie
            .split('; ')
            .find(c => c.startsWith('token='))
            ?.split('=')[1] : null

        if (!token) {
            res.writeHead(302, { 'Location': '/?errorMessage=You need to login first' })
            return res.end()
        }

        const isVerify = verify(token)

        if (isVerify == null) {
            res.writeHead(302, { 'Location': '/?errorMessage=Unauthorized user' })
            return res.end()
        }

        const userData = isVerify.split('|')
        req.userName = userData[0]
        req.userEmail = userData[1]

        next(req, res)

    } catch (error) {
        console.log(error.message)
        res.end(error.message)
    }
}

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.cookie ? req.headers.cookie
            .split('; ')
            .find(c => c.startsWith('token='))
            ?.split('=')[1] : null

        if (!token) {
            res.writeHead(302, { 'Location': '/admin-login?errorMessage=You need to login as admin first' })
            return res.end()
        }

        const isVerify = verify(token)

        if (isVerify == null) {
            res.writeHead(302, { 'Location': '/admin-login?errorMessage=Unauthorized admin' })
            return res.end()
        }

        next(req, res)

    } catch (error) {
        console.log(error.message)
        res.end(error.message)
    }
}

module.exports = { userAuth, adminAuth }