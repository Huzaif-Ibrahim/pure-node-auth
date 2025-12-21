const querystring = require('querystring')

const bodyParser = (req) => {
    return new Promise((resolve) => {
        let body = ''

        req.on('data', (chunk) =>{
            body += chunk.toString()
            console.log(body)
        })
        req.on('end', () => {
            resolve(body ? querystring.parse(body) : null)
        })
    })
}

module.exports = { bodyParser }