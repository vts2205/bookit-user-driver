const models = require('../../models/init-models').initModels()
const fs = require('fs')
const moment = require('moment')
const {s3bucketBuffer} = require('../../common/s3bucketBuffer')



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
            owner_id = number + 1
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


        const s3data = {}
        if (typeof req.files.aadharFront !== 'undefined') {
            // fs.writeFileSync(data.profile_pic, req.files.profileImage.data, { mode: 0o755 }, (err) => {
            //     if (err) { return console.error(err) }
            // })

            // test
            // fs.chmodSync(selfie, 0o755)
            await s3bucketBuffer(data.aadhar_front, req.body.driverId, '/aadharFront', '/owner', time).then((url) => {
                console.log(url)
                s3data.aadhar_front = url.Location
                //   if (process.env.LIVE === 'true') {
                //     locationUrl = 'https://d338yng2n0d2es.cloudfront.net/agencyHosting/image/' + req.body.dreamliveID + '_' + timeStamp + '.webp'
                //   }
                fs.unlinkSync(data.aadhar_front, (err) => {
                    if (err) {
                        throw err
                    }
                })
            })
        }

        if (typeof req.files.aadharBack !== 'undefined') {
            // fs.writeFileSync(data.profile_pic, req.files.profileImage.data, { mode: 0o755 }, (err) => {
            //     if (err) { return console.error(err) }
            // })

            // test
            // fs.chmodSync(selfie, 0o755)
            await s3bucketBuffer(data.aadhar_back, req.body.driverId, '/aadharBack', '/owner', time).then((url) => {
                console.log(url)
                s3data.aadhar_back = url.Location
                //   if (process.env.LIVE === 'true') {
                //     locationUrl = 'https://d338yng2n0d2es.cloudfront.net/agencyHosting/image/' + req.body.dreamliveID + '_' + timeStamp + '.webp'
                //   }
                fs.unlinkSync(data.aadhar_back, (err) => {
                    if (err) {
                        throw err
                    }
                })
            })
        }

        if (typeof req.files.panCard !== 'undefined') {
            // fs.writeFileSync(data.profile_pic, req.files.profileImage.data, { mode: 0o755 }, (err) => {
            //     if (err) { return console.error(err) }
            // })

            // test
            // fs.chmodSync(selfie, 0o755)
            await s3bucketBuffer(data.pan_card, req.body.driverId, '/panCard', '/owner', time).then((url) => {
                console.log(url)
                s3data.pan_card = url.Location
                //   if (process.env.LIVE === 'true') {
                //     locationUrl = 'https://d338yng2n0d2es.cloudfront.net/agencyHosting/image/' + req.body.dreamliveID + '_' + timeStamp + '.webp'
                //   }
                fs.unlinkSync(data.pan_card, (err) => {
                    if (err) {
                        throw err
                    }
                })
            })
        }

        if (typeof req.files.passbook !== 'undefined') {
            // fs.writeFileSync(data.profile_pic, req.files.profileImage.data, { mode: 0o755 }, (err) => {
            //     if (err) { return console.error(err) }
            // })

            // test
            // fs.chmodSync(selfie, 0o755)
            await s3bucketBuffer(data.passbook, req.body.driverId, '/passbook', '/owner', time).then((url) => {
                console.log(url)
                s3data.passbook = url.Location
                //   if (process.env.LIVE === 'true') {
                //     locationUrl = 'https://d338yng2n0d2es.cloudfront.net/agencyHosting/image/' + req.body.dreamliveID + '_' + timeStamp + '.webp'
                //   }
                fs.unlinkSync(data.passbook, (err) => {
                    if (err) {
                        throw err
                    }
                })
            })
        }
        if (typeof req.files.rentalAgreement1 !== 'undefined') {
            // fs.writeFileSync(data.profile_pic, req.files.profileImage.data, { mode: 0o755 }, (err) => {
            //     if (err) { return console.error(err) }
            // })

            // test
            // fs.chmodSync(selfie, 0o755)
            await s3bucketBuffer(data.rental_agreement1, req.body.driverId, '/rentalAgreement1', '/owner', time).then((url) => {
                console.log(url)
                s3data.rental_agreement1 = url.Location
                //   if (process.env.LIVE === 'true') {
                //     locationUrl = 'https://d338yng2n0d2es.cloudfront.net/agencyHosting/image/' + req.body.dreamliveID + '_' + timeStamp + '.webp'
                //   }
                fs.unlinkSync(data.rental_agreement1, (err) => {
                    if (err) {
                        throw err
                    }
                })
            })
        }
        if (typeof req.files.rentalAgreement2 !== 'undefined') {
            // fs.writeFileSync(data.profile_pic, req.files.profileImage.data, { mode: 0o755 }, (err) => {
            //     if (err) { return console.error(err) }
            // })

            // test
            // fs.chmodSync(selfie, 0o755)
            await s3bucketBuffer(data.rental_agreement2, req.body.driverId, '/rentalAgreement2', '/owner', time).then((url) => {
                console.log(url)
                s3data.rental_agreement2 = url.Location
                //   if (process.env.LIVE === 'true') {
                //     locationUrl = 'https://d338yng2n0d2es.cloudfront.net/agencyHosting/image/' + req.body.dreamliveID + '_' + timeStamp + '.webp'
                //   }
                fs.unlinkSync(data.rental_agreement2, (err) => {
                    if (err) {
                        throw err
                    }
                })
            })
        }



        await models.owner.create(s3data)

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