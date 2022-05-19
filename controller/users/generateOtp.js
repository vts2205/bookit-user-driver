const models = require('../../models/init-models').initModels()
var newOTP = require('otp-generators')


exports.cronOTP = async function (req, res) {
    try {

        const userOtp = await models.users.findAll({
            raw: true,
            attributes: ['user_id']
        })


        for (const element of userOtp) {
            console.log(element)
            let start = newOTP.generate(4, { alphabets: false, upperCase: false, specialChar: false });
            let end = newOTP.generate(4, { alphabets: false, upperCase: false, specialChar: false });
            await models.users.update({ start_otp: start, end_otp: end }, {
                where: {
                    user_id: element.user_id
                }
            })
        }
        return res.status(200).send(' OTP Cron Finished Successfully')

    } catch (err) {
        return res.status(500).send(err)
    }
}