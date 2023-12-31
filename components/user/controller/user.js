const { HTTP_VERSION_NOT_SUPPORTED } = require("http-status-codes")
const { ValidationError } = require("../../../error")
const User = require("../services/user")
const http = require('http-status-codes')

const createUser = async (req, resp, next) => {
    try {
        const { fullName, age, gender, password } = req.body
        if (typeof fullName != "string") {
            throw new ValidationError("Name is not Valid")
        }
        if (typeof age != "number") {
            throw new ValidationError("Age is not Valid")
        }
        if (typeof gender != "string") {
            throw new ValidationError("Gender is not Valid")
        }
        if (typeof password != "string") {
            throw new ValidationError("Password is not Valid")
        }
        let userObj = await User.createUser(fullName, age, gender, password)
        resp.status(http.StatusCodes.CREATED).send(userObj)

    } catch (error) {
        next(error)
    }
}


const createAdmin = async (req, resp, next) => {
    try {
        const { fullName, age, gender, password } = req.body
        if (typeof fullName != "string") {
            throw new ValidationError("Name is not Valid")
        }
        if (typeof age != "number") {
            throw new ValidationError("Age is not Valid")
        }
        if (typeof gender != "string") {
            throw new ValidationError("Gender is not Valid")
        }
        if (typeof password != "string") {
            throw new ValidationError("Password is not Valid")
        }
        let userObj = await User.createAdmin(fullName, age, gender, password)
        resp.status(http.StatusCodes.CREATED).send(userObj)
    } catch (error) {
        next(error)
    }
}
const getAllUser = async (req, resp, next) => {
    try {
        let {age,isAdmin,fullName,gender,offset,limit}=req.query
        if (offset && limit){
            offset = parseInt(offset)
            limit = parseInt(limit)
            if (typeof offset != "number" || offset<0) {
                throw new ValidationError('Offset not valid')
            }
            if (typeof limit != "number" || limit<0) {
                throw new ValidationError('Limit not valid')
            }
            let allUsers= await User.getAllUser(age,isAdmin,fullName,gender,offset,limit)
            resp.status(http.StatusCodes.ACCEPTED).send(allUsers)
        }
        let allUsers= await User.getAllUser(age,isAdmin,fullName,gender)
        resp.status(http.StatusCodes.ACCEPTED).send(allUsers)
    } catch (error) {
        next(error)
    }
}
const getUserById = async(req, resp, next) => {
    try {
        let { id } = req.params
        id = parseInt(id)
        if (typeof id != "number") {
            throw new ValidationError("ID is not Valid")
        }
        let userObj = await User.getUserById(id)
        resp.status(http.StatusCodes.ACCEPTED).send(userObj)
    } catch (error) {
        next(error)
    }
}
const updateUser = async(req, resp, next) => {
    try {
        let { id } = req.params
        id = parseInt(id)
        if (typeof id != "number") {
            throw new ValidationError("ID is not Valid")
        }
        let { parameter, newValue } = req.body
        if (typeof parameter != "string") {
            throw new ValidationError("Parameter is not Valid")
        }
        let userObj = await User.updateUser(id, parameter, newValue)
        resp.status(http.StatusCodes.ACCEPTED).send(userObj)
    } catch (error) {
        next(error)
    }
}
const deleteUser = async(req, resp, next) => {
    try {
        let { id } = req.params
        id = parseInt(id)
        if (typeof id != "number") {
            resp.status(http.StatusCodes.BAD_REQUEST).send({
                message: "Validation Error "
            })
        }
        let msg = await User.deleteUser(id)
        resp.status(http.StatusCodes.OK).send(msg)
    } catch (error) {
        next(error)
    }

}

module.exports = {
    createUser,
    createAdmin,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser

}