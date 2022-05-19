const models = require('../../models/init-models').initModels()

exports.subAdminCar = async function (req, res) {

    console.log(req)
    let response = {
        statusCode: 1,   // 1 success 0 failure
        code: 200,
        message: 'Success'
    }
    try {

        const carData = await models.cars.findOne({
            raw: true,
            where: {
                driver_id: req.body.driverId
            }
        })

        if (carData !== null) {
            response.body= {
                driverId: req.body.driver_id,
                frontImage: new ArrayBuffer(carData.front_image),
                ChaseImage: new ArrayBuffer(carData.chase_number),
                rcFront: new ArrayBuffer(carData.rc_front),
                rcback: new ArrayBuffer(carData.rc_back),
                insurance: new ArrayBuffer(carData.insurance),
                fc: carData.fc !== null ? new ArrayBuffer(carData.fc): 'N/A'
        }
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