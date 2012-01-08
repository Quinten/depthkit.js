DepthKit.Light = function ( x, y, z, brightness ) {
  this.x = ( x === undefined ) ? -100 : x;
  this.y = ( y === undefined ) ? -100 : y;
  this.z = ( z === undefined ) ? -100 : z;
  this.brightness = ( brightness === undefined ) ? 1 : Math.min(Math.max(brightness, 0), 1);
  this.step = undefined;
}

DepthKit.Light.prototype.setBrightness = function ( b ) {
  this.brightness = Math.min(Math.max(b, 0), 1);
}

