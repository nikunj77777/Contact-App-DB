const { ValidationError } = require("../../../error")
const ContactInfo=require('../services/contactInfo')
const http = require('http-status-codes')

const createContactInfo = async(req, resp, next) => {
    try {
        let { contactid } = req.params
        contactid = parseInt(contactid)
        let { phoneNumber,email } = req.body
        if (typeof phoneNumber != "string") {
            throw new ValidationError("Phone Number is not Valid")
        }
        if (typeof email != "string") {
            throw new ValidationError("Email Id is not Valid")
        }
        const contactInfoObj = await ContactInfo.createContactInfo(contactid,phoneNumber,email)
        resp.status(http.StatusCodes.ACCEPTED).send(contactInfoObj)
    } catch (error) {
        next(error)
    }
}
const getAllContactInfo = async (req, resp, next) => {
    try {
        let { contactid } = req.params
        contactid = parseInt(contactid)
        if (typeof contactid != "number") {
            throw new ValidationError("Contact ID is not Valid")
        }
        let allContact = await ContactInfo.getAllContactInfo(contactid)
        resp.status(http.StatusCodes.ACCEPTED).send(allContact)
    } catch (error) {
        next(error)
    }
}
const getContactInfoById = async (req, resp, next) => {
    try {
        let { contactid ,id } = req.params
        contactid = parseInt(contactid)
        id = parseInt(id)
        if (typeof contactid != "number") {
            throw new ValidationError("Contact ID is not Valid")
        }
        if (typeof id != "number") {
            throw new ValidationError("CONTACT INFO ID is not Valid")
        }
        let allContact = await ContactInfo.getContactInfoById(contactid,id)
        resp.status(http.StatusCodes.ACCEPTED).send(allContact)
    } catch (error) {
        next(error)
    }
}
const updateContactInfo = async (req, resp, next) => {
    try {
        let { contactid ,id} = req.params
        contactid = parseInt(contactid)
        id = parseInt(id)
        let {parameter, newValue } = req.body
        if (typeof id != "number") {
            throw new ValidationError("Contact INFO Id is not Valid")
        }
        if (typeof contactid != "number") {
            throw new ValidationError("Contact Id is not Valid")
        }
        const contactObj = await ContactInfo.updateContactInfo(id,contactid,parameter,newValue)
        resp.status(http.StatusCodes.ACCEPTED).send(contactObj)
    } catch (error) {
        next(error)
    }
}
const deleteContactInfo = async(req, resp, next) => {
    try {
        let { contactid ,id} = req.params
        contactid = parseInt(contactid)
        id = parseInt(id)
        if (typeof contactid != "number") {
            throw new ValidationError("Contact Id is not Valid")
        }
        if (typeof id != "number") {
            throw new ValidationError("Contact Info Id is not Valid")
        }
        const msg = await ContactInfo.deleteContactInfo(contactid, id)
        resp.status(http.StatusCodes.ACCEPTED).send(msg)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createContactInfo,
    getAllContactInfo,
    getContactInfoById,
    updateContactInfo,
    deleteContactInfo, 
}