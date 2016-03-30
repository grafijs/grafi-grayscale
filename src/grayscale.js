/**
  ## grayscale method
  Grayscale color of an given image.
  If no option is passed, it defaults to { mode: 'luma', monochrome: false }

  ### Parameters
    - imageData `Object`: ImageData object
    - option `Object` : Option object
        - mode `String` : grayscaling mode, 'luma', 'simple', or 'average'
        - monochrome `Boolean` : output to be monochrome (single color depth) image

  ### Example
      var input = { data: Uint8ClampedArray[400], width: 10, height: 10, }
      grafi.grayscale(input, {mode: 'average', monochrome: true})
      // Since monochrome flag is true, returned object will have smaller data
      // ImageData { data: Uint8ClampedArray[100], width: 10, height: 10, }
 */
function grayscale (imgData, option) {
  // set check options object & set default options if necessary
  option = option || {}
  option.mode = option.mode || 'luma'
  option.monochrome = option.monochrome || false
  option.channel = Number(option.channel) || 1

  // different grayscale methods
  var mode = {
    'luma': function (r, g, b) {
      return 0.299 * r + 0.587 * g + 0.114 * b
    },
    'simple': function (r, g, b, a, c) {
      return arguments[c]
    },
    'average': function (r, g, b) {
      return (r + g + b) / 3
    }
  }

  // sanitary check for input data
  var dataLength = imgData.data.length
  var pixelSize = imgData.width * imgData.height
  if (dataLength / pixelSize !== 4) {
    throw new Error('ImageObject has incorrect color depth, please pass RGBA image')
  }

  var newPixelData = new Uint8ClampedArray(pixelSize * (option.monochrome || 4))
  var i, _grayscaled, _index

  // loop through pixel size, extract r, g, b values & calculate grayscaled value
  for (i = 0; i < pixelSize; i++) {
    _index = i * 4
    _grayscaled = mode[option.mode](imgData.data[_index], imgData.data[_index + 1], imgData.data[_index + 2], imgData.data[_index + 3], option.channel)
    if (option.monochrome) {
      newPixelData[i] = _grayscaled
      continue
    }
    newPixelData[_index] = _grayscaled
    newPixelData[_index + 1] = _grayscaled
    newPixelData[_index + 2] = _grayscaled
    newPixelData[_index + 3] = imgData.data[_index + 3]
  }
  return formatter(newPixelData, imgData.width, imgData.height)
}
