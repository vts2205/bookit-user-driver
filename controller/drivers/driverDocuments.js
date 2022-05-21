const models = require('../../models/init-models').initModels()
const fs = require('fs')
const moment = require('moment')

exports.driverDocuments = async function (req, res) {
    console.log('Driver Documents')
    console.log(req.body)
    console.log(req.files)

    let response = {
        statusCode: 1,   // 1 success 0 failure
        code: 200,
        message: 'Success',
        body: {}
    }

    let document_id = ''
    try {

        var time = moment().valueOf()
        var data = {
            driver_id: req.body.driverId,
            profile_pic: process.env.profilePath + req.body.driverId + '_' + time + '.png',
            aadhar_back: process.env.aadharBackPath + req.body.driverId + '_' + time + '.png',
            aadhar_front: process.env.aadharFrontPath + req.body.driverId + '_' + time + '.png',
            license_front: process.env.licenseBack + req.body.driverId + '_' + time + '.png',
            license_back: process.env.licenseFront + req.body.driverId + '_' + time + '.png',
        }


        const Documents = await models.documents.findOne({
            raw: true,
            attributes: ['document_id'],
            order: [['id', 'DESC']]
        })


        if (Documents === null) {
            document_id = '1'
            data.document_id = document_id
            // models.cars.create(data)
        } else {
            number = parseInt(Documents.document_id.toString())
            document_id = number+1
            data.document_id = document_id
        }




        fs.writeFileSync(data.profile_pic, req.files.profileImage.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(data.aadhar_back, req.files.aadharBack.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(data.aadhar_front, req.files.aadharFront.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(data.license_front, req.files.licenseFront.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(data.license_back, req.files.licenseBack.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })


        await models.documents.create(data)

        const driverIDs = await models.documents.findOne({
            raw: true,
            attributes: ['document_id'],
            where:{
                driver_id : req.body.driverId
            }
        })

        await models.drivers.update({document_id: driverIDs.document_id},{
            where:{
                driver_id: req.body.driverId
            }
        })
        console.log('++++++++++++++++++++')
        console.log(driverIDs)
        
     
        response.body = data

        // let frontImage = 
        return res.status(200).send(response)

    } catch (err) {
        console.log(err)
        if (err) {
            response.statusCode = 0
            response.code = 500
            response.message = 'Internal Server Error'
        }
        return res.status(500).send(response);
    }
}