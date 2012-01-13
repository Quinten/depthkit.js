DepthKit.Container =  function ( x, y ,z ) {
  DepthKit.SceneObject.call(this, x, y, z);
  this.children = [];
}

DepthKit.Container.prototype = new DepthKit.SceneObject();
DepthKit.Container.prototype.constructor = DepthKit.Container;

DepthKit.Container.prototype.rotateX = function ( degrees ) {
  var cosA = Math.cos(degrees * DK.rad);
  var sinA = Math.sin(degrees * DK.rad);
  for ( var c = 0; c < this.children.length; c++ ) {
    var newY = this.children[c].y * cosA - this.children[c].z * sinA;
    var newZ = this.children[c].z * cosA + this.children[c].y * sinA;
    this.children[c].y = newY;
    this.children[c].z = newZ;
    this.children[c].rotateX(degrees);
  }
  return this;
}

DepthKit.Container.prototype.rotateY = function ( degrees ) {
  var cosA = Math.cos(degrees * DK.rad);
  var sinA = Math.sin(degrees * DK.rad);
  for ( var c = 0; c < this.children.length; c++ ) {
    var newX = this.children[c].x * cosA - this.children[c].z * sinA;
    var newZ = this.children[c].z * cosA + this.children[c].x * sinA;
    this.children[c].x = newX;
    this.children[c].z = newZ;
    this.children[c].rotateY(degrees);
  }
  return this;
}

DepthKit.Container.prototype.rotateZ = function ( degrees ) {
  var cosA = Math.cos(degrees * DK.rad);
  var sinA = Math.sin(degrees * DK.rad);
  for ( var c = 0; c < this.children.length; c++ ) {
    var newX = this.children[c].x * cosA - this.children[c].y * sinA;
    var newY = this.children[c].y * cosA + this.children[c].x * sinA;
    this.children[c].x = newX;
    this.children[c].y = newY;
    this.children[c].rotateZ(degrees);
  }
  return this;
}

DepthKit.Container.prototype.spinX = function ( degrees ) {
  var cosA = Math.cos(degrees * DK.rad);
  var sinA = Math.sin(degrees * DK.rad);
  for ( var c = 0; c < this.children.length; c++ ) {
    var newY = this.children[c].y * cosA - this.children[c].z * sinA;
    var newZ = this.children[c].z * cosA + this.children[c].y * sinA;
    this.children[c].y = newY;
    this.children[c].z = newZ;
  }
  return this;
}

DepthKit.Container.prototype.spinY = function ( degrees ) {
  var cosA = Math.cos(degrees * DK.rad);
  var sinA = Math.sin(degrees * DK.rad);
  for ( var c = 0; c < this.children.length; c++ ) {
    var newX = this.children[c].x * cosA - this.children[c].z * sinA;
    var newZ = this.children[c].z * cosA + this.children[c].x * sinA;
    this.children[c].x = newX;
    this.children[c].z = newZ;
  }
  return this;
}

DepthKit.Container.prototype.spinZ = function ( degrees ) {
  var cosA = Math.cos(degrees * DK.rad);
  var sinA = Math.sin(degrees * DK.rad);
  for ( var c = 0; c < this.children.length; c++ ) {
    var newX = this.children[c].x * cosA - this.children[c].y * sinA;
    var newY = this.children[c].y * cosA + this.children[c].x * sinA;
    this.children[c].x = newX;
    this.children[c].y = newY;
  }
  return this;
}

DepthKit.Container.prototype.addChild = function ( child ) {
  if ( child.parent === this ) {
    return child;
  }
  if ( child.parent !== undefined ) {
    child.parent.removeChild(child);
  }
  this.children.push(child);
  child.parent = this;
  child.setScene(this.scene);
  return child;
}

DepthKit.Container.prototype.removeChildAt = function ( index ) {
  if ( index >= this.children.length ) {
    return;
  }
  // splice would be nice, but you'll loose the type of the child
  var child = this.children[index];
  while ( index < (this.children.length - 1) ) {
    this.children[index] = this.children[++index];
  }
  this.children.pop();
  child.parent = undefined;
  child.setScene(undefined);
  return child;
}

DepthKit.Container.prototype.removeChild = function ( child ) {
  for ( var c = 0; c < this.children.length; c++ ) {
    if ( this.children[c] === child ) {
      return this.removeChildAt(c);
    }
  }
}

DepthKit.Container.prototype.setScene = function ( scene ) {
  this.scene = scene;
  for ( var c = 0; c < this.children.length; c++ ) {
    this.children[c].setScene(scene);
  }
}

DepthKit.Container.prototype.initM = function () {
  this.mx = this.x;
  this.my = this.y;
  this.mz = this.z;
  for ( var c = 0; c < this.children.length; c++ ) {
    this.children[c].initM();
  } 
}

DepthKit.Container.prototype.rotateM = function () {
  this.rotationMX = (this.rotationX * DK.rad) + this.parent.rotationMX;
  this.rotationMY = (this.rotationY * DK.rad) + this.parent.rotationMY;
  this.rotationMZ = (this.rotationZ * DK.rad) + this.parent.rotationMZ;
  var cosA, sinA, c, newX, newY, newZ;
  if ( this.rotationMX ) {
    cosA = Math.cos(this.rotationMX);
    sinA = Math.sin(this.rotationMX);
    for ( c = 0; c < this.children.length; c++ ) {
      newY = this.children[c].my * cosA - this.children[c].mz * sinA;
      newZ = this.children[c].mz * cosA + this.children[c].my * sinA;
      this.children[c].my = newY;
      this.children[c].mz = newZ;
    }  
  }
  if ( this.rotationMY ) {
    cosA = Math.cos(this.rotationMY);
    sinA = Math.sin(this.rotationMY);
    for ( c = 0; c < this.children.length; c++ ) {
      newX = this.children[c].mx * cosA - this.children[c].mz * sinA;
      newZ = this.children[c].mz * cosA + this.children[c].mx * sinA;
      this.children[c].mx = newX;
      this.children[c].mz = newZ;
    }    
  }
  if ( this.rotationMZ ) {
    cosA = Math.cos(this.rotationMZ);
    sinA = Math.sin(this.rotationMZ);
    for ( c = 0; c < this.children.length; c++ ) {
      newX = this.children[c].mx * cosA - this.children[c].my * sinA;
      newY = this.children[c].my * cosA + this.children[c].mx * sinA;
      this.children[c].mx = newX;
      this.children[c].my = newY;
    }    
  }
  for ( c = 0; c < this.children.length; c++ ) {
    this.children[c].rotateM();
  }  
}

DepthKit.Container.prototype.scaleM = function () {
  
}

DepthKit.Container.prototype.translateM = function () {
  this.mx += this.parent.mx;
  this.my += this.parent.my;
  this.mz += this.parent.mz;
  for ( var c = 0; c < this.children.length; c++ ) {
    this.children[c].translateM();
  }
}

