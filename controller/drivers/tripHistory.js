const models = require('../../models/init-models').initModels()

exports.tripHistory = async function(req, res) {
    console.log(req.query)

    try {

        const tripDetails = await models.car_shifts.findAll({
            raw: true,
            where: {
                driver_id: req.query.driver_id,
            }
        })

        return res.status(200).send(tripDetails)

    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}