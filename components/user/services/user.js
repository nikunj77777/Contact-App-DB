const db = require("../../../models")
const bcrypt = require('bcrypt')
const { Op } = require("sequelize")

class User {
    constructor(fullName, age, gender, password, isAdmin) {
        this.fullName = fullName
        this.age = age
        this.gender = gender
        this.isAdmin = isAdmin
        this.password = password
    }
    static async createAdmin(fullName, age, gender, password) {
        try {
            let hash = User.hashPassword(password)
            let userObj = new User(fullName, age, gender, password, true)
            userObj.password = await hash
            let rowBank = await db.user.create(userObj)
            return rowBank
        }
        catch (error) {
            throw error
        }
    }
    static async createUser(fullName, age, gender, password) {
        try {
            let hash = User.hashPassword(password)
            let userObj = new User(fullName, age, gender, password, false)
            userObj.password = await hash
            let rowBank = await db.user.create(userObj)
            return rowBank
        } catch (error) {
            throw error
        }
    }
    static hashPassword(password) {
        try {
            let hash = bcrypt.hash(password, 12)
            return hash
        } catch (error) {
            throw error
        }
    }
    static comparePassword(password, hash) {
        try {
            let cmp = bcrypt.compare(password, hash)
            return cmp
        } catch (error) {

        }
    }
    static async getUserById(userId) {
        try {
            let user = await db.user.findOne({include:{
                model: db.contact,
                include: db.contactinfo
            },where: { id: userId } })
            return user
        } catch (error) {
            throw error
        }
    }
    static async getAllUser(age,isAdmin,fullName,gender,offset=0,limit=5) {
        try {
        let whereClause = {};
        if (typeof age !== 'undefined') {
            whereClause.age = { [Op.lte]: age };
        }
        if (typeof isAdmin !== 'undefined') {
            whereClause.isAdmin = { [Op.eq]: isAdmin };
        }
        if(typeof fullName!='undefined'){
            whereClause.fullName={[Op.eq]:fullName}
        }
        if(typeof gender !='undefined'){
            whereClause.gender={[Op.eq]:gender}
        }
        let user = await db.user.findAndCountAll({offset:offset,limit:limit,include:{
            model: db.contact,
            include: db.contactinfo
        },where:whereClause})
            return user
        } catch (error) {
            throw error
        }
    }
    static async updateUser(ID, parameter, newValue) {
        try {
            let user
            switch (parameter) {
                case "fullName":
                    user = await db.user.update({fullName:newValue},{where:{id:ID}})
                    return user
                case "gender":
                    user = await db.user.update({gender:newValue},{where:{id:ID}})
                    return user
                case "age":
                    user = await db.user.update({age:newValue},{where:{id:ID}})
                    return user
                default:
                    throw new ValidationError("Not a Valid Parameter")
            }
        }
        catch (error) {
            throw error
        }
    }
    static async deleteUser(userId) {
        try {
            try {
                let user = await db.user.destroy({
                    where: { id: userId }
                })
                return "Succcesfully Deleted"
            } catch (error) {
                return error 
            }
        } catch (error) {
            
        }
    }
}

module.exports = User
