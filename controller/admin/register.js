const models = require('../../models/init-models').initModels()
// const moment = require('moment')


exports.registerAdmin = async function (req, res) {

    console.log(req)
    var admin_id = ''

    try {
        const adminData = await models.admin.findOne({
            raw: true,
            where: {
                email: req.body.email
            }
        })
        console.log(adminData)

        if (adminData === null) {
            var adminId = await models.admin.findOne({
                raw: true,
                attributes: ['admin_id'],
                order: [['id', 'DESC']]
            })

            if (adminId === null) {
                admin_id = 'adm_1'
            } else {
                const data = (adminId.admin_id).split('_');
                const number = (parseInt(data[0].toString()))++;
                admin_id = 'adm_' + number
                await models.admin.create({
                    admin_id: 'adm_' + number,
                    name: req.body.name,
                    email: req.body.email,
                    contact: req.body.contact,
                    password: req.body.password
                })
            }

        }

        return res.status(200).send({
            message : 'Admin Created Successfully',
            adminId : admin_id
        });
    } catch (err) {
        if (err)
            return res.status(500).send(err);
    }
} 