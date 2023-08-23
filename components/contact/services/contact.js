const { NotFound, ValidationError } = require("../../../error")
const db = require("../../../models")
const { Op } = require("sequelize")

class Contact{
    constructor(userId,contactName,country){
        this.userId=userId
        this.contactName=contactName
        this.country=country
    }
    static async createContact(userId, contactName,country) {
        try {
            let conObj = new Contact(userId,contactName,country)
            let rowContact = await db.contact.create(conObj)
            return rowContact
        } catch (error) {
            throw error
        }
    }
    static async getAllContact(userid) {
        try {
            let contacts = await db.contact.findAll({ include: db.contactinfo, where: { userId: userid } })
            return contacts
        } catch (error) {
            throw error
        }
    }
    static async getContactById(userid, contactid) {
        try {
            let contacts = await db.contact.findOne( { where: { userId: userid, id: contactid } })
            return contacts
        } catch (error) {
            throw error
        }
    }
    static async updateContact(userID, contactID, parameter, newValue) {
        try {
            let contact
            switch (parameter) {
                case "contactName":
                    contact = await db.contact.update({ contactName: newValue }, { where: { id: contactID, userId: userID } })
                    return contact
                case "country":
                    contact = await db.contact.update({ country: newValue }, { where: { id: contactID, userId: userID } })
                    return contact 
                default:
                    throw new ValidationError("not a valid parameter")
            }
        } catch (error) {
            throw error
        }
    }

    static async deleteContact(userID, contactID) {
        try {
            let contact = await db.contact.destroy({
                where: { id: contactID, userId: userID }
            })
            return "Succcesfully Deleted"
        } catch (error) {
            return error
        }

    }
}


module.exports = Contact