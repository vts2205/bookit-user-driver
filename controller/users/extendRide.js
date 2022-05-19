const models = require('../../models/init-models').initModels()



exports.extendRide = async function (req, res) {

    console.log('extend ride')
    console.log(req.body)
    let response = {
        statusCode: 1,   // 1 success 0 failure
        code: 200,
        message: 'Success',
        body: {}
    }


    try {

        const previousDrop = await models.carShifts.findOne({
            raw:true,
            where: {
                trip_id: req.body.tripId
            },
            attributes:['drop_location']
        })

        const extendTrip = await models.carShifts.update({ drop_location: req.body.dropLocation },
            {
                where: {
                    trip_id: req.body.tripId
                }
            })

            response.body.userId = req.body.userId
            response.body.tripId = req.body.tripId
            response.body.oldLocation = previousDrop.drop_location
            response.body.newLocation =  req.body.dropLocation
            response.message = 'Trip Extended Successfully'

        return res.status(200).send(response);
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