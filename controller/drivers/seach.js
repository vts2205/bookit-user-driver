const models = require('../../models/init-models').initModels()
var newOTP = require('otp-generators')
var getToken = require('../../middlewares/create_token')
const { Op, Sequelize } = require('sequelize')


exports.search = async function (req, res) {
    console.log('driver register')
    console.log(req.query)


    let response = {
        statusCode: 1, // 1 success 0 failure
        code: 200,
        message: 'Success',
        body: {}
    }

    try {
        const search = await models.drivers.findAll({
            raw: true,
            where: {
                [Op.or]: {
                    driver_id: {
                        [Op.like]: '%' + req.query.searchValue + '%'
                    },
                    name: {
                        [Op.like]: '%' + req.query.searchValue + '%'
                    },
                    contact: {
                        [Op.like]: '%' + req.query.searchValue + '%'
                    },
                    created_at: {
                        [Op.like]: Sequelize.literal('"%' + req.query.searchValue + '%"')
                        // [Op.like]: '%' + req.query.searchValue + '%'

                    },
                },
                driver_status: 'confirmed'
            }
        })


        response.body.searchResults = search
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