const models = require('../../models/init-models').initModels()
const excel = require('excel4node')

exports.pendingList = async function(req, res) {

    // console.log(req)
    let response = {
        statusCode: 1, // 1 success 0 failure
        code: 200,
        message: 'Success',
        body: {}
    }
    try {
        const rejectedDrivers = await models.drivers.findAll({
            raw: true,
            nest: true,
            where: {
                driver_status: 'pending'
            },
            attributes: ['name', 'driver_id', 'contact', 'owner_name', 'owner_number', 'location', 'license_number', 'expiry_date', 'referral'],
            include: [{
                model: models.documents,
                as: 'document_document',
                attributes: ['driver_id', 'profile_pic', 'aadhar_front', 'aadhar_back', 'license_front', 'license_back']
            }, {
                model: models.cars,
                as: 'current_car',
                attributes: ['driver_id', 'front_image', 'chase_image', 'rc_front', 'rc_back', 'insurance', 'fc']
            }, {
                model: models.owner,
                as: 'driver_owners',
                attributes: ['driver_id', 'aadhar_front', 'aadhar_back', 'pan_card', 'passbook', 'rental_agreement1', 'rental_agreement2']
            }]

        })
        console.log(rejectedDrivers)
            // response.body.approvedDrivers = rejectedDrivers



        var wb = new excel.Workbook();


        var drivers = wb.addWorksheet('Drivers');
        var owner = wb.addWorksheet('Owner');
        var car = wb.addWorksheet('Car');
        var documents = wb.addWorksheet('Document');


        const driverColumnNames = [
            'Driver Id',
            'Name',
            'Contact',
            'Owner Name',
            'Owner Number',
            'Location',
            'License Number',
            'Expiry Date',
            'Referral Code',
        ]
        const ownerColumnNames = [
            'Driver Id',
            'Aadhar Front',
            'Aadhar Front',
            'Pan Card',
            'Passbook',
            'Rental Agreement1',
            'Rental Agreement2',

        ]
        const documentsColumnNames = [
            'Driver Id',
            'Profile Pic',
            'Aadhar Front',
            'Aadhar Back',
            'License Front',
            'License Back'
        ]
        const carColumnNames = [
            'Driver Id',
            'Front Image',
            'Chase Number',
            'RC Front',
            'RC Back',
            'Insurance',
            'FC'
        ]



        await updateDriversCell(1, drivers, driverColumnNames)
        await updateOwnerCell(1, owner, ownerColumnNames)
        await updateDocumentsCell(1, documents, documentsColumnNames)
        await updateCarCell(1, car, carColumnNames)


        let indexedValue = 2
        if (rejectedDrivers.length > 0) {
            for (const element of rejectedDrivers) {
                await updateDriversCell(indexedValue, drivers, element)
                await updateOwnerCell(indexedValue, owner, element.driver_owners)
                await updateDocumentsCell(indexedValue, documents, element.document_document)
                await updateCarCell(indexedValue, car, element.current_car)
                indexedValue++
            }
            await wb.write('./uploads/reports/pendingReport.xlsx')
        }
        response.body.fileData = fs.readFileSync('./uploads/reports/pendingReport.xlsx', { encoding: 'base64' })


        return res.status(response.code).send(response);
        // }

    } catch (err) {
        if (err) {
            response.statusCode = 0
            response.code = 500
            response.message = 'Internal Server Error'
                // response.body.userId = req.body.driverId

            return res.status(500).send(response);
        }
    }
}




async function updateDriversCell(index, object, data) {
    console.log('***********************************************************')
    console.log(index)
    console.log('***********************************************************')

    if (index === 1) {
        object.cell(index, 1)
            .string(data[0])
        object.cell(index, 2)
            .string(data[1])
        object.cell(index, 3)
            .string(data[2])
        object.cell(index, 4)
            .string(data[3])
        object.cell(index, 5)
            .string(data[4])
        object.cell(index, 6)
            .string(data[5])
        object.cell(index, 7)
            .string(data[6])
        object.cell(index, 8)
            .string(data[7])
        object.cell(index, 9)
            .string(data[8])
        object.cell(index, 10)
            .string(data[9])

    } else {
        object.cell(index, 1)
            .string(data.driver_id)
        object.cell(index, 2)
            .string(data.name === null ? 'null' : data.name)
            // object.cell(index, 3)
            //     .string(data.email === null ? 'null' : data.passbook)
        object.cell(index, 3)
            .string(data.contact === null ? 'null' : data.contact)
        object.cell(index, 4)
            .string(data.owner_name === null ? 'null' : data.owner_name)
        object.cell(index, 5)
            .string(data.owner_number === null ? 'null' : data.owner_number)
        object.cell(index, 6)
            .string(data.location === null ? 'null' : data.location)
        object.cell(index, 7)
            .string(data.license_number === null ? 'null' : data.license_number)
        object.cell(index, 8)
            .string(data.expiry_date === null ? 'null' : data.expiry_date)
        object.cell(index, 9)
            .string(data.referral === null ? 'null' : data.referral)
    }
}


async function updateOwnerCell(index, object, data) {
    console.log('***********************************************************')
    console.log(index)
    console.log('***********************************************************')

    if (index === 1) {
        object.cell(index, 1)
            .string(data[0])
        object.cell(index, 2)
            .string(data[1])
        object.cell(index, 3)
            .string(data[2])
        object.cell(index, 4)
            .string(data[3])
        object.cell(index, 5)
            .string(data[4])
        object.cell(index, 6)
            .string(data[5])
        object.cell(index, 7)
            .string(data[6])
    } else {
        object.cell(index, 1)
            .string(data.driver_id === null ? 'null' : data.driver_id)
        object.cell(index, 2)
            .string(data.aadhar_front === null ? 'null' : data.aadhar_front)
        object.cell(index, 3)
            .string(data.aadhar_back === null ? 'null' : data.aadhar_back)
        object.cell(index, 4)
            .string(data.pan_card === null ? 'null' : data.pan_card)
        object.cell(index, 5)
            .string(data.passbook === null ? 'null' : data.passbook)
        object.cell(index, 6)
            .string(data.rental_agreement1 === null ? 'null' : data.rental_agreement1)
        object.cell(index, 7)
            .string(data.rental_agreement2 === null ? 'null' : data.rental_agreement2)

    }
}



async function updateDocumentsCell(index, object, data) {
    console.log('***********************************************************')
    console.log(index)
    console.log('***********************************************************')

    if (index === 1) {
        object.cell(index, 1)
            .string(data[0])
        object.cell(index, 2)
            .string(data[1])
        object.cell(index, 3)
            .string(data[2])
        object.cell(index, 4)
            .string(data[3])
        object.cell(index, 5)
            .string(data[4])
        object.cell(index, 6)
            .string(data[5])

    } else {
        object.cell(index, 1)
            .string(data.driver_id === null ? 'null' : data.driver_id)
        object.cell(index, 2)
            .string(data.profile_pic === null ? 'null' : data.profile_pic)
        object.cell(index, 3)
            .string(data.aadhar_front === null ? 'null' : data.aadhar_front)
        object.cell(index, 4)
            .string(data.aadhar_back === null ? 'null' : data.aadhar_back)
        object.cell(index, 5)
            .string(data.license_front === null ? 'null' : data.license_front)
        object.cell(index, 6)
            .string(data.license_back === null ? 'null' : data.license_back)
    }
}


async function updateCarCell(index, object, data) {
    console.log('***********************************************************')
    console.log(index)
    console.log('***********************************************************')

    if (index === 1) {
        object.cell(index, 1)
            .string(data[0])
        object.cell(index, 2)
            .string(data[1])
        object.cell(index, 3)
            .string(data[2])
        object.cell(index, 4)
            .string(data[3])
        object.cell(index, 5)
            .string(data[4])
        object.cell(index, 6)
            .string(data[5])
        object.cell(index, 7)
            .string(data[6])

    } else {
        object.cell(index, 1)
            .string(data.driver_id === null ? 'null' : data.driver_id)
        object.cell(index, 2)
            .string(data.front_image === null ? 'null' : data.front_image)
        object.cell(index, 3)
            .string(data.chase_image === null ? 'null' : data.chase_image)
        object.cell(index, 4)
            .string(data.rc_front === null ? 'null' : data.rc_front)
        object.cell(index, 5)
            .string(data.rc_back === null ? 'null' : data.rc_back)
        object.cell(index, 6)
            .string(data.insurance === null ? 'null' : data.insurance)
        object.cell(index, 7)
            .string(data.fc === null ? 'null' : data.fc)
    }
}