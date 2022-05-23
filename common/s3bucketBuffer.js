const s3bucketBuffer = async function s3uploadBuffer (tempImgPath, userId, path, urlPath, timeStamp, bufferData) {
    const fs = require('fs')
    const res = await new Promise((resolve, reject) => {
      fs.readFile(tempImgPath, async function (error, bufferData) {
        if (error) return reject(error)
        // const webp = require('webp-converter')
        // webp.grant_permission()
        const AWS = require('aws-sdk')
        AWS.config.update({ accessKeyId: process.env.S3_ACCESS_KEY, secretAccessKey: process.env.S3_SECRET_KEY })
        const fileName = userId + '_' + timeStamp + '.png'
        // const result = await new Promise((resolve, reject) => {
        //   // webp.cwebp(tempImgPath, fileName, '-q 60', '-v').then((data) => {
        //     fs.readFile(fileName, function (error, bufferData) {
        //       if (error) return reject(error)
        //       fs.unlinkSync(fileName, (err) => {
        //         if (err) return reject(err)
        //       })
        //       resolve(bufferData)
        //     })
        //   })
        // // })
        // const base64data = result
        const s3 = new AWS.S3()
        s3.upload({
          Bucket: process.env.S3_BUCKET_NAME + urlPath + path,
          Body: bufferData,
          Key: fileName,
          ACL: 'public-read'
        }, function (err, data) {
          if (err) return reject(err)
          resolve(data)
        })
      })
    })
    return res
  }
  module.exports = { s3bucketBuffer }
  