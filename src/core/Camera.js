DepthKit.Camera = function () {
  // position of the camera
  this.x = 0;
  this.y = 0;
  this.z = -650;
  // rotation of the camera
  this.rotationX = 0;
  this.rotationY = 0;
  this.rotationZ = 0;
  // focal point in 3d coords (viewers position relative to the display surface)
  this.ex = 0;
  this.ey = 0;
  this.ez = 650;
  this.step = undefined;
}

