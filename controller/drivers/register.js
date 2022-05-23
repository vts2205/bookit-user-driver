const models = require('../../models/init-models').initModels()
var newOTP = require('otp-generators')
var getToken = require('../../middlewares/create_token')


exports.registerDriver = async function (req, res) {
    console.log('driver register')
    console.log(req.body)
    let driver_id = ''

    let response = {
        statusCode: 1,   // 1 success 0 failure
        code: 200,
        message: 'Success',
        body:{}
    }

    try {
        const register = await models.drivers.findOne({
            raw: true,
            where: {
                contact: req.body.contact
            }
        })
        console.log(register)

        if (register !== null) {
           response.message = 'Driver Already Exists'
           response.body={}
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
                await models.drivers.create({
                    driver_id: driver_id,
                    name: req.body.name,
                    owner_name: req.body.ownerName,
                    owner_number: req.body.ownerContact,
                    location: req.body.location,
                    email: req.body.email,
                    contact: req.body.contact,
                   // password: req.body.password,
                   //fcm_token: req.body.fcmToken,
                    password: 'raja',
                    fcm_token: null,
                    driver_status : 'pending',
                    license_number : req.body.licensenumber,
                    expiry_date :  req.body.expirydate,
                    rental_type : '1',
                    referral:newOTP.generate(8, { alphabets: true, upperCase: true, specialChar: true }),

                })
                console.log('++++++++ Enters If Condition ++++++++++')


            } else {
                console.log(driverId.driver_id)
                console.log((driverId.driver_id).split("_"))
                let data = (driverId.driver_id).split("_");
                console.log(data)
                let number = (parseInt(data[1].toString()));
                console.log(number++)
                driver_id = 'driver_' + number++
                console.log(driver_id)

               
                await models.drivers.create({
                    driver_id: driver_id,
                    name: req.body.name,
                    owner_name: req.body.ownerName,
                    owner_number: req.body.ownerContact,
                    location: req.body.location,
                    email: req.body.email,
                    contact: req.body.contact,
                    password: 'raja',
                    fcm_token: req.body.fcmToken,
                    driver_status : 'pending',
                    license_number : req.body.licensenumber,
                    expiry_date :  req.body.expirydate,
                    rental_type : '1',
                    referral:newOTP.generate(8, { alphabets: true, upperCase: true, specialChar: true }),
                })
            }

            let payload = {
                contact : req.body.contact
            }

          response.body.Token = 'Bearer '+getToken.getToken(payload, process.env.ACCESS_KEY)

            response.message = 'Driver Created Successfully'
            response.body.driverId = driver_id
        }
        return res.status(200).send(response);
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