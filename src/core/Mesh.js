DepthKit.Mesh = function ( x, y, z ) {
  DepthKit.SceneObject.call(this, x, y, z);
  this.d = 0;
  this.vertices = [];
  this.edges = [];
  this.faces = [];
  this.strokeColor = "#000000";
  this.strokeWidth = 1;
}

DepthKit.Mesh.prototype = new DepthKit.SceneObject();
DepthKit.Mesh.prototype.constructor = DepthKit.Mesh;

DepthKit.Mesh.prototype.addVertex = function ( x, y, z ) {
  this.vertices.push(new DepthKit.Vertex(x, y, z));
  return this;
}

DepthKit.Mesh.prototype.addEdge = function ( u, v ) {
  this.edges.push(new DepthKit.Edge((u || this.vertices[this.vertices.length - 2] || new DepthKit.Vertex()), (v || this.vertices[this.vertices.length - 1] || new DepthKit.Vertex())));
  return this;
}

DepthKit.Mesh.prototype.addFace = function ( a, b, c, color ) {
  this.faces.push(new DepthKit.Face((a || this.vertices[this.vertices.length - 3] || new DepthKit.Vertex()), (b || this.vertices[this.vertices.length - 2] || new DepthKit.Vertex()), (c || this.vertices[this.vertices.length - 1] || new DepthKit.Vertex()), color));
  return this;
}

DepthKit.Mesh.prototype.applyFillcolor = function ( color ) {
  for ( var f = 0; f < this.faces.length; f++ ) {
    this.faces[f].color = color;
  }
  return this;
}

DepthKit.Mesh.prototype.applyLight = function ( light ) {
  for ( var f = 0; f < this.faces.length; f++ ) {
    this.faces[f].light = light;
  }
  return this;
}

DepthKit.Mesh.prototype.rotateX = function ( degrees ) {
  var cosA = Math.cos(degrees * DK.rad);
  var sinA = Math.sin(degrees * DK.rad);
  for ( var v = 0; v < this.vertices.length; v++ ) {
    var newY = this.vertices[v].y * cosA - this.vertices[v].z * sinA;
    var newZ = this.vertices[v].z * cosA + this.vertices[v].y * sinA;
    this.vertices[v].y = newY;
    this.vertices[v].z = newZ;
  }
  return this;
}

DepthKit.Mesh.prototype.rotateY = function ( degrees ) {
  var cosA = Math.cos(degrees * DK.rad);
  var sinA = Math.sin(degrees * DK.rad);
  for ( var v = 0; v < this.vertices.length; v++ ) {
    var newX = this.vertices[v].x * cosA - this.vertices[v].z * sinA;
    var newZ = this.vertices[v].z * cosA + this.vertices[v].x * sinA;
    this.vertices[v].x = newX;
    this.vertices[v].z = newZ;
  }
  return this;
}

DepthKit.Mesh.prototype.rotateZ = function ( degrees ) {
  var cosA = Math.cos(degrees * DK.rad);
  var sinA = Math.sin(degrees * DK.rad);
  for ( var v = 0; v < this.vertices.length; v++ ) {
    var newX = this.vertices[v].x * cosA - this.vertices[v].y * sinA;
    var newY = this.vertices[v].y * cosA + this.vertices[v].x * sinA;
    this.vertices[v].x = newX;
    this.vertices[v].y = newY;
  }
  return this;
}

DepthKit.Mesh.prototype.setScene = function ( scene ) {
  if ( this.scene === scene ) {
    return;
  }
  if ( this.scene !== undefined ) {
    for ( var m = 0; m < this.scene.meshes.length; m++ ) {
      if ( this.scene.meshes[m] === this ) {
        this.scene.meshes.splice(m, 1);
        break;
      }
    }
  }
  if ( scene !== undefined ) {
    scene.meshes.push(this);
  }
  this.scene = scene;
}

DepthKit.meshSort = function ( a, b ) {
  return (b.d - a.d);
}

DepthKit.Mesh.prototype.draw = function ( context ) {
  context.save();
  // draw faces
  context.lineWidth = 1;
  this.faces.sort(DK.faceSort);
  for ( var f = 0; f < this.faces.length; f++ ) {
    if(!this.faces[f].isBackface() && !this.faces[f].isBehindCamera()){
      context.beginPath();
      context.moveTo(this.faces[f].a.px, this.faces[f].a.py);
      context.lineTo(this.faces[f].b.px, this.faces[f].b.py);
      context.lineTo(this.faces[f].c.px, this.faces[f].c.py);
      context.lineTo(this.faces[f].a.px, this.faces[f].a.py);
      context.closePath();
      context.fillStyle = context.strokeStyle = this.faces[f].getAdjustedColor();
      context.fill();
      context.stroke();
    }
  }
  // draw edges
  context.strokeStyle = this.strokeColor;
  context.lineWidth = this.strokeWidth;
  context.beginPath();
  for ( var e = 0; e < this.edges.length; e++ ) {
    if(!this.edges[e].isBehindCamera()){
      context.moveTo(this.edges[e].u.px, this.edges[e].u.py);
      context.lineTo(this.edges[e].v.px, this.edges[e].v.py);
    }
  }
  context.closePath();
  context.stroke();
  context.restore(); 
}

DepthKit.Mesh.prototype.initM = function () {
  this.mx = this.x;
  this.my = this.y;
  this.mz = this.z;
  for ( var v = 0; v < this.vertices.length; v++ ) {
    this.vertices[v].mx = this.vertices[v].x;
    this.vertices[v].my = this.vertices[v].y;
    this.vertices[v].mz = this.vertices[v].z;
  } 
}

DepthKit.Mesh.prototype.rotateM = function () {
  this.rotationMX = (this.rotationX * DK.rad) + this.parent.rotationMX;
  this.rotationMY = (this.rotationY * DK.rad) + this.parent.rotationMY;
  this.rotationMZ = (this.rotationZ * DK.rad) + this.parent.rotationMZ;
  var cosA, sinA, v, newX, newY, newZ;
  if ( this.rotationMX ) {
    cosA = Math.cos(this.rotationMX);
    sinA = Math.sin(this.rotationMX);
    for ( v = 0; v < this.vertices.length; v++ ) {
      newY = this.vertices[v].my * cosA - this.vertices[v].mz * sinA;
      newZ = this.vertices[v].mz * cosA + this.vertices[v].my * sinA;
      this.vertices[v].my = newY;
      this.vertices[v].mz = newZ;
    }  
  }
  if ( this.rotationMY ) {
    cosA = Math.cos(this.rotationMY);
    sinA = Math.sin(this.rotationMY);
    for ( v = 0; v < this.vertices.length; v++ ) {
      newX = this.vertices[v].mx * cosA - this.vertices[v].mz * sinA;
      newZ = this.vertices[v].mz * cosA + this.vertices[v].mx * sinA;
      this.vertices[v].mx = newX;
      this.vertices[v].mz = newZ;
    }    
  }
  if ( this.rotationMZ ) {
    cosA = Math.cos(this.rotationMZ);
    sinA = Math.sin(this.rotationMZ);
    for ( v = 0; v < this.vertices.length; v++ ) {
      newX = this.vertices[v].mx * cosA - this.vertices[v].my * sinA;
      newY = this.vertices[v].my * cosA + this.vertices[v].mx * sinA;
      this.vertices[v].mx = newX;
      this.vertices[v].my = newY;
    }    
  } 
}

DepthKit.Mesh.prototype.translateM = function () {
  this.mx += this.parent.mx;
  this.my += this.parent.my;
  this.mz += this.parent.mz;
  for ( var v = 0; v < this.vertices.length; v++ ) {
    this.vertices[v].mx += this.mx;
    this.vertices[v].my += this.my;
    this.vertices[v].mz += this.mz;
  }
}

