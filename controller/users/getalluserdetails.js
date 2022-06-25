const models = require('../../models/init-models').initModels()
const moment = require('moment')


exports.getalluserdata = async function (req, res) {
    console.log('User Details')
    console.log(req.query)
    let response = {
        statusCode: 1,   // 1 success 0 failure
        code: 200,
        message: 'Success',
        body: {}
    }

    try {

        response.body.userId = req.query.userId
        const getuserdata = await models.users.findOne({
            raw: true,
            where: {
                user_id: req.query.userId
            },
            attributes: ['name', 'email', 'contact', 'gender', 'dob', 'wallet', 'user_id']
        })

        if (getuserdata !== null) {
            response.body.userData = getuserdata
        } else {
            response.message = 'User Not Found'
        }

        return res.status(200).send(response);
    } catch (err) {
        if (err) {
            console.log(err)
            response.statusCode = 0
            response.code = 500
            response.message = 'Internal Server Error'
            response.body.userId = req.query.userId
            

            return res.status(500).send(response);
        }
    }
} 