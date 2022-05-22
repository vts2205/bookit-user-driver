const models = require('../../models/init-models').initModels()
var newOTP = require('otp-generators')
var getToken = require('../../middlewares/create_token')
const moment = require('moment')
const fs = require('fs')


exports.subAdminDriver = async function (req, res) {
    console.log(req.body)

    let driver_id = ''
    let document_id = ''
    let owner_id = ''
    let car_id = ''
    let response = {
        statusCode: 1,   // 1 success 0 failure
        code: 200,
        message: 'Success'
    }
    try {
        var time = moment().valueOf()
        const dataJson = {
            name: req.body.name,
            contact: req.body.contact,
            owner_name: req.body.ownerName,
            email:'bookit@gmail.com',
            owner_number: req.body.ownerNumber,
            location: req.body.location,
            license_number: req.body.licenseNumber,
            expiry_date: req.body.expiryDate,
            password: newOTP.generate(8, { alphabets: true, upperCase: true, specialChar: true }),
            fcm_token: req.body.fcmToken,
            driver_status: 'pending',
            rental_type: '1',
            referral: newOTP.generate(8, { alphabets: true, upperCase: true, specialChar: true }),
        }



        // let referral = true

        // const refData = await models.drivers.findAll({
        //     raw: true,
        //     attributes: ['referral']
        // })

        // while (referral) {
        //     let dataRef = refData.indexOf(newOtp.generate(8))
        //     if (dataRef === -1) {
        //         referral = false
        //         dataJson.referral = dataRef
        //     }
        // }

        const register = await models.drivers.findOne({
            raw: true,
            where: {
                contact: req.body.contact
            }
        })
        console.log(register)


        if (register !== null) {
            response.message = 'Driver Already Exists'
            response.body = {}
            return res.status(200).send(response);
        }

        if (register === null) {
            var driverId = await models.drivers.findOne({
                raw: true,
                attributes: ['driver_id'],
                order: [['id', 'DESC']]
            })
            console.log(driverId)
            if (driverId === null) {
                console.log('++++++++ Enters If Condition ++++++++++')
                driver_id = 'driver_1'
                dataJson.driver_id = driver_id
                await models.drivers.create(dataJson)
            } else {
                console.log(driverId.driver_id)
                console.log((driverId.driver_id).split("_"))
                let data = (driverId.driver_id).split("_");
                console.log(data)
                let number = (parseInt(data[1].toString()));
                console.log(number++)
                driver_id = 'driver_' + number++
                console.log(driver_id)

                dataJson.driver_id = driver_id
                await models.drivers.create(dataJson)
            }
        }



        var driverDocuments = {
            driver_id: driver_id,
            profile_pic: process.env.profilePath + driver_id + '_' + time + '.png',
            aadhar_back: process.env.aadharBackPath + driver_id + '_' + time + '.png',
            aadhar_front: process.env.aadharFrontPath + driver_id + '_' + time + '.png',
            license_front: process.env.licenseBack + driver_id + '_' + time + '.png',
            license_back: process.env.licenseFront + driver_id + '_' + time + '.png',
        }

        var responseDriverDocuments = {
            profile_pic: req.files.profileImage.data,
            aadhar_back: req.files.aadharBack.data,
            aadhar_front: req.files.aadharFront.data,
            license_front: req.files.licenseFront.data,
            license_back: req.files.licenseBack.data,
        }


        const Documents = await models.documents.findOne({
            raw: true,
            attributes: ['document_id'],
            order: [['id', 'DESC']]
        })


        if (Documents === null) {
            document_id = '1'
            driverDocuments.document_id = document_id
            // models.cars.create(data)
        } else {
            number = parseInt(Documents.document_id.toString())
            document_id = number + 1
            driverDocuments.document_id = document_id
        }




        fs.writeFileSync(driverDocuments.profile_pic, req.files.profileImage.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(driverDocuments.aadhar_back, req.files.aadharBack.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(driverDocuments.aadhar_front, req.files.aadharFront.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(driverDocuments.license_front, req.files.licenseFront.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(driverDocuments.license_back, req.files.licenseBack.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })


        await models.documents.create(driverDocuments)



        var ownerData = {
            driver_id: driver_id,
            aadhar_front: process.env.ownerAadharFront + driver_id + '_' + time + '.png',
            aadhar_back: process.env.ownerAadharBack + driver_id + '_' + time + '.png',
            pan_card: process.env.ownerPan + driver_id + '_' + time + '.png',
            passbook: process.env.ownerPassbook + driver_id + '_' + time + '.png',
            rental_agreement1: process.env.ownerAgreement1 + driver_id + '_' + time + '.png',
            rental_agreement2: process.env.ownerAgreement2 + driver_id + '_' + time + '.png',
        }

        let responseOwnerData = {
            aadhar_front: req.files.aadharFront.data,
            aadhar_back: req.files.aadharBack.data,
            pan_card: req.files.panCard.data,
            passbook: req.files.passbook.data,
            rental_agreement1: req.files.rentalAgreement1.data,
            rental_agreement2: req.files.rentalAgreement2.data,
        }


        const ownerDocuments = await models.owner.findOne({
            raw: true,
            attributes: ['owner_id'],
            order: [['id', 'DESC']]
        })


        if (ownerDocuments === null) {
            owner_id = '1'
            ownerData.owner_id = owner_id
            // models.cars.create(data)
        } else {
            number = parseInt(ownerDocuments.owner_id.toString())
            owner_id = number + 1
            ownerData.owner_id = owner_id
        }



        fs.writeFileSync(ownerData.aadhar_front, req.files.owneraadharFront.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(ownerData.aadhar_back, req.files.owneraadharBack.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(ownerData.pan_card, req.files.panCard.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })

        if (req.files.passbook !== undefined) {
            fs.writeFileSync(ownerData.passbook, req.files.passbook.data, { mode: 0o755 }, (err) => {
                if (err) { return console.error(err) }
            })
        } else {
            data.passbook = null
        }
        if (req.files.rentalAgreement1 !== undefined) {
            fs.writeFileSync(ownerData.rental_agreement1, req.files.rentalAgreement1.data, { mode: 0o755 }, (err) => {
                if (err) { return console.error(err) }
            })
        } else {
            data.rental_agreement1 = null
        }
        if (req.files.rentalAgreement2 !== undefined) {
            fs.writeFileSync(ownerData.rental_agreement2, req.files.rentalAgreement2.data, { mode: 0o755 }, (err) => {
                if (err) { return console.error(err) }
            })
        } else {
            data.rental_agreement2 = null
        }


        await models.owner.create(ownerData)



        var carData = {
            driver_id: driver_id,
            front_image: process.env.frontPath + driver_id + '_' + time + '.png',
            chase_image: process.env.chasePath + driver_id + '_' + time + '.png',
            rc_front: process.env.rcFrontPath + driver_id + '_' + time + '.png',
            rc_back: process.env.rcBackPath + driver_id + '_' + time + '.png',
            insurance: process.env.insurancePath + driver_id + '_' + time + '.png',
            fc: process.env.fcPath + driver_id + '_' + time + '.png',
        }

        var responseCarData = {
            front_image: req.files.frontImage.data,
            chase_image: req.files.chaseNumber.data,
            rc_front: req.files.rcFront.data,
            rc_back: req.files.rcBack.data,
            insurance: req.files.insurance.data,
            fc: req.files.fc.data,
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
            carData.car_id = car_id
            // models.cars.create(data)
        } else {
            let number = parseInt(carDocument.car_id.toString())
            console.log('))))))))')
            console.log(number)
            car_id = number + 1
            console.log('))))))))+++++++')
            console.log(car_id)
            carData.car_id = car_id
        }


        fs.writeFileSync(carData.front_image, req.files.frontImage.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(carData.chase_image, req.files.chaseNumber.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(carData.rc_front, req.files.rcFront.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(carData.rc_back, req.files.rcBack.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        fs.writeFileSync(carData.insurance, req.files.insurance.data, { mode: 0o755 }, (err) => {
            if (err) { return console.error(err) }
        })
        console.log(req.files.fc !== undefined)
        if (req.files.fc !== undefined) {
            fs.writeFileSync(carData.fc, req.files.fc.data, { mode: 0o755 }, (err) => {
                if (err) { return console.error(err) }
            })
        } else {
            carData.fc = null
        }

        await models.cars.create(carData)

        const keys = {
            // driver_id : driver_id,
            document_id: document_id,
            owner_id: owner_id,
            current_car_id: car_id
        }

        await models.drivers.update(keys, {
            where: {
                driver_id: driver_id
            }
        })


        let payload = { contact: req.body.contact }

        response.body = {
            name: req.body.name,
            contact: req.body.contact,
            carDocuments: responseCarData,
            driverDocuments: responseDriverDocuments,
            ownerDocuments: responseOwnerData,
            ownerId: owner_id,
            carId: car_id,
            driver_id: driver_id,
            documentId: document_id,
            Token: 'Bearer ' + getToken.getToken(payload, process.env.ACCESS_KEY)
        }

        console.log(response)
        return res.status(200).send(response)
    } catch (err) {
        if (err) {
            console.log(err)
            response.statusCode = 0
            response.code = 500
            response.message = 'Internal Server Error'
            response.body = {

            }
        }
        return res.status(response.code).send(response)
    }
}