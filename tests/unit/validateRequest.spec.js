const { validateRequest } = require('../../src/helpers')

test('valid request passed', () => {
  const result = validateRequest(JSON.stringify({
    filename: 'example',
    base64File: 'fawegw',
    convertTo: 'pdf'
  }))

  expect(result.isValidRequest).toBe(true)
})

test('invalid request passed', () => {
  const result = validateRequest(JSON.stringify({
    filename: 'example',
    base64File: 'fawegw'
  }))

  expect(result.isValidRequest).toBe(false)
  expect(result.errorMessage).toContain('missing properties')
})

test('invalid JSON passed', () => {
  const result = validateRequest(undefined)

  expect(result.isValidRequest).toBe(false)
  expect(result.errorMessage).toContain('Invalid JSON')
})
