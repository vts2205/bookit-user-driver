const models = require('../../models/init-models').initModels()

exports.tripHistory = async function(req,res) {

    console.log('Trip History')
    console.log(req.query)
    let response = {
        statusCode: 1,   // 1 success 0 failure
        code: 200,
        message: 'Success',
        body: {}
    }

    try{
        response.body.userId = req.query.userId
        const tripDetails = await models.carShifts.findAll({
            raw:true,
            where:{
                customer_id: req.query.userId,  
                              
            },
            order:[['id','DESC']]
        })
        console.log(tripDetails)
        response.body.tripDetails = tripDetails

        return res.status(200).send(response)

    }catch(err) {
        if (err) {
            response.statusCode = 0
            response.code = 500
            response.message = 'Internal Server Error'
            response.body.userId = req.body.userId


            return res.status(500).send(response);
        }
    }
}