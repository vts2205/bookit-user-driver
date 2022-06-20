const models = require('../../models/init-models').initModels()
const moment = require('moment')

exports.approvedList = async function(req, res) {

    console.log(req)
    let response = {
        statusCode: 1, // 1 success 0 failure
        code: 200,
        message: 'Success',
        body: {}
    }
    try {
        const approvedDrivers = await models.drivers.findAll({
            raw: true,
            where: {
                driver_status: 'confirmed'
            },
            attributes: ['name', 'driver_id', 'created_at', 'updated_at', 'contact', 'owner_name', 'owner_number', 'location', 'license_number', 'expiry_date', 'referral'],
            order: [
                ['updated_at', 'DESC']
            ]
        })
        for (const element of approvedDrivers) {
            element.createdAt_local = moment(element.created_at).local().format('DD-MM-YYYY h:mm:ss a')
            element.updatedAt_local = moment(element.updated_at).local().format('DD-MM-YYYY h:mm:ss a')

        }
        response.body.approvedDrivers = approvedDrivers

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