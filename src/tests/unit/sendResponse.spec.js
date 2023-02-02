const { sendResponse } = require('../../helpers')

test('is JSON returned', () => {
  expect(sendResponse(200, '')).toBeInstanceOf(Object)
})
