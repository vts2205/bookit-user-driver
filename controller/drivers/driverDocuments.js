const models = require('../../models/init-models').initModels()
const fs = require('fs')
const moment = require('moment')
const { s3bucketBuffer } = require('../../common/s3bucketBuffer1')

exports.driverDocuments = async function(req, res) {
    console.log('Driver Documents')
    console.log(req.body)
    console.log(req.files)

    let response = {
        statusCode: 1, // 1 success 0 failure
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
            order: [
                ['id', 'DESC']
            ]
        })


        if (Documents === null) {
            document_id = '1'
            data.document_id = document_id
                // models.cars.create(data)
        } else {
            number = parseInt(Documents.document_id.toString())
            document_id = number + 1
            data.document_id = document_id
        }




        fs.writeFileSync(data.profile_pic, req.files.profileImage.data, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(data.aadhar_back, req.files.aadharBack.data, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(data.aadhar_front, req.files.aadharFront.data, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(data.license_front, req.files.licenseFront.data, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(data.license_back, req.files.licenseBack.data, (err) => {
            if (err) { return console.error(err) }
        })

        const s3data = {}

        if (typeof req.files.profileImage !== 'undefined') {
            // fs.writeFileSync(data.profile_pic, req.files.profileImage.data, { mode: 0o755 }, (err) => {
            //     if (err) { return console.error(err) }
            // })

            // test
            // fs.chmodSync(selfie, 0o755)
            await s3bucketBuffer(data.profile_pic, req.body.driverId, '/profilePic', '/drivers', time, req.files.profileImage.data).then((url) => {
                console.log(url)
                s3data.profile_pic = url.Location
                    //   if (process.env.LIVE === 'true') {
                    //     locationUrl = 'https://d338yng2n0d2es.cloudfront.net/agencyHosting/image/' + req.body.dreamliveID + '_' + timeStamp + '.webp'
                    //   }
                fs.unlinkSync(data.profile_pic, (err) => {
                    if (err) {
                        throw err
                    }
                })
            })
        }
        if (typeof req.files.aadharBack !== 'undefined') {
            // fs.writeFileSync(data.aadhar_back, req.files.aadharBack.data, { mode: 0o755 }, (err) => {
            //     if (err) { return console.error(err) }
            // })

            // test
            // fs.chmodSync(selfie, 0o755)
            await s3bucketBuffer(data.aadhar_back, req.body.driverId, '/aadharBack', '/drivers', time, req.files.aadharBack.data).then((url) => {
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
        if (typeof req.files.aadharFront !== 'undefined') {
            // fs.writeFileSync(data.profile_pic, req.files.profileImage.data, { mode: 0o755 }, (err) => {
            //     if (err) { return console.error(err) }
            // })

            // test
            // fs.chmodSync(selfie, 0o755)
            await s3bucketBuffer(data.aadhar_front, req.body.driverId, '/aadharFront', '/drivers', time, req.files.aadharFront.data).then((url) => {
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
        if (typeof req.files.licenseFront !== 'undefined') {
            // fs.writeFileSync(data.profile_pic, req.files.profileImage.data, { mode: 0o755 }, (err) => {
            //     if (err) { return console.error(err) }
            // })

            // test
            // fs.chmodSync(selfie, 0o755)
            await s3bucketBuffer(data.license_front, req.body.driverId, '/licenseFront', '/drivers', time, req.files.licenseFront.data).then((url) => {
                console.log(url)
                s3data.license_front = url.Location
                    //   if (process.env.LIVE === 'true') {
                    //     locationUrl = 'https://d338yng2n0d2es.cloudfront.net/agencyHosting/image/' + req.body.dreamliveID + '_' + timeStamp + '.webp'
                    //   }
                fs.unlinkSync(data.license_front, (err) => {
                    if (err) {
                        throw err
                    }
                })
            })
        }
        if (typeof req.files.licenseBack !== 'undefined') {
            // fs.writeFileSync(data.profile_pic, req.files.profileImage.data, { mode: 0o755 }, (err) => {
            //     if (err) { return console.error(err) }
            // })

            // test
            // fs.chmodSync(selfie, 0o755)
            await s3bucketBuffer(data.license_back, req.body.driverId, '/licenseBack', '/drivers', time, req.files.licenseBack.data).then((url) => {
                console.log(url)
                s3data.license_back = url.Location
                    //   if (process.env.LIVE === 'true') {
                    //     locationUrl = 'https://d338yng2n0d2es.cloudfront.net/agencyHosting/image/' + req.body.dreamliveID + '_' + timeStamp + '.webp'
                    //   }
                fs.unlinkSync(data.license_back, (err) => {
                    if (err) {
                        throw err
                    }
                })
            })
        }



        await models.documents.create(s3data)

        const driverIDs = await models.documents.findOne({
            raw: true,
            attributes: ['document_id'],
            where: {
                driver_id: req.body.driverId
            }
        })

        await models.drivers.update({ document_id: driverIDs.document_id }, {
            where: {
                driver_id: req.body.driverId
            }
        })
        console.log('++++++++++++++++++++')
        console.log(driverIDs)


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