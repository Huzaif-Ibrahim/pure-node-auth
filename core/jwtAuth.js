const crypto = require('crypto')

const secret = process.env.SIGNATURE_SECRET_KEY

const sign = (payload) => {
    const head = Buffer.from(JSON.stringify({ alg: 'HS256' })).toString('base64url')
    const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
    const signature = crypto.createHmac('sha256', secret).update(`${head}.${body}`).digest('base64url')

    return `${head}.${body}.${signature}`
}

const verify = (token) => {
    const [h, b, s] = token.split('.')
    const check = crypto.createHmac('sha256', secret).update(`${h}.${b}`).digest('base64url')

    if (!crypto.timingSafeEqual(Buffer.from(check, 'base64url'), Buffer.from(s, 'base64url'))) return null

    return JSON.parse(Buffer.from(b, 'base64url').toString())
}

module.exports = { sign, verify }