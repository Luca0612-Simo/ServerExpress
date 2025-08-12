const jwt = require('jsonwebtoken')

function sign(data){
    return jwt.sign(data, process.env.JWT_SECRET)
}

function getToken(auth){
    if(auth.indexOf('Bearer')==-1){
        const error = new Error("formato del token invalido")
        error.status = 400
        next(error)
    }
    let token = auth.replace('Bearer ','')
    return token
}

function decode(auth){
    const token = getToken(auth)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    return decoded
}

module.exports = {
    sign,
    decode,
}