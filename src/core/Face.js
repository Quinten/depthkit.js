DepthKit.Face = function ( a, b, c, color ) {
  this.a = a || new DepthKit.Vertex();
  this.b = b || new DepthKit.Vertex();
  this.c = c || new DepthKit.Vertex();
  this.color = color || "#cccccc";
  this.light = undefined;
}

DepthKit.Face.prototype.isBackface = function () {
  var cax = this.c.px - this.a.px,
      cay = this.c.py - this.a.py,
      bcx = this.b.px - this.c.px,
      bcy = this.b.py - this.c.py;
  return (cax * bcy > cay * bcx);
}

DepthKit.Face.prototype.isBehindCamera = function () {
  return (this.a.pz < 0 || this.b.pz < 0 || this.c.pz < 0);
}

DepthKit.Face.prototype.getDepth = function () {
  return Math.min(this.a.d, this.b.d, this.c.d);
}

DepthKit.faceSort = function ( a, b ) {
  return (b.getDepth() - a.getDepth());
}

DepthKit.Face.prototype.getAdjustedColor = function () {
  if (this.light === undefined) {
    return this.color;
  }
  var color = window.parseInt(this.color.slice(1), 16),
      red = color >> 16,
      green = color >> 8 & 0xff,
      blue = color & 0xff,
      lightFactor = this.getLightFactor();
  red *= lightFactor;
  green *= lightFactor;
  blue *= lightFactor;
  return ('#' + ('00000' + ((red << 16 | green << 8 | blue) | 0).toString(16)).substr(-6));
}

DepthKit.Face.prototype.getLightFactor = function () {
  var ab = {
    x: this.a.mx - this.b.mx,
    y: this.a.my - this.b.my,
    z: this.a.mz - this.b.mz
  };
  var bc = {
    x: this.b.mx - this.c.mx,
    y: this.b.my - this.c.my,
    z: this.b.mz - this.c.mz
  };
  var norm = {
    x:  (ab.y * bc.z) - (ab.z * bc.y),
    y:-((ab.x * bc.z) - (ab.z * bc.x)),
    z:  (ab.x * bc.y) - (ab.y * bc.x)
  };
  var dotProd = norm.x * this.light.x +
                norm.y * this.light.y +
                norm.z * this.light.z,
      normMag = Math.sqrt(norm.x * norm.x +
                          norm.y * norm.y +
                          norm.z * norm.z),
      lightMag = Math.sqrt(this.light.x * this.light.x +
                           this.light.y * this.light.y +
                           this.light.z * this.light.z);
  
  return (Math.acos(dotProd / (normMag * lightMag)) / Math.PI) * this.light.brightness;
}

