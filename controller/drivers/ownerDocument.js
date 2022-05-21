const models = require('../../models/init-models').initModels()
const fs = require('fs')
const moment = require('moment')


exports.ownerDocuments = async function (req, res) {
    console.log('owner Documents')
    console.log(req.body)
    console.log(req.files)

    let response = {
        statusCode: 1,   // 1 success 0 failure
        code: 200,
        message: 'Success',
        body: {}
    }

    let owner_id = ''
    try {

        var time = moment().valueOf()
        var data = {
            driver_id: req.body.driverId,
            aadhar_front: process.env.ownerAadharFront + req.body.driverId + '_' + time + '.png',
            aadhar_back: process.env.ownerAadharBack + req.body.driverId + '_' + time + '.png',
            pan_card: process.env.ownerPan + req.body.driverId + '_' + time + '.png',
            passbook: process.env.ownerPassbook + req.body.driverId + '_' + time + '.png',
            rental_agreement1: process.env.ownerAgreement1 + req.body.driverId + '_' + time + '.png',
            rental_agreement2: process.env.ownerAgreement2 + req.body.driverId + '_' + time + '.png',
        }


        const Documents = await models.owner.findOne({
            raw: true,
            attributes: ['owner_id'],
            order: [['id', 'DESC']]
        })


        if (Documents === null) {
            owner_id = '1'
            data.owner_id = owner_id
            // models.cars.create(data)
        } else {
            number = parseInt(Documents.owner_id.toString())
            owner_id = number+1
            data.owner_id = owner_id
        }



        fs.writeFileSync(data.aadhar_front, req.files.aadharFront.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(data.aadhar_back, req.files.aadharBack.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(data.pan_card, req.files.panCard.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })

        if (req.files.passbook !== undefined) {
            fs.writeFileSync(data.passbook, req.files.passbook.data, { mode: 0o755 }, (err) => {
                if (err) { return console.error(err) }
            })
        } else {
            data.passbook = null
        }
        if (req.files.rentalAgreement1 !== undefined) {
            fs.writeFileSync(data.rental_agreement1, req.files.rentalAgreement1.data, { mode: 0o755 }, (err) => {
                if (err) { return console.error(err) }
            })
        } else {
            data.rental_agreement1 = null
        }
        if (req.files.rentalAgreement2 !== undefined) {
            fs.writeFileSync(data.rental_agreement2, req.files.rentalAgreement2.data, { mode: 0o755 }, (err) => {
                if (err) { return console.error(err) }
            })
        } else {
            data.rental_agreement2 = null
        }


        await models.owner.create(data)

        const driverIDs = await models.owner.findOne({
            raw: true,
            attributes: ['owner_id'],
            where: {
                driver_id: req.body.driverId
            }
        })

        await models.drivers.update({ owner_id: driverIDs.owner_id }, {
            where: {
                driver_id: req.body.driverId
            }
        })
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