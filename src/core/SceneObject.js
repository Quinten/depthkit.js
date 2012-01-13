DepthKit.SceneObject =  function ( x, y ,z ) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  this.rotationX = 0;
  this.rotationY = 0;
  this.rotationZ = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.scaleZ = 1;
  this.parent = undefined;
  this.scene = undefined;
  this.step = undefined;
  this.mx = x;
  this.my = y;
  this.mz = z;
  this.rotationMX = 0;
  this.rotationMY = 0;
  this.rotationMZ = 0;
  this.scaleMX = 1;
  this.scaleMY = 1;
  this.scaleMZ = 1;
}

DepthKit.SceneObject.prototype.setScene = function ( scene ) {
  this.scene = scene;
}

DepthKit.SceneObject.prototype.getGlobalX = function () {
  if (this.parent) {
    return (this.parent.getGlobalX() + this.x);
  } else {
    return this.x;
  }
}

DepthKit.SceneObject.prototype.getGlobalY = function () {
  if (this.parent) {
    return (this.parent.getGlobalY() + this.y);
  } else {
    return this.y;
  }
}

DepthKit.SceneObject.prototype.getGlobalZ = function () {
  if (this.parent) {
    return (this.parent.getGlobalZ() + this.z);
  } else {
    return this.z;
  }
}

DepthKit.SceneObject.prototype.initM = function () { }
DepthKit.SceneObject.prototype.rotateM = function () { }
DepthKit.SceneObject.prototype.scaleM = function () { }
DepthKit.SceneObject.prototype.translateM = function () { }

