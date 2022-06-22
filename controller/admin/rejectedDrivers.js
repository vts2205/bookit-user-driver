const models = require('../../models/init-models').initModels()
const moment = require('moment')


exports.rejectedList = async function(req, res) {

    // console.log(req)
    let response = {
        statusCode: 1, // 1 success 0 failure
        code: 200,
        message: 'Success',
        body: {}
    }
    try {
        const rejectedDrivers = await models.drivers.findAll({
            raw: true,
            where: {
                driver_status: 'rejected'
            },
            attributes: ['name', 'driver_id', 'contact', 'owner_name', 'owner_number', 'location', 'license_number', 'expiry_date', 'referral','reason','created_by', 'created_at', 'updated_at'],
            order: [
                ['updated_at', 'DESC']
            ]
        })
        console.log(rejectedDrivers)
        for (const element of rejectedDrivers) {
            element.createdAt_local = moment(element.created_at).utcOffset("+05:30").format('DD-MM-YYYY h:mm:ss a')
            element.updatedAt_local = moment(element.updated_at).utcOffset("+05:30").format('DD-MM-YYYY h:mm:ss a')

        }
        response.body.approvedDrivers = rejectedDrivers

        return res.status(response.code).send(response);
        // }

    } catch (err) {
        if (err) {
            console.log(err)
            response.statusCode = 0
            response.code = 500
            response.message = 'Internal Server Error'
                // response.body.userId = req.body.driverId

            return res.status(500).send(response);
        }
    }
}