const models = require('../../models/init-models').initModels()
const { Op } = require('sequelize')

exports.subAdminOwner = async function(req, res) {

    console.log(req)
    let response = {
        statusCode: 1, // 1 success 0 failure
        code: 200,
        message: 'Success'
    }
    try {

        const ownerData = await models.owner.findAll({
            raw: true,
            attributes: ['aadhar_front', 'aadhar_back', 'pan_card', 'passbook', 'rental_agreement1', 'rental_agreement2'],
            include: [{
                model: models.drivers,
                as: 'driver_driver',
                attributes: ['name', 'contact', 'driver_id'],
                where: {
                    driver_status: {
                        [Op.eq]: 'confirmed'
                    }
                }
            }]
        })

        if (ownerData.length > 0) {
            response.body = ownerData
        } else {
            response.message = 'No Data found'
        }

        return res.status(response.code).send(response);

    } catch (err) {
        if (err) {
            response.statusCode = 0
            response.code = 500
            response.message = 'Internal Server Error'
                // response.body.userId = req.body.driverId

            return res.status(500).send(response);
        }

    }

}