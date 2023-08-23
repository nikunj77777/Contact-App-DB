const express = require('express')
const userRouter = express()
const { createUser,createAdmin,getAllUser,getUserById,updateUser,deleteUser} = require('./controller/user')
const contactRouter = require('../contact')
const{login,logout}=require('./controller/login')

const JWTMiddleware = require('../../middleware/authentication')


userRouter.post('/login',login)
userRouter.post('/logout',logout)
userRouter.post('/admin', createAdmin)

// userRouter.use(JWTMiddleware.verifyAdminWithCookie)
userRouter.post('/',JWTMiddleware.verifyAdminWithCookie,createUser)
userRouter.get('/', JWTMiddleware.verifyAdminWithCookie,getAllUser)
userRouter.get('/:id',JWTMiddleware.verifyAdminWithCookie, getUserById)
userRouter.put('/:id',JWTMiddleware.verifyAdminWithCookie, updateUser)
userRouter.delete('/:id',JWTMiddleware.verifyAdminWithCookie,deleteUser)

userRouter.use('/:userid/contact',contactRouter)

module.exports = userRouter 