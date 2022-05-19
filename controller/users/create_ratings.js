const models = require('../../models/init-models').initModels()
const moment = require('moment')


exports.createratings = async function (req, res) {
    console.log('Ratings route')
    let response = {
        statusCode: 1,   // 1 success 0 failure
        code: 200,
        message: 'Success',
        body: {}
    }
    console.log(req.body)

    try {     

        const ratings = {
            ratings: req.body.ratings
        }

        const getratings = await models.cabShifts.update(ratings, {
            where: {
                trip_id: req.body.tripId
            }
        })      
       

        return res.status(200).send(response)
    } catch (err) {
       
        if (err) {
            response.statusCode = 0
            response.code = 500
            response.message = 'Internal Server Error'
            response.body.userId = req.body.userId
            response.body.tripId = req.body.tripId

            return res.status(500).send(response);
        }
    }
} 