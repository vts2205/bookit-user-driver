const models = require('../../models/init-models').initModels()

exports.subAdminDriver = async function(req, res) {

    console.log(req)
    let response = {
        statusCode: 1, // 1 success 0 failure
        code: 200,
        message: 'Success'
    }
    try {

        const carData = await models.documents.findAll({
            raw: true,
            attributes: ['profile_pic', 'aadhar_front', 'aadhar_back', 'license_front', 'license_back'],
            include: [{
                model: models.drivers,
                as: 'driver',
                attributes: ['name', 'contact', 'driver_id'],
                where: {
                    driver_status: {
                        [Op.eq]: 'confirmed'
                    }
                }
            }]
        })

        if (carData.length > 0) {
            response.body = carData
        } else {
            response.message = 'No Data found'
        }
        return res.status(response.code).send(response);

    } catch (err) {
        if (err) {
            response.statusCode = 0
            response.code = 500
            response.message = 'Internal Server Error'
            response.body.userId = req.body.driverId

            return res.status(500).send(response);
        }

    }

}