const models = require('../../models/init-models').initModels()
const moment = require('moment')


exports.updateuserprofile = async function (req, res) {
    console.log('Update User Profile')
    console.log(req.body)

    let response = {
        statusCode: 1,   // 1 success 0 failure
        code: 200,
        message: 'Success',
        body: {}
    }

    try {
       response.body.userId = req.body.userId
        const tempJson = {            
            name: req.body.name,
            dob: req.body.dob,
            gender: req.body.gender,
            email: req.body.email, 
        }
        
        const updateuserdata = await models.users.update(tempJson, {
            where: {
                user_id: req.body.userId
            }
        })
        console.log(updateuserdata)
        response.message = 'Updated Successfully'       

        return res.status(200).send(response);
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