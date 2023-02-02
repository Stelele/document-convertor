module.exports.validateRequest = (body) => {
  let isValidRequest = false
  let errorMessage = ''

  try {
    const request = JSON.parse(body)

    if (request.filename && request.base64File && request.convertTo) {
      isValidRequest = true
      errorMessage = ''
    } else {
      isValidRequest = false
      errorMessage = 'missing properties: filename, base64File or convertTo'
    }
  } catch (e) {
    isValidRequest = false
    errorMessage = 'Invalid JSON format'
  }

  return { isValidRequest, errorMessage }
}

module.exports.sendResponse = (responseStatus, message) => {
  return {
    statusCode: responseStatus,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message
    })
  }
}
