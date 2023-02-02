const { validateRequest, sendResponse } = require('./helpers')

module.exports.handler = async (event) => {
  console.log({ event })
  const responseMessage = 'Hello World !!'
  const responseCode = 200

  const validRequest = validateRequest(event.body)

  if (!validRequest.isValidRequest) {
    return sendResponse(400, validRequest.errorMessage)
  }

  return sendResponse(responseCode, responseMessage)
}
