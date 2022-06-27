const models = require('../../models/init-models').initModels()

exports.tripHistoryUpcoming = async function (req, res) {
    console.log('upcomingtriphistory')
    console.log(req.query)

    let response = {
        statusCode: 1, // 1 success 0 failure
        code: 200,
        message: 'Success',
        body: { driver_id: req.query.driverId }
    }

    try {
        const tripDetails = await models.carShifts.findAll({
            raw: true,
            where: {
                driver_id: req.query.driverId,
                trip_status: 'upcoming'
            }
        })
        response.body.tripHistoryUpcoming = tripDetails
        return res.status(200).send(response)

    } catch (err) {
        console.log(err)
        if (err) {
            response.statusCode = 0
            response.code = 500
            response.message = 'Internal Server Error'
        }
        return res.status(500).send(response)
    }
}