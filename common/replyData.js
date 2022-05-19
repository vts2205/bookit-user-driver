const replayData = async function (reply, response) {
    const tempData = {
      status: response.statusCode,
      message: response.message,
      body: response.body
    }
    console.log(tempData)
    return reply
      .code(response.code)
     // .header('Content-Type', 'application/json; charset=utf-8')
      .send(tempData)
  }
  
  module.exports = { replayData }