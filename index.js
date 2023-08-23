const express = require('express')
const application=express()
const router =require("./components")
const cookieParser= require('cookie-parser')
const { errorMiddleware, urlNotFound } = require('./middleware/ErrorHandler')

application.use(express.json())
application.use(cookieParser())

application.use('/api/v1/contactapp', router)
application.use(errorMiddleware)
application.use(urlNotFound)

application.listen(9000, () => {
    console.log("started at 9000");
})
