const models = require('../../models/init-models').initModels()


exports.trip_driver_details = async function (req,res) {
    

    console.log(req.body)

    try{

        const driverDetails = await models.drivers.findOne({
            raw:true,
            where: {
                driver_id: req.body.driverId,                                
            },
            include:[{
                model: models.cars,
                as: 'current_car_id',                
            }]
        })

        const otp = await models.users.findOne({
            raw:true,
            where:{
                user_id : req.body.userId
            },
            attributes:['start_otp']
        })

        const carShifts =await models.carShifts.findOne({
            raw:true,
            where:{
                trip_id: req.body.tripId
            }
        })


        const updateJson = {
            driver_id: req.body.driverId,
            car_id: driverDetails.current_car_id.car_id,            
            ratings: driverDetails.ratings
        }

        const updateCarShifts = await models.carShifts.update(updateJson, {
            where:{
                trip_id: req.body.tripId
            }
        })       


        const json = {
            driverName:  driverDetails.name,
            driverContact: driverDetails.contact,
            vehicleNumber :  driverDetails.current_car_id.car_register_no,
            startOtp: otp.start_otp,
            paymentMethod :  carShifts.payment_type,
            ratings: driverDetails.ratings
            
        }

        if (carShifts.trip_type === 'rental')
         {
            json.endOtp = otp.end_otp
         }

        return res.status(200).send(json)
        
    } catch(err) {
        return res.status(500).sens(err)
    }


}