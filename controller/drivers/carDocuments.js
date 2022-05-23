const models = require('../../models/init-models').initModels()
const fs = require('fs')
const moment = require('moment')
const {s3bucketBuffer} = require('../../common/s3bucketBuffer')


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
            order: [['id', 'DESC']]
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
            car_id = number + 1
            console.log('))))))))+++++++')
            console.log(car_id)
            data.car_id = car_id
        }


        fs.writeFileSync(data.front_image, req.files.frontImage.data, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(data.chase_image, req.files.chaseNumber.data, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(data.rc_front, req.files.rcFront.data, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(data.rc_back, req.files.rcBack.data, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(data.insurance, req.files.insurance.data, (err) => {
            if (err) { return console.error(err) }
        })
        console.log(req.files.fc !== undefined)
        if (req.files.fc !== undefined) {
            fs.writeFileSync(data.fc, req.files.fc.data, (err) => {
                if (err) { return console.error(err) }
            })
        } else {
            data.fc = null
        }
        const s3data = {}
        if (typeof req.files.frontImage !== 'undefined') {
            // fs.writeFileSync(data.profile_pic, req.files.profileImage.data, { mode: 0o755 }, (err) => {
            //     if (err) { return console.error(err) }
            // })

            // test
            // fs.chmodSync(selfie, 0o755)
            await s3bucketBuffer(data.front_image, req.body.driverId, '/frontImage', '/cars', time,req.files.frontImage.data).then((url) => {
                console.log(url)
                s3data.front_image = url.Location
                //   if (process.env.LIVE === 'true') {
                //     locationUrl = 'https://d338yng2n0d2es.cloudfront.net/agencyHosting/image/' + req.body.dreamliveID + '_' + timeStamp + '.webp'
                //   }
                fs.unlinkSync(data.front_image, (err) => {
                    if (err) {
                        throw err
                    }
                })
            })
        }


        if (typeof req.files.chaseNumber !== 'undefined') {
            // fs.writeFileSync(data.profile_pic, req.files.profileImage.data, { mode: 0o755 }, (err) => {
            //     if (err) { return console.error(err) }
            // })

            // test
            // fs.chmodSync(selfie, 0o755)
            await s3bucketBuffer(data.chase_image, req.body.driverId, '/chaseNumber', '/cars', time,req.files.chaseNumber.data).then((url) => {
                console.log(url)
                s3data.chase_image = url.Location
                //   if (process.env.LIVE === 'true') {
                //     locationUrl = 'https://d338yng2n0d2es.cloudfront.net/agencyHosting/image/' + req.body.dreamliveID + '_' + timeStamp + '.webp'
                //   }
                fs.unlinkSync(data.chase_image, (err) => {
                    if (err) {
                        throw err
                    }
                })
            })
        }


        
        if (typeof req.files.rcFront !== 'undefined') {
            // fs.writeFileSync(data.profile_pic, req.files.profileImage.data, { mode: 0o755 }, (err) => {
            //     if (err) { return console.error(err) }
            // })

            // test
            // fs.chmodSync(selfie, 0o755)
            await s3bucketBuffer(data.rc_front, req.body.driverId, '/rcFront', '/cars', time, req.files.rcFront.data).then((url) => {
                console.log(url)
                s3data.rc_front = url.Location
                //   if (process.env.LIVE === 'true') {
                //     locationUrl = 'https://d338yng2n0d2es.cloudfront.net/agencyHosting/image/' + req.body.dreamliveID + '_' + timeStamp + '.webp'
                //   }
                fs.unlinkSync(data.rc_front, (err) => {
                    if (err) {
                        throw err
                    }
                })
            })
        }
        if (typeof req.files.rcBack !== 'undefined') {
            // fs.writeFileSync(data.profile_pic, req.files.profileImage.data, { mode: 0o755 }, (err) => {
            //     if (err) { return console.error(err) }
            // })

            // test
            // fs.chmodSync(selfie, 0o755)
            await s3bucketBuffer(data.rc_back, req.body.driverId, '/rcBack', '/cars', time, req.files.rcBack.data).then((url) => {
                console.log(url)
                s3data.rc_back = url.Location
                //   if (process.env.LIVE === 'true') {
                //     locationUrl = 'https://d338yng2n0d2es.cloudfront.net/agencyHosting/image/' + req.body.dreamliveID + '_' + timeStamp + '.webp'
                //   }
                fs.unlinkSync(data.rc_back, (err) => {
                    if (err) {
                        throw err
                    }
                })
            })
        }
        if (typeof req.files.insurance !== 'undefined') {
            // fs.writeFileSync(data.profile_pic, req.files.profileImage.data, { mode: 0o755 }, (err) => {
            //     if (err) { return console.error(err) }
            // })

            // test
            // fs.chmodSync(selfie, 0o755)
            await s3bucketBuffer(data.insurance, req.body.driverId, '/insurance', '/cars', time,req.files.insurance.data).then((url) => {
                console.log(url)
                s3data.insurance = url.Location
                //   if (process.env.LIVE === 'true') {
                //     locationUrl = 'https://d338yng2n0d2es.cloudfront.net/agencyHosting/image/' + req.body.dreamliveID + '_' + timeStamp + '.webp'
                //   }
                fs.unlinkSync(data.insurance, (err) => {
                    if (err) {
                        throw err
                    }
                })
            })
        }
        if (typeof req.files.fc !== 'undefined') {
            // fs.writeFileSync(data.profile_pic, req.files.profileImage.data, { mode: 0o755 }, (err) => {
            //     if (err) { return console.error(err) }
            // })

            // test
            // fs.chmodSync(selfie, 0o755)
            await s3bucketBuffer(data.fc, req.body.driverId, '/fc', '/cars', time, time,req.files.fc.data).then((url) => {
                console.log(url)
                s3data.fc = url.Location
                //   if (process.env.LIVE === 'true') {
                //     locationUrl = 'https://d338yng2n0d2es.cloudfront.net/agencyHosting/image/' + req.body.dreamliveID + '_' + timeStamp + '.webp'
                //   }
                fs.unlinkSync(data.fc, (err) => {
                    if (err) {
                        throw err
                    }
                })
            })
        }





        await models.cars.create(s3data)

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
        response.body = s3data

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