
const express = require('express')
const contactRouter = express.Router({ mergeParams: true })

const { createContact,getAllContact,getContactById,updateContact,deleteContact} = require('./controller/contact')
const contactInfoRouter = require('../contactInfo')

const JWTMiddleware = require('../../middleware/authentication')

// contactRouter.use(JWTMiddleware.verifyUserWithCookie)

contactRouter.post('/', createContact)
contactRouter.get('/', getAllContact)
contactRouter.get('/:id',getContactById)
contactRouter.put('/:id', updateContact)
contactRouter.delete('/:id', deleteContact)

contactRouter.use('/:contactid/contactinfo',contactInfoRouter)

module.exports = contactRouter 