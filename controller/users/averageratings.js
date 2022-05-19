const models = require('../../models/init-models').initModels()
const moment = require('moment')
const {Sequelize}= require('sequelize')

exports.averagratingscal = async function (req, res) {
    console.log('Average Ratings Route')
    console.log(req)

    try {
        console.log('+++++++++ Average Ratings by User +++++++++++')
        console.log(req.body)
        const countData = await models.carShifts.findAll({
            raw: true,
            // nest: true,
            where: {
                driver_id: req.body.driverId
            },
            attributes :[ [Sequelize.fn('COUNT', 'driver_rating'), 'ratings'],[Sequelize.fn('SUM', Sequelize.col('driver_rating')), 'sums']],
            // attributes :[[Sequelize.literal(Sequelize.fn('COUNT', 'ratings'),'/',Sequelize.fn('SUM', Sequelize.col('ratings')))]],
        })
        console.log(countData)
        console.log(countData[0].sums)
        console.log(countData[0].ratings)
        console.log(countData[0].sums / countData[0].ratings);
    
        console.log('<<<<<<<< Get User Details End >>>>>>>>>>>>>>>>>>')
        return res.status(200).send('Getting Average Count Details and the Average Count is ' + countData[0].sums / countData[0].ratings);
    } catch (err) {
        if (err)
            return res.status(500).send(err);
    }
}