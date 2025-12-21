const crypto = require('crypto')

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16)

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) return reject(err.message)

            resolve({
                hash: derivedKey.toString('hex'),
                salt: salt.toString('hex')
            })
        })
    })
}

const comparePassword = (password, dbHash, salt) => {
    return new Promise((resolve, reject) => {
        crypto.scrypt(password, Buffer.from(salt, 'hex'), 64, (err, derivedKey) => {
            if (err) return reject(err.message)

            resolve(crypto.timingSafeEqual(
                derivedKey,
                Buffer.from(dbHash, 'hex')
            ))
        })
    })
}

module.exports = { hashPassword, comparePassword }