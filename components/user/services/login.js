
const JWTMiddleware = require("../../../middleware/authentication")
const db = require("../../../models")
const User = require("./user")

const  login = async(userid, passwordd) => {
    try {
        let user = await db.user.findOne({where:{id:userid}})
        if(!await User.comparePassword(passwordd,user.password)){
            throw new Unauthorized("Password Does not Match")
        }
        return JWTMiddleware.sign(userid, user.isAdmin)
    } catch (error) {
        throw error
    }
}


module.exports = { login }

