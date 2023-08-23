const { ValidationError } = require("../../../error")
const Contact = require("../services/contact")
const http = require('http-status-codes')

const createContact = async(req, resp, next) => {
    try {
        let { userid } = req.params
        userid = parseInt(userid)
        let { contactName,country } = req.body
        if (typeof contactName != "string") {
            throw new ValidationError("Contact Name is not Valid")
        }
        if (typeof country != "string") {
            throw new ValidationError("Country is not Valid")
        }
        const contactObj = await Contact.createContact(userid,contactName,country)
        resp.status(http.StatusCodes.ACCEPTED).send(contactObj)
    } catch (error) {
        next(error)
    }

}

const getAllContact = async (req, resp, next) => {
    try {
        let { userid } = req.params
        userid = parseInt(userid)
        if (typeof userid != "number") {
            throw new ValidationError("User ID is not Valid")
        }
        let allContact = await Contact.getAllContact(userid)
        resp.status(201).send(allContact)
    } catch (error) {
        next(error)
    }
}

const getContactById = async (req, resp, next) => {
    try {
        let { userid ,id } = req.params
        userid = parseInt(userid)
        id = parseInt(id)
        if (typeof userid != "number") {
            throw new ValidationError("USER ID is not Valid")
        }
        if (typeof id != "number") {
            throw new ValidationError("CONTACT ID is not Valid")
        }
        let allContact = await Contact.getContactById(userid,id)
        resp.status(201).send(allContact)
    } catch (error) {
        next(error)
    }
}

const updateContact = async (req, resp, next) => {
    try {
        let { userid ,id} = req.params
        userid = parseInt(userid)
        id = parseInt(id)
        let {parameter, newValue } = req.body
        if (typeof id != "number") {
            throw new ValidationError("Contact Id is not Valid")
        }
        if (typeof userid != "number") {
            throw new ValidationError("User Id is not Valid")
        }
        console.log(parameter);
        const contactObj = await Contact.updateContact(userid, id, parameter, newValue)
        resp.status(http.StatusCodes.ACCEPTED).send(contactObj)
    } catch (error) {
        next(error)
    }
}

const deleteContact = async(req, resp, next) => {
    try {
        let { userid ,id} = req.params
        userid = parseInt(userid)
        id = parseInt(id)
        if (typeof userid != "number") {
            throw new ValidationError("USER Id is not Valid")
        }
        if (typeof id != "number") {
            throw new ValidationError("Contact Id is not Valid")
        }
        const msg = await Contact.deleteContact(userid, id)
        resp.status(http.StatusCodes.ACCEPTED).send(msg)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createContact,
    getAllContact,
    getContactById,
    updateContact,
    deleteContact, 
}