const models = require('../../models/init-models').initModels()
const moment = require('moment')
// const replyData = require('../../common/replyData')
// const { Sequelize } = require('sequelize')

exports.userbookhistroy = async function (req, res) {
    console.log('Booking Histroy for User')
    let response = {
        statusCode :1,   // 1 success 0 failure
        code :200,
        message :'Success'
    }

    try {        
        console.log(req.query)
        
        response.body = {
          userId: req.query.userId
        }

        const bookingHistory = await models.carShifts.findAll({
            raw: true,
            where: {
                customer_id : req.query.userId
            }
        })

        response.body.bookingHistory = bookingHistory
    } catch (err) {
        if (err)

            response.statusCode = 0
            response.code = 500
            response.message = 'Internal Server Error'
            response.body = {
                userId: req.body.userId
              }
    }
    console.log(response)
    return  res.status(response.code).send(response)
} 