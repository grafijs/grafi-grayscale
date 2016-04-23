/**
  ## grayscale method
  Grayscale color of an given image.
  If no option is passed, it defaults to { mode: 'luma', monochrome: false }

  ### Parameters
    - imageData `Object`: ImageData object
    - option `Object` : Option object
        - mode `String` : grayscaling mode, 'luma', 'simple', or 'average'
        - channel `String` : color channel to use when in simple mode, 'r', 'g', or 'b'

  ### Example
      var input = { data: Uint8ClampedArray[400], width: 10, height: 10 }
      // grayscale based on average of RGB colors
      grafi.grayscale(input, {mode: 'average'})
      // grayscale by repeating value of specified color channel across all channel
      grafi.grayscale(input, {mode: 'simple', channel: 'r'})
 */
function grayscale (imgData, option) {
  // sanitary check for input data
  checkColorDepth(imgData)

  // set check options object & set default options if necessary
  option = option || {}
  option.mode = option.mode || 'luma'
  option.channel = option.channel || 'g'

  // different grayscale methods
  var mode = {
    'luma': function (r, g, b) {
      return 0.299 * r + 0.587 * g + 0.114 * b
    },
    'simple': function (r, g, b, a, c) {
      var ref = {r: 0, g: 1, b: 2}
      return arguments[ref[c]]
    },
    'average': function (r, g, b) {
      return (r + g + b) / 3
    }
  }

  var pixelSize = imgData.width * imgData.height
  var newPixelData = new Uint8ClampedArray(pixelSize * 4)
  var i, _grayscaled, _index

  // loop through pixel size, extract r, g, b values & calculate grayscaled value
  for (i = 0; i < pixelSize; i++) {
    _index = i * 4
    _grayscaled = mode[option.mode](imgData.data[_index], imgData.data[_index + 1], imgData.data[_index + 2], imgData.data[_index + 3], option.channel)
    newPixelData[_index] = _grayscaled
    newPixelData[_index + 1] = _grayscaled
    newPixelData[_index + 2] = _grayscaled
    newPixelData[_index + 3] = imgData.data[_index + 3]
  }
  return formatter(newPixelData, imgData.width, imgData.height)
}
