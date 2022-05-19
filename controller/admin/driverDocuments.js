const models = require('../../models/init-models').initModels()

exports.subAdminDriver = async function (req, res) {

    console.log(req)
    let response = {
        statusCode: 1,   // 1 success 0 failure
        code: 200,
        message: 'Success'
    }
    try {

        const driverDocuments = await models.documents.findOne({
            raw: true,
            where: {
                driver_id: req.body.driverId
            }
        })

        if (driverDocuments !== null) {
            response.body= {
                driverId: req.body.driverId,
                profilePic: new ArrayBuffer(driverDocuments.profile_pic),
                aadharFront: new ArrayBuffer(driverDocuments.aadhar_front),
                aadharBack: new ArrayBuffer(driverDocuments.aadhar_back),
                licenseFront: new ArrayBuffer(driverDocuments.license_front),
                licenseBack: new ArrayBuffer(driverDocuments.license_back),
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