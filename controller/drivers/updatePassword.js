const models = require('../../models/init-models').initModels()
const moment = require('moment')



exports.updatePassword = async function (req, res) {
    console.log(req.body)

    try {

        const passwordCheck = await models.drivers.findOne({
            raw: true,
            where: {
                driver_id: req.body.driver_id,
                password: req.body.password,
            }
        })

        if (passwordCheck === null) {
            return res.status(200).send('The password is incorrect')
        } else {
            const passwordUpdate = await models.drivers.update({
                password: req.body.new_password,
                updated_at: moment()
            }, {
                where: {
                    driver_id: req.body.driver_id
                }
            })
            return res.status(200).send({
                message: 'Password Changed Successfully',
                body: { driver_id: req.body.driver_id }
            })
        }
    } catch (err) {
        return res.status(500).send(err)
    }
}
