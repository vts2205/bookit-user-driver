const models = require('../../models/init-models').initModels()

exports.subAdminOwner = async function (req, res) {

    console.log(req)
    let response = {
        statusCode: 1,   // 1 success 0 failure
        code: 200,
        message: 'Success'
    }
    try {

        const ownerData = await models.owner.findOne({
            raw: true,
            where: {
                driver_id: req.body.driverId
            }
        })

        if (ownerData !== null) {
            response.body= {
                driverId: req.body.driver_id,
                aadharFront: new ArrayBuffer(ownerData.aadhar_front),
                aadharback: new ArrayBuffer(ownerData.aadhar_back),
                panCard: new ArrayBuffer(ownerData.pan_card),
                passbook: new ArrayBuffer(ownerData.passbook),
                rentalAgreement1: new ArrayBuffer(ownerData.rental_agreement1),
                rentalAgreement2: new ArrayBuffer(ownerData.rental_agreement2),
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