const { NotFound } = require('../../../error')
const { login: loginAD } = require('../services/login')
require('dotenv').config()
const http = require('http-status-codes')

const login = async (req, resp, next) => {
    console.log("in login>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    try {
        const { userid, password } = req.body
        if (typeof userid != "number") {
            throw new ValidationError("User ID is not Valid")
        }
        if (typeof password != "string") {
            throw new ValidationError("Password is not Valid")
        }
        console.log(userid)
        console.log(password)
        const token = await loginAD(userid, password)
        resp.cookie(process.env.COOKIE_NAME_AUTH, token)
        resp.status(http.StatusCodes.ACCEPTED).send({accesToken: token})
    } catch (error) {
        next(error)
    }
}

const logout=(req,resp,next)=>{
    const token = req.cookies[process.env.COOKIE_NAME_AUTH]
    if(!token){
        throw new NotFound("Cookie Not Found")
    }
    resp.cookie(process.env.COOKIE_NAME_AUTH,token,{expires:new Date()})
    resp.status(http.StatusCodes.ACCEPTED).send("Logged Out ")
}


module.exports = { login,logout }