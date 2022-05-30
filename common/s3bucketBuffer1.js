// const fs = require('fs')

// const AWS = require('aws-sdk')

const s3bucketBuffer = async function s3uploadBuffer(tempImgPath, userId, path, urlPath, timeStamp, bufferData) {
    // AWS.config.update({ accessKeyId: process.env.S3_ACCESS_KEY, secretAccessKey: process.env.S3_SECRET_KEY })

    const sshot = await new Promise((resolve, reject) => {
        const AWS = require('aws-sdk')

        console.log('Entered into s3')
        AWS.config.update({ accessKeyId: process.env.S3_ACCESS_KEY, secretAccessKey: process.env.S3_SECRET_KEY })
        const s3 = new AWS.S3()
        let screenShotFilename = userId + '_' + timeStamp + '.png'
        s3.upload({
            Bucket: process.env.S3_BUCKET_NAME + urlPath + path,
            Body: bufferData,
            Key: screenShotFilename,
            ContentType: 'image/jpeg',
            ACL: 'public-read-write' // Make this object public
        }, function(err, data) {
            console.log(err)
            console.log(data)
            if (err) return reject(err)
            resolve(data)
        })
    })

    return sshot

}
module.exports = { s3bucketBuffer }