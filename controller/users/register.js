const models = require('../../models/init-models').initModels()
const { response } = require('express')
const moment = require('moment')
var newOTP = require('otp-generators')


exports.registerUser = async function (req, res) {

    console.log('User Register')
    console.log(req.body)
    let response = {
        statusCode: 1,   // 1 success 0 failure
        code: 200,
        message: 'Success',
        body: {}
    }

    try {
        const usersData = await models.users.findOne({
            raw: true,
            where: {
                contact: req.body.contact
            }
        })
        console.log(usersData)


        // let newUserData = {
        //     user_id:user_id,
        //     name: req.body.name,
        //     email: req.body.email,
        //     contact: req.body.contact,
        //     password: req.body.password,
        //     fcm_token: req.body.fcm_token,
        //     start_otp : newOTP.generate(4, { alphabets: false, upperCase: false, specialChar: false }),
        //     end_otp : newOTP.generate(4, { alphabets: false, upperCase: false, specialChar: false })
        // }
       
            if(usersData !== null) {
               response.message = 'User Already Exists'
               return res.status(200).send(response);
            }
            if(usersData === null) {
                var userId = await models.users.findOne({
                    raw: true,
                    attributes: ['user_id'],
                    order: [['id', 'DESC']]
                })
                console.log('++++++++++++++++')
                console.log(userId)
                if (userId === null) {
                    user_id = '10001'
                    await models.users.create({
                        user_id:user_id,
                        name: req.body.name,
                        email: req.body.email,
                        contact: req.body.contact,
                        password: req.body.password,
                        fcm_token: req.body.fcm_token,
                        start_otp : newOTP.generate(4, { alphabets: false, upperCase: false, specialChar: false }),
                        end_otp : newOTP.generate(4, { alphabets: false, upperCase: false, specialChar: false }),
                        referral:newOTP.generate(8, { alphabets: true, upperCase: true, specialChar: true })
                    })
                    response.message = 'User Created Successfully'
                    response.body.userId = user_id
                } else {             
                    
                   
                    let number = (parseInt(userId.user_id.toString()));
                    console.log(number++)
                    user_id =  (number++).toString()
                    console.log(user_id)
                    await models.users.create({
                        user_id:user_id,
                        name: req.body.name,
                        email: req.body.email,
                        contact: req.body.contact,
                        password: req.body.password,
                        fcm_token: req.body.fcm_token,
                        start_otp : newOTP.generate(4, { alphabets: false, upperCase: false, specialChar: false }),
                        end_otp : newOTP.generate(4, { alphabets: false, upperCase: false, specialChar: false }),
                        referral:newOTP.generate(8, { alphabets: true, upperCase: true, specialChar: true }),
                    })
                    response.message = 'User Created Successfully'
                    response.body.userId = user_id
                }
            }        
        
        return res.status(200).send(response);
    } catch (err) {
        console.log(err)
        if (err) {
            response.statusCode = 0
            response.code = 500
            response.message = 'Internal Server Error'

            return res.status(500).send(response);
        }
    }
} 