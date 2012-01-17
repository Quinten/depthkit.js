DepthKit.Cube = function () {
  DepthKit.Mesh.call(this, 0, 0, 0);
  var sizeX, sizeY, sizeZ;
  switch (arguments.length) {
    case 1:
      sizeX = sizeY = sizeZ = arguments[0] / 2;
      break;
    case 2:
      sizeX = sizeZ = arguments[0] / 2;
      sizeY = arguments[1] / 2;
      break;
    case 3:
      sizeX = arguments[0] / 2;
      sizeY = arguments[1] / 2;
      sizeZ = arguments[2] / 2;
      break;
    default:
      sizeX = sizeY = sizeZ = 50;
  }
  this.addVertex(-sizeX,  sizeY, -sizeZ); //0 // front left bottom
  this.addVertex( sizeX,  sizeY, -sizeZ); //1 // front right bottom
  this.addVertex( sizeX, -sizeY, -sizeZ); //2 // front right top
  this.addVertex(-sizeX, -sizeY, -sizeZ); //3 // front left top
  this.addVertex(-sizeX,  sizeY,  sizeZ); //4 // back left bottom
  this.addVertex( sizeX,  sizeY,  sizeZ); //5 // back right bottom
  this.addVertex( sizeX, -sizeY,  sizeZ); //6 // back right top
  this.addVertex(-sizeX, -sizeY,  sizeZ); //7 // back left top
  this.addFace(this.vertices[1], this.vertices[5], this.vertices[4], "#ff0000"); // bottom
  this.addFace(this.vertices[0], this.vertices[1], this.vertices[4], "#ff0000");
  this.addFace(this.vertices[6], this.vertices[2], this.vertices[3], "#00ff00"); // top
  this.addFace(this.vertices[7], this.vertices[6], this.vertices[3], "#00ff00");
  this.addFace(this.vertices[3], this.vertices[0], this.vertices[4], "#0000ff"); // left
  this.addFace(this.vertices[7], this.vertices[3], this.vertices[4], "#0000ff");
  this.addFace(this.vertices[2], this.vertices[5], this.vertices[1], "#ffff00"); // right
  this.addFace(this.vertices[6], this.vertices[5], this.vertices[2], "#ffff00");
  this.addFace(this.vertices[6], this.vertices[4], this.vertices[5], "#00ffff"); // back
  this.addFace(this.vertices[6], this.vertices[7], this.vertices[4], "#00ffff");
  this.addFace(this.vertices[2], this.vertices[1], this.vertices[0], "#ff00ff"); // front
  this.addFace(this.vertices[3], this.vertices[2], this.vertices[0], "#ff00ff");
}

DepthKit.Cube.prototype = new DepthKit.Mesh();
DepthKit.Cube.prototype.constructor = DepthKit.Cube;

