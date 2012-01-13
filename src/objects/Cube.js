DepthKit.Cube = function ( size ) {
  DepthKit.Mesh.call(this, 0, 0, 0);
  this.size = size || 100;
  this.halfSize = this.size/2;
  this.addVertex(-this.halfSize,  this.halfSize, -this.halfSize);//0 // front left top
  this.addVertex( this.halfSize,  this.halfSize, -this.halfSize);//1 // front right top
  this.addVertex( this.halfSize, -this.halfSize, -this.halfSize);//2 // front right bottom
  this.addVertex(-this.halfSize, -this.halfSize, -this.halfSize);//3 // front left bottom
  this.addVertex(-this.halfSize,  this.halfSize,  this.halfSize);//4 // back left top
  this.addVertex( this.halfSize,  this.halfSize,  this.halfSize);//5 // back right top
  this.addVertex( this.halfSize, -this.halfSize,  this.halfSize);//6 // back right bottom
  this.addVertex(-this.halfSize, -this.halfSize,  this.halfSize);//7 // back left bottom
  // top
  this.addFace(this.vertices[1], this.vertices[5], this.vertices[4], "#ff0000");
  this.addFace(this.vertices[0], this.vertices[1], this.vertices[4], "#ff0000");
  // bottom
  this.addFace(this.vertices[6], this.vertices[2], this.vertices[3], "#00ff00");
  this.addFace(this.vertices[7], this.vertices[6], this.vertices[3], "#00ff00");
  // left
  this.addFace(this.vertices[3], this.vertices[0], this.vertices[4], "#0000ff");
  this.addFace(this.vertices[7], this.vertices[3], this.vertices[4], "#0000ff");
  // right
  this.addFace(this.vertices[2], this.vertices[5], this.vertices[1], "#ffff00");
  this.addFace(this.vertices[6], this.vertices[5], this.vertices[2], "#ffff00");
  // back
  this.addFace(this.vertices[6], this.vertices[4], this.vertices[5], "#00ffff");
  this.addFace(this.vertices[6], this.vertices[7], this.vertices[4], "#00ffff");
  // front
  this.addFace(this.vertices[2], this.vertices[1], this.vertices[0], "#ff00ff");
  this.addFace(this.vertices[3], this.vertices[2], this.vertices[0], "#ff00ff");
}

DepthKit.Cube.prototype = new DepthKit.Mesh();
DepthKit.Cube.prototype.constructor = DepthKit.Cube;

DepthKit.Cube.prototype.draw = function ( context ) {
 this.faces.sort(DK.faceSort);
 context.save();
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
 context.restore();
}

