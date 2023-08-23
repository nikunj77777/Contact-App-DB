const express = require('express')
const contactInfoRouter = express.Router({ mergeParams: true })
const JWTMiddleware = require('../../middleware/authentication')


const { createContactInfo,getAllContactInfo,getContactInfoById,updateContactInfo,deleteContactInfo} = require('./controller/contactInfo')

contactInfoRouter.use(JWTMiddleware.verifyUserWithCookie)
contactInfoRouter.post('/', createContactInfo)
contactInfoRouter.get('/', getAllContactInfo)
contactInfoRouter.get('/:id',getContactInfoById)
contactInfoRouter.put('/:id', updateContactInfo)
contactInfoRouter.delete('/:id', deleteContactInfo)


module.exports = contactInfoRouter 