const { ValidationError } = require("../../../error")

class ContactInfo {
    constructor(contactId, phoneNumber, email) {
        this.contactId = contactId
        this.phoneNumber - phoneNumber
        this.email = email
    }

    static async createContactInfo(contactId, phoneNumber, email) {
        try {
            let conObj = new ContactInfo(contactId, phoneNumber, email)
            let rowContactInfo = await db.contactinfo.create(conObj)
            return rowContactInfo
        } catch (error) {
            throw error
        }
    }

    static async getAllContactInfo(contactid) {
        try {
            let contactInfos = await db.contactinfo.findAll({ where: { contactId: contactid } })
            return contactInfos
        } catch (error) {
            throw error
        }
    }

    static async getContactInfoById(contactid, contactinfoid) {
        try {
            let contactInfos = await db.contactinfo.findOne({ where: { id: contactinfoid, contactId: contactid } })
            return contactInfos
        } catch (error) {
            throw error
        }
    }

    static async updateContactInfo(contactInfoID, contactID, parameter, newValue) {
        try {
            let contactinfo
            switch (parameter) {
                case "phoneNumber":
                    contactinfo = await db.contactinfo.update({ phoneNumber: newValue }, { where: { id: contactInfoID, contactId: contactID } })
                    return contactinfo
                case "email":
                    contactinfo = await db.contactinfo.update({ email: newValue }, { where: { id: contactInfoID, contactId: contactID } })
                    return contactinfo
                default:
                    throw new ValidationError("not a valid parameter")
            }
        } catch (error) {
            throw error
        }
    }


    static async deleteContactInfo(contactID, contactInfoId) {
        try {
            let contactinfo = await db.contactinfo.destroy({
                where: { id: contactInfoId, contactId: contactID }
            })
            return "Succcesfully Deleted"
        } catch (error) {
            return error
        }
    }
}

module.exports = ContactInfo