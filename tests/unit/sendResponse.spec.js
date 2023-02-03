const { sendResponse } = require('../../src/helpers')

test('is JSON returned', () => {
  expect(sendResponse(200, '')).toBeInstanceOf(Object)
})
