const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const verifyToken = require('./middlewares/token_verify')
var fileupload = require("express-fileupload");
// var verifyToken = require('./middlewares/token_verify')



dotenv.config()
app.use(express.json())

app.use(cookieParser())
// // app.use(bodyParser)
// // // app.use(upload.array())
app.use(fileupload());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.raw())
app.use(bodyParser.json())
app.use(cors(
  {
    origin:'*'
  }
))



// app.use(verifyToken)

app.use('/api/mobile/user', require('./routes/user'))
app.use('/api/mobile/admin', require('./routes/admin'))
app.use('/api/mobile/driver', require('./routes/driver'))


app.listen(process.env.PORT, (err)=> {
    if(err) {
        console.log('Server is not connected')
    }
    else {
        console.log('Server connected to port: ' + process.env.PORT)
    }
    
})