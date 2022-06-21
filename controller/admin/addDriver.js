const models = require('../../models/init-models').initModels()
const fs = require('fs')
const moment = require('moment')



exports.addDriver = async function(req, res) {

    console.log(req.body)

    let response = {
        statusCode: 1, // 1 success 0 failure
        code: 200,
        message: 'Success'
    }

    try {

        const driverData = await models.drivers.findAll({
            raw: true,
            nest: true,
            where: {
                driver_status: 'pending'
            },
            order: [
                ['id', 'DESC']
            ],
            attributes: ['created_at'],
            attributes: [
                "id",
                "driver_id",
                "name",
                "contact",
                "password",
                "gender",
                "dob",
                "current_car_id",
                "document_id",
                "owner_id",
                "owner_name",
                "owner_number",
                "location",
                "license_number",
                "expiry_date",
                "rental_type",
                "ratings",
                "fcm_token",
                "referral",
                "driver_status",
                "reason",
                "created_by",
                "created_at",
                "updated_at"
              ],
            include: [{
                model: models.documents,
                as: 'document_document',
                attributes: ['profile_pic', 'aadhar_front', 'aadhar_back', 'license_front', 'license_back']
            }, {
                model: models.cars,
                as: 'current_car',
                attributes: ['front_image', 'chase_image', 'rc_front', 'rc_back', 'insurance', 'fc']
            }, {
                model: models.owner,
                as: 'driver_owners',
                attributes: ['aadhar_front', 'aadhar_back', 'pan_card', 'passbook', 'rental_agreement1', 'rental_agreement2']
            }]
        })

        // response.body = driverData


        // let finalData = []

        // if (driverData.length > 0) {
        //     for (const element of driverData) {
        //         console.log('///////////')
        //         const tempJson = {
        //             driverId: element.driver_id,
        //             driverContact: element.contact,
        //             ownerName: element.owner_name,
        //             ownerPhoneNumber: element.owner_number,
        //             location: element.location,
        //             licenseNumber: element.license_number,
        //             expiryDate: element.expiry_date,
        //             // dprofilePic: '',
        //             // daadharFront: '',
        //             // daadharBack: '',
        //             // dlicenseFront: '',
        //             // dlicenseBack: '',
        //             // cfrontImage: '',
        //             // cchaseNumber: '',
        //             // crcFront: '',
        //             // crcBack: '',
        //             // cInsurance: '',
        //             // cfc: '',
        //             // oaadharFront: '',
        //             // oaadharBack: '',
        //             // orentalAgreement2: '',
        //             // orentalAgreement1: '',
        //             // opanCard: '', oPassbook: ''

        //         }



        //         if (element.document_document.profile_pic !== null) {
        //             fs.readFile(element.document_document.profile_pic, (err, data) => {
        //                 if (err) throw err;
        //                 console.log(data);
        //                 tempJson.dprofilePic = data
        //             })
        //         }

        //     console.log(tempJson)

        //         if (element.document_document.aadhar_front !== null) {
        //             fs.readFile(element.document_document.aadhar_front, (err, data) => {
        //                 if (err) throw err;
        //                 console.log(data);
        //                 tempJson.daadharFront = Buffer.from(data).toString('base64')
        //             })
        //         }

        //         if (element.document_document.aadhar_back !== null) {
        //             fs.readFile(element.document_document.aadhar_back, (err, data) => {
        //                 if (err) throw err;
        //                 console.log(data);
        //                 tempJson.daadharBack = Buffer.from(data).toString('base64')
        //             })
        //         }

        //         if (element.document_document.license_front !== null) {
        //             fs.readFile(element.document_document.license_front, (err, data) => {
        //                 if (err) throw err;
        //                 console.log(data);
        //                 tempJson.dlicenseFront = Buffer.from(data).toString('base64')
        //             })
        //         }

        //         if (element.document_document.license_back !== null) {
        //             fs.readFile(element.document_document.license_back, (err, data) => {
        //                 if (err) throw err;
        //                 console.log(data);
        //                 tempJson.dlicenseBack = Buffer.from(data).toString('base64')
        //             })
        //         }

        //         if (element.current_car.chase_image !== null) {
        //             fs.readFile(element.current_car.chase_image, (err, data) => {
        //                 if (err) throw err;
        //                 console.log(data);
        //                 tempJson.cchaseNumber = Buffer.from(data).toString('base64')
        //             })
        //         }

        //         if (element.current_car.rc_front !== null) {
        //             fs.readFile(element.current_car.rc_front, (err, data) => {
        //                 if (err) throw err;
        //                 console.log(data);
        //                 tempJson.crcFront = Buffer.from(data).toString('base64')
        //             })
        //         }

        //         if (element.current_car.rc_back !== null) {
        //             fs.readFile(element.current_car.rc_back, (err, data) => {
        //                 if (err) throw err;
        //                 console.log(data);
        //                 tempJson.crcBack = Buffer.from(data).toString('base64')
        //             })
        //         }

        //         if (element.current_car.insurance !== null) {
        //             fs.readFile(element.current_car.insurance, (err, data) => {
        //                 if (err) throw err;
        //                 console.log(data);
        //                 tempJson.cInsurance = Buffer.from(data).toString('base64')
        //             })
        //         }

        //         if (element.current_car.fc !== null) {
        //             fs.readFile(element.current_car.fc, (err, data) => {
        //                 if (err) throw err;
        //                 console.log(data);
        //                 tempJson.cfc = Buffer.from(data).toString('base64')
        //             })
        //         }
        //         if (element.current_car.front_image !== null) {
        //             fs.readFile(element.current_car.front_image, (err, data) => {
        //                 if (err) throw err;
        //                 console.log(data);
        //                 tempJson.cfrontImage = Buffer.from(data).toString('base64')
        //             })
        //         }

        //         if (element.driver_owners.aadhar_front !== null) {
        //             fs.readFile(element.driver_owners.aadhar_front, (err, data) => {
        //                 if (err) throw err;
        //                 console.log(data);
        //                 tempJson.oaadharFront = Buffer.from(data).toString('base64')
        //             })
        //         }
        //         if (element.driver_owners.aadhar_back !== null) {
        //             fs.readFile(element.driver_owners.aadhar_back, (err, data) => {
        //                 if (err) throw err;
        //                 console.log(data);
        //                 tempJson.oaadharBack = Buffer.from(data).toString('base64')
        //             })
        //         }
        //         if (element.driver_owners.pan_card !== null) {
        //             fs.readFile(element.driver_owners.pan_card, (err, data) => {
        //                 if (err) throw err;
        //                 console.log(data);
        //                 tempJson.opanCard = Buffer.from(data).toString('base64')
        //             })
        //         }
        //         if (element.driver_owners.passbook !== null) {
        //             fs.readFile(element.driver_owners.passbook, (err, data) => {
        //                 if (err) throw err;
        //                 console.log(data);
        //                 tempJson.oPassbook = Buffer.from(data).toString('base64')
        //             })
        //         }
        //         if (element.driver_owners.rental_agreement1 !== null) {
        //             fs.readFile(element.driver_owners.rental_agreement1, (err, data) => {
        //                 if (err) throw err;
        //                 console.log(data);
        //                 tempJson.orentalAgreement1 = Buffer.from(data).toString('base64')
        //             })
        //         }
        //         if (element.driver_owners.rental_agreement2 !== null) {
        //             fs.readFile(element.driver_owners.rental_agreement2, (err, data) => {
        //                 if (err) throw err;
        //                 console.log(data);
        //                 tempJson.orentalAgreement2 = Buffer.from(data).toString('base64')
        //             })
        //         }

        //         finalData.push(tempJson)



        //     }
        // }

        const addDriver = []


        for (const element of driverData) {
            element.createdAt_local = moment(element.created_at).local().format('DD-MM-YYYY h:mm:ss a')
        }

        response.body = driverData

        return res.status(200).send(response)

    } catch (err) {

        if (err) {
            console.log(err)
            response.statusCode = 0
            response.code = 500
            response.message = 'Internal Server Error'
            response.body = {}
        }
        return res.status(response.code).send(response)
    }



}