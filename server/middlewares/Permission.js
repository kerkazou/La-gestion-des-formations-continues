var storage = require('local-storage');

const authPermission = async (req, res, next) => {
    const token = storage('token')
    if(token) res.send('You are already connected')
    else next()
}

const userPermission = async (req, res, next) => {
    const token = storage('token')
    if(!token) res.send('You are not connected')
    else next()
}

module.exports = {
    authPermission,
    userPermission
}