const models = require('../../models/init-models').initModels()
const fs = require('fs')
const moment = require('moment')

exports.carDocuments = async function (req, res) {
    console.log('Car Documents')
    console.log(req.body)
    console.log(req.files)

    let response = {
        statusCode: 1,   // 1 success 0 failure
        code: 200,
        message: 'Success',
        body: {}
    }

    let car_id = ''
    try {

        var time = moment().valueOf()
        var data = {
            driver_id: req.body.driverId,
            front_image: process.env.frontPath + req.body.driverId + '_' + time + '.png',
            chase_image: process.env.chasePath + req.body.driverId + '_' + time + '.png',
            rc_front: process.env.rcFrontPath + req.body.driverId + '_' + time + '.png',
            rc_back: process.env.rcBackPath + req.body.driverId + '_' + time + '.png',
            insurance: process.env.insurancePath + req.body.driverId + '_' + time + '.png',
            fc: process.env.fcPath + req.body.driverId + '_' + time + '.png',
        }


        const carDocument = await models.cars.findOne({
            raw: true,
            attributes: ['car_id'],
            order: [['car_id', 'DESC']]
        })
        console.log('++++++++++++')
        console.log(carDocument)


        if (carDocument === null) {
            car_id = '1'
            data.car_id = car_id
            // models.cars.create(data)
        } else {
            let number = parseInt(carDocument.car_id.toString())
            console.log('))))))))')
            console.log(number)
            car_id = number+1
            console.log('))))))))+++++++')
            console.log(car_id)
            data.car_id = car_id
        }


        fs.writeFileSync(data.front_image, req.files.frontImage.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(data.chase_image, req.files.chaseNumber.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(data.rc_front, req.files.rcFront.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(data.rc_back, req.files.rcBack.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(data.insurance, req.files.insurance.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        console.log(req.files.fc !== undefined)
        if (req.files.fc !== undefined) {
            fs.writeFileSync(data.fc, req.files.fc.data, { mode: 0o755 }, (err) => {
                if (err) { return console.error(err) }
            })
        } else {
            data.fc = null
        }

        await models.cars.create(data)

        const driverIDs = await models.cars.findOne({
            raw: true,
            attributes: ['car_id'],
            where: {
                driver_id: req.body.driverId
            }
        })

        await models.drivers.update({ current_car_id: driverIDs.car_id }, {
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