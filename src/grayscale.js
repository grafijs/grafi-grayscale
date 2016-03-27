import formatter from '../node_modules/grafi-formatter/src/formatter'

/**
  ## grayscale method
  Brief description

  ### Parameters
    - imageData `Object`: ImageData object

  ### Example
      //code sample goes here
 */
export default function grayscale (imgData) {
  // Your code here :) !
  // What is this `export default` thing?
  // grafi uses rollup (ES6 module bundler) to build distribution file
  // see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export
  // for more about export



  // every return from grafi methods are ImageData,
  // internal function `formatter()` will take care of this
  return formatter(_pixelData_, _width_, _height_)
}
