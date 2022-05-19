const models = require('../../models/init-models').initModels()
const moment = require('moment')
const { Sequelize } = require('sequelize')

exports.getpasswordupdate = async function (req, res) {
    console.log('password Route')
    console.log(req.body)
    let response = {
        statusCode: 1,   // 1 success 0 failure
        code: 200,
        message: 'Success',
        body: {}
    }

    try {

        response.body.userId = req.body.userId
       
        
        const getcorrectpassword = await models.users.findOne({
            raw: true,
            where: {
                user_id: req.body.userId,
                password: req.body.oldPassword
            }
        })
       
        if (getcorrectpassword !== null) {
            const getpassword = {
                password: req.body.newPassword,
            }
            const updatepassword = await models.users.update(getpassword, {
                where: {
                    user_id: req.body.userId
                }
            })
            response.message = 'Password Changed Successfully'
            return res.status(200).send(response);
        }
        else{
            response.message = 'Invalid Password'
            return res.status(200).send(response);
        }

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