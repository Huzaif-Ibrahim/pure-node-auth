const fs = require('fs')

const getUser = () => {
    return JSON.parse(fs.readFileSync(`${__dirname}/data.json`, 'utf-8'))
}

const saveUser = (data) => {
    return fs.writeFileSync(`${__dirname}/data.json`, JSON.stringify(data))
}

module.exports = { getUser, saveUser }