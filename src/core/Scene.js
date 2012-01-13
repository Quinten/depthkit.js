DepthKit.Scene = function () {
  DepthKit.Container.call(this, 0, 0, 0);
  this.meshes = [];
  this.scene = this;
}

DepthKit.Scene.prototype = new DepthKit.Container();
DepthKit.Scene.prototype.constructor = DepthKit.Scene;

DepthKit.Scene.prototype.setScene = function ( scene ) { }

DepthKit.Scene.prototype.initM = function () {
  this.mx = 0;
  this.my = 0;
  this.mz = 0;
  for ( var c = 0; c < this.children.length; c++ ) {
    this.children[c].initM();
  } 
}

DepthKit.Scene.prototype.rotateM = function () {
  this.rotationMX = 0;
  this.rotationMY = 0;
  this.rotationMZ = 0;
  for ( var c = 0; c < this.children.length; c++ ) {
    this.children[c].rotateM();
  }  
}

DepthKit.Scene.prototype.scaleM = function () {
  
}

DepthKit.Scene.prototype.translateM = function () {
  for ( var c = 0; c < this.children.length; c++ ) {
    this.children[c].translateM();
  }
}

