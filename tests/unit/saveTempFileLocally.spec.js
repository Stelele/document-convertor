const fs = require('fs')
const { saveTempFileLocally } = require('../../src/helpers')

test('file created', () => {
  let testFileName = 'testexample.txt'
  const base64FileString = 'aGVsbG8gd29ybGQNCkkgYW0gdGhlIG9ubHkgb25lIDop'

  let indexCounter = 1
  while (fs.existsSync(testFileName)) {
    testFileName = `testexample${indexCounter}.txt`
    indexCounter += 1
  }

  const fileCreated = saveTempFileLocally(testFileName, base64FileString)

  const fileExists = fs.existsSync(`/tmp/${testFileName}`)

  expect(fileExists).toBe(true)
  expect(fileCreated).toBe(true)

  if (fileExists) {
    fs.rmSync(`/tmp/${testFileName}`)
  }
})

test('removed / and only saved file in tmp dir', () => {
  let testFileName = 'john/wick/testexample.txt'
  const base64FileString = 'aGVsbG8gd29ybGQNCkkgYW0gdGhlIG9ubHkgb25lIDop'

  let indexCounter = 1
  while (fs.existsSync(testFileName)) {
    testFileName = `testexample${indexCounter}.txt`
    indexCounter += 1
  }

  const fileCreated = saveTempFileLocally(testFileName, base64FileString)

  testFileName = testFileName.replaceAll('/', '-')
  const fileExists = fs.existsSync(`/tmp/${testFileName}`)

  expect(fileExists).toBe(true)
  expect(fileCreated).toBe(true)

  if (fileExists) {
    fs.rmSync(`/tmp/${testFileName}`)
  }
})

test('removed \\ and only saved file in tmp dir', () => {
  let testFileName = 'john\\wick\\testexample.txt'
  const base64FileString = 'aGVsbG8gd29ybGQNCkkgYW0gdGhlIG9ubHkgb25lIDop'

  let indexCounter = 1
  while (fs.existsSync(testFileName)) {
    testFileName = `testexample${indexCounter}.txt`
    indexCounter += 1
  }

  const fileRespExists = saveTempFileLocally(testFileName, base64FileString)

  testFileName = testFileName.replaceAll('\\', '-')
  const fileExists = fs.existsSync(`/tmp/${testFileName}`)

  expect(fileExists).toBe(true)
  expect(fileRespExists).toBe(true)

  if (fileExists) {
    fs.rmSync(`/tmp/${testFileName}`)
  }
})

test('removed both \\ and / and only saved file in tmp dir', () => {
  let testFileName = 'john\\wick\\js/ve/testexample.txt'
  const base64FileString = 'aGVsbG8gd29ybGQNCkkgYW0gdGhlIG9ubHkgb25lIDop'

  let indexCounter = 1
  while (fs.existsSync(testFileName)) {
    testFileName = `testexample${indexCounter}.txt`
    indexCounter += 1
  }

  const fileRespExists = saveTempFileLocally(testFileName, base64FileString)

  testFileName = testFileName.replaceAll('\\', '-').replaceAll('/', '-')
  const fileExists = fs.existsSync(`/tmp/${testFileName}`)

  expect(fileExists).toBe(true)
  expect(fileRespExists).toBe(true)

  if (fileExists) {
    fs.rmSync(`/tmp/${testFileName}`)
  }
})

test('special characters', () => {
  let testFileName = 'testexample*?#~`@#$%^&**().txt'
  const base64FileString = 'aGVsbG8gd29ybGQNCkkgYW0gdGhlIG9ubHkgb25lIDop'

  let indexCounter = 1
  while (fs.existsSync(testFileName)) {
    testFileName = 'testexample*?#~`@#$%^&**()' + indexCounter + '.txt'
    indexCounter += 1
  }

  const fileRespExists = saveTempFileLocally(testFileName, base64FileString)

  const fileExists = fs.existsSync(`/tmp/${testFileName}`)

  expect(fileExists).toBe(true)
  expect(fileRespExists).toBe(true)

  if (fileExists) {
    fs.rmSync(`/tmp/${testFileName}`)
  }
})

test('no filename provided', () => {
  const testFileName = ''
  const base64FileString = 'aGVsbG8gd29ybGQNCkkgYW0gdGhlIG9ubHkgb25lIDop'

  const fileCreated = saveTempFileLocally(testFileName, base64FileString)

  expect(fileCreated).toBe(false)
})
