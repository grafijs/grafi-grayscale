;(function(){

import '../node_modules/grafi-formatter/src/formatter'
import 'grayscale'

  var grafi = {}
  grafi.grayscale = grayscale

  if (typeof module === 'object' && module.exports) {
    module.exports = grafi
  } else {
    this.grafi = grafi
  }
}())
