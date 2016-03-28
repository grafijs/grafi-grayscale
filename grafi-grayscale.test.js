var assert = require('assert')
var grafi = require('./grafi-grayscale.js')

var inputData = {data: [50, 100, 90, 255], width: 1, height: 1}
var monoData = grafi.grayscale(inputData, {monochrome: true})
var lumaData = grafi.grayscale(inputData, {mode: 'luma'})
var simpleData = grafi.grayscale(inputData, {mode: 'simple'})
var averageData = grafi.grayscale(inputData, {mode: 'average'})

assert(monoData.constructor.toString().match(/function\s(\w*)/)[1] === 'ImageData',
  'returned object is an instance of ImageData')

assert(monoData.data[0] === monoData.data[0],
  'default mode is luma')

assert(monoData.data.length / (monoData.width * monoData.height) === 1,
  'when monochrome flag is true, returned image data is single color channel')

assert(lumaData.data[0] === lumaData.data[1] && lumaData.data[0] === lumaData.data[2],
  'for RGBA mode, red, green, and blue has same value')

assert(lumaData.data[3] === inputData.data[3],
  'for RGBA mode, alpha channel is not altered')

assert(lumaData.data[0] === Math.round(0.299 * inputData.data[0] + 0.587 * inputData.data[1] + 0.114 * inputData.data[2]),
  'luma mode returns luma calculated value')

assert(simpleData.data[0] === inputData.data[1],
  'simple mode returns green value')

assert(averageData.data[0] === Math.round((inputData.data[0] + inputData.data[1] + inputData.data[2]) / 3),
  'average mode returns average of red, green, and blue')
