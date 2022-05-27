const models = require('../../models/init-models').initModels()

exports.rejectedList = async function(req, res) {

    console.log(req)
    let response = {
        statusCode: 1, // 1 success 0 failure
        code: 200,
        message: 'Success'
    }
    try {
        const rejectedDrivers =
            await models.drivers.findAll({
                raw: true,
                nest: true,
                where: {
                    driver_status: 'rejected'
                },
                attributes: ['name', 'driver_id', 'contact', 'owner_name', 'owner_number', 'location', 'license_number', 'expiry_date', 'referral'],
                // include: [{
                //     model: models.documents,
                //     as: 'document_document',
                //     attributes: ['profile_pic', 'aadhar_front', 'aadhar_back', 'license_front', 'license_back']
                // }, {
                //     model: models.cars,
                //     as: 'current_car',
                //     attributes: ['front_image', 'chase_image', 'rc_front', 'rc_back', 'insurance', 'fc']
                // }, {
                //     model: models.owner,
                //     as: 'driver_owners',
                //     attributes: ['aadhar_front', 'aadhar_back', 'pan_card', 'passbook', 'rental_agreement1', 'rental_agreement2']
                // }]
            })
        response.body.approvedDrivers = approvedDrivers

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