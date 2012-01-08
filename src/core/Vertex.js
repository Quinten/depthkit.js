DepthKit.Vertex = function ( x, y, z ) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  this.px = 0; // x in 2d
  this.py = 0; // y in 2d
  this.pz = 0; // z on axis of camera
  this.d = 0; // distance to the camera
  this.mx = x; // used by the renderer to create a global 'shadow' of the vertex
  this.my = y;
  this.mz = z;
}

