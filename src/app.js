const express = require('express')
const path = require('path')

const mongoose = require('mongoose')
const session = require('express-session')
const cookieParser = require('cookie-parser')


//Configuring App
const app = express()
app.use(express.json())
// app.use(express.static('public'))
app.use(cookieParser())
// using dotenv module for environment
require('dotenv').config()

//Configuring Port
const PORT = process.env.PORT || 3000

//Mongoose connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to mongo server'))
  .catch((err) => console.error(err))


app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true,
  })
)

//Routes
const indexRoutes = require('./routes/index')
app.use('/', indexRoutes)
//Start the server
app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})




//  const User= require('./models/Crypto')
// const databasedlt= async()=>{
//    const user = await User.find({})
//    user.forEach(async(data)=>{
//         await User.findByIdAndDelete(data._id)
//    })
//    console.log("deleted")
// }
// databasedlt()



//  const Relations= require('./models/Hospital')
// const databasedlt= async()=>{
//    const user = await Relations.find({_id: "60259290d60e72021ba9ed4a"})
//    user.forEach(async(data)=>{
//         await Relations.findByIdAndDelete(data._id)
//    })
//    console.log("deleted")
// }
// databasedlt()
