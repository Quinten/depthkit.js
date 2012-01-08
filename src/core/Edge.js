DepthKit.Edge = function ( u, v ) {
  this.u = u || new DepthKit.Vertex();
  this.v = v || new DepthKit.Vertex();
}

DepthKit.Edge.prototype.isBehindCamera = function () {
  return (this.u.pz < 0 || this.v.pz < 0);
}

