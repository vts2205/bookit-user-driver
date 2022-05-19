const models = require('../../models/init-models').initModels()

exports.updateProfile = async function(req, res) {

    console.log(req.body)

    try {
        const updateProfile = await models.drivers.update({
            name: req.body.name,
            gender: req.body.gender,
            dob:req.body.dob,
            email: req.body.email
        }, {where:{
            driver_id: req.body.driverId
        }})

        return res.status(200).send('Updated Successfully')

    }catch(err){
        return res.status(500).send(err)
    }
}