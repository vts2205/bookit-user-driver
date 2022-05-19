const models = require('../../models/init-models').initModels()


exports.documentsDriver = async function (req, res) {
    console.log(req)
    var document_id = ''
    try {
        const document = await models.documents.findOne({
            raw: true,
            where: {
                driver_id: req.body.driver_id
            }
        })

        if (document === null) {
            var documentId = await models.documents.findOne({
                raw: true,
                attributes: ['document_id'],
                order: [['id', 'DESC']]
            })
            if (documentId === null) {
                document_id = '1'
                await models.documents.create({
                    document_id: document_id,
                    driver_id: req.body.driver_id,
                    national_id_number: req.body.nationalNumber,
                    pan_number: req.body.pan_number,
                    license_number: req.body.license,
                    expiry_at: req.body.expiryAt
                })
            } else {
                document_id = (parseInt(documentId.document_id.toString()))++
                await models.documents.create({
                    document_id: document_id,
                    driver_id: req.body.driver_id,
                    national_id_number: req.body.nationalNumber,
                    pan_number: req.body.pan_number,
                    license_number: req.body.license,
                    expiry_at: req.body.expiryAt
                })
            }

            await models.driver.update({ document_id: document_id }, {
                where: {
                    driver_id: req.body.driver_id,
                }
            })
            return res.status(200).send({
                message: 'Document Created Successfully',
                body: {
                    driver_id: req.body.driver_id,
                    document_id: document_id
                }
            })
        }
        return res.status(200).send({
            message: 'Document Already Exists',
            body: {
                driver_id: req.body.driver_id,

            }
        })
    } catch (err) {
        return res.status(500).send({
            message: err,
            body: {
                driver_id: req.body.driver_id,
            }
        })
    }
}