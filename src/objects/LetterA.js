DepthKit.LetterA = function ( ) {
  DepthKit.Mesh.call(this, 0, 0, 0);
  //first set
  this.addVertex( -50, -250, -50);
  this.addVertex(  50, -250, -50);
  this.addVertex( 200,  250, -50);
  this.addVertex( 100,  250, -50);
  this.addVertex(  50,  100, -50);
  this.addVertex( -50,  100, -50);
  this.addVertex(-100,  250, -50);
  this.addVertex(-200,  250, -50);
  this.addVertex(   0, -150, -50);
  this.addVertex(  50,    0, -50);
  this.addVertex( -50,    0, -50);
  //second set
  this.addVertex( -50, -250,  50);
  this.addVertex(  50, -250,  50);
  this.addVertex( 200,  250,  50);
  this.addVertex( 100,  250,  50);
  this.addVertex(  50,  100,  50);
  this.addVertex( -50,  100,  50);
  this.addVertex(-100,  250,  50);
  this.addVertex(-200,  250,  50);
  this.addVertex(   0, -150,  50);
  this.addVertex(  50,    0,  50);
  this.addVertex( -50,    0,  50);
  
  this.addFace(this.vertices[0],  this.vertices[1],  this.vertices[8],  "#6666cc");
  this.addFace(this.vertices[1],  this.vertices[9],  this.vertices[8],  "#6666cc");
  this.addFace(this.vertices[1],  this.vertices[2],  this.vertices[9],  "#6666cc");
  this.addFace(this.vertices[2],  this.vertices[4],  this.vertices[9],  "#6666cc");
  this.addFace(this.vertices[2],  this.vertices[3],  this.vertices[4],  "#6666cc");
  this.addFace(this.vertices[4],  this.vertices[5],  this.vertices[9],  "#6666cc");
  this.addFace(this.vertices[9],  this.vertices[5],  this.vertices[10], "#6666cc");
  this.addFace(this.vertices[5],  this.vertices[6],  this.vertices[7],  "#6666cc");
  this.addFace(this.vertices[5],  this.vertices[7],  this.vertices[10], "#6666cc");
  this.addFace(this.vertices[0],  this.vertices[10], this.vertices[7],  "#6666cc");
  this.addFace(this.vertices[0],  this.vertices[8],  this.vertices[10], "#6666cc");
  
  this.addFace(this.vertices[11], this.vertices[19], this.vertices[12], "#cc6666");
  this.addFace(this.vertices[12], this.vertices[19], this.vertices[20], "#cc6666");
  this.addFace(this.vertices[12], this.vertices[20], this.vertices[13], "#cc6666");
  this.addFace(this.vertices[13], this.vertices[20], this.vertices[15], "#cc6666");
  this.addFace(this.vertices[13], this.vertices[15], this.vertices[14], "#cc6666");
  this.addFace(this.vertices[15], this.vertices[20], this.vertices[16], "#cc6666");
  this.addFace(this.vertices[20], this.vertices[21], this.vertices[16], "#cc6666");
  this.addFace(this.vertices[16], this.vertices[18], this.vertices[17], "#cc6666");
  this.addFace(this.vertices[16], this.vertices[21], this.vertices[18], "#cc6666");
  this.addFace(this.vertices[11], this.vertices[18], this.vertices[21], "#cc6666");
  this.addFace(this.vertices[11], this.vertices[21], this.vertices[19], "#cc6666");
  
  this.addFace(this.vertices[0],  this.vertices[11], this.vertices[1],  "#cccc66");
  this.addFace(this.vertices[11], this.vertices[12], this.vertices[1],  "#cccc66");
  this.addFace(this.vertices[1],  this.vertices[12], this.vertices[2],  "#cccc66");
  this.addFace(this.vertices[12], this.vertices[13], this.vertices[2],  "#cccc66");
  this.addFace(this.vertices[3],  this.vertices[2],  this.vertices[14], "#cccc66");
  this.addFace(this.vertices[2],  this.vertices[13], this.vertices[14], "#cccc66");
  this.addFace(this.vertices[4],  this.vertices[3],  this.vertices[15], "#cccc66");
  this.addFace(this.vertices[3],  this.vertices[14], this.vertices[15], "#cccc66");
  this.addFace(this.vertices[5],  this.vertices[4],  this.vertices[16], "#cccc66");
  this.addFace(this.vertices[4],  this.vertices[15], this.vertices[16], "#cccc66");
  this.addFace(this.vertices[6],  this.vertices[5],  this.vertices[17], "#cccc66");
  this.addFace(this.vertices[5],  this.vertices[16], this.vertices[17], "#cccc66");
  this.addFace(this.vertices[7],  this.vertices[6],  this.vertices[18], "#cccc66");
  this.addFace(this.vertices[6],  this.vertices[17], this.vertices[18], "#cccc66");
  this.addFace(this.vertices[0],  this.vertices[7],  this.vertices[11], "#cccc66");
  this.addFace(this.vertices[7],  this.vertices[18], this.vertices[11], "#cccc66");
  this.addFace(this.vertices[8],  this.vertices[9],  this.vertices[19], "#cccc66");
  this.addFace(this.vertices[9],  this.vertices[20], this.vertices[19], "#cccc66");
  this.addFace(this.vertices[9],  this.vertices[10], this.vertices[20], "#cccc66");
  this.addFace(this.vertices[10], this.vertices[21], this.vertices[20], "#cccc66");
  this.addFace(this.vertices[10], this.vertices[8],  this.vertices[21], "#cccc66");
  this.addFace(this.vertices[8],  this.vertices[19], this.vertices[21], "#cccc66");
}

DepthKit.LetterA.prototype = new DepthKit.Mesh();
DepthKit.LetterA.prototype.constructor = DepthKit.LetterA;
DepthKit.LetterA.prototype.upper = DepthKit.Mesh.prototype;
DepthKit.LetterA.prototype.type = "LetterA";

