const models = require('../../models/init-models').initModels()
const moment = require('moment')
const Ippopay = require("node-ippopay");


exports.ippopayorder = async function (req, res) {
    console.log('ippopay')
    console.log(req.body)
    let response = {
        statusCode: 1,   // 1 success 0 failure
        code: 200,
        message: 'Success',
        body: {}
    }
    try {

        response.body.userId = req.body.userId

        var ippopay_instance = new Ippopay({
            public_key: process.env.PUBLIC_KEY,
            secret_key: process.env.SECRET_KEY,
        });

        const userDetails = await models.users.findOne({
            raw: true,
            where: {
                user_id: req.body.userId,
            }
        })

        console.log(userDetails)

        if (userDetails !== null) {
            ippopay_instance.createOrder({
                amount: req.body.amount,
                currency: 'INR',
                payment_modes: req.body.paymentMode,
                customer: {
                    name: userDetails.name,
                    email: userDetails.email,
                    phone: {
                        country_code: "91",
                        national_number: userDetails.contact
                    }
                }
            }, async function (err, data) {
                console.log(data)

                let json = {
                    payment_id: req.body.userId + '_' + moment().valueOf(),
                    user_id: req.body.userId,
                    order_id: data.orderId,
                    payment_type: req.body.paymentMode,
                    amount: req.body.amount,
                    status: data.data.status
                }

                await models.payments.create(json)

                response.body.ippopayOrder = data
            });
        } else {
            response.message = 'User Not Found'
        }
        return res.status(500).send(response);
    } catch (err) {
        if (err) {
            response.statusCode = 0
            response.code = 500
            response.message = 'Internal Server Error'
            response.body.userId = req.body.userId


            return res.status(500).send(response);
        }
    }
} 