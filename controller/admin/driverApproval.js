const models = require('../../models/init-models').initModels()


exports.driverApproval = async function (req, res) {


    console.log(req.body)
    let response = {
        statusCode: 1,   // 1 success 0 failure
        code: 200,
        message: 'Success',
        body: {}
    }

    try {
        let approval = await models.drivers.update({ driver_status: req.body.status }, {
            where: {
                driver_id: req.body.driverId
            }
        })
        response.message = req.body.status + 'Successfully'
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