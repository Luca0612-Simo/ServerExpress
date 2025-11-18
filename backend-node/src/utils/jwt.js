// const jwt = require('jsonwebtoken')

// function sign(data){
//     return jwt.sign(data, process.env.JWT_SECRET)
// }

// function getToken(auth){
//     if(auth.indexOf('Bearer')==-1){
//         const error = new Error("formato del token invalido")
//         error.status = 400
//         next(error)
//     }
//     let token = auth.replace('Bearer ','')
//     return token
// }

// function decode(auth){
//     const token = getToken(auth)
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)

//     return decoded
// }

// module.exports = {
//     sign,
//     decode,
// }
const jwt = require('jsonwebtoken')

const JWT_SECRET_CLEAN = '1234' 

function sign(data){
    return jwt.sign(data, JWT_SECRET_CLEAN) 
}

function getToken(auth){
    if(auth.indexOf('Bearer')==-1){
        const error = new Error("formato del token invalido")
        error.status = 400
        throw error 
    }
    let token = auth.replace('Bearer ','')
    return token
}

function decode(auth){
    const token = getToken(auth)
    const decoded = jwt.verify(token, JWT_SECRET_CLEAN) 

    return decoded
}

module.exports = {
    sign,
    decode,
}