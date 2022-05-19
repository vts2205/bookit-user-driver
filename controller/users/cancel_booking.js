const models = require('../../models/init-models').initModels()

exports.cancelBooking = async function (req, res) {

    console.log('cancel booking')
    console.log(req.body)

    let response = {
        statusCode: 1,   // 1 success 0 failure
        code: 200,
        message: 'Success',
        body: {}
    }

    try {
        const tripDetails = await models.carShifts.findOne({
            where: {
                trip_id: req.body.tripId
            }, raw: true,
        })
        response.body.userId = req.body.userId

        if (tripDetails.status === 'upcoming' || tripDetails === 'inprogess') {
            const cancelTrip = await models.carShifts.update({ trip_status: 'cancelled' },
                {
                    where: {
                        trip_id: req.body.tripId
                    }
                })
        } else {
            response.message = 'The Given Trip Id Is Already Completed'
        }

        return res.status(200).send(response);
    } catch (err) {
        if (err) {
            response.statusCode = 0
            response.code = 500
            response.message = 'Internal Server Error'
            response.body.userId = req.body.userId

            return res.status(500).send(response);
        }
    }
} 