const models = require('../../models/init-models').initModels()


const loginAdmin = async function(req, res) {
    console.log(req)

    try{
        const login = await models.admin.findOne({
            raw:true,
            where: {
                email :req.body.email,
                password : req.body.password,                
            }
        })

        if(login === null) {
            return res.status(200).send('No user found');
        } else {
            return res.status(200).send('Login Successfully')
        }
    } catch(err) {
        return res.status(500).send(err)
    }
}