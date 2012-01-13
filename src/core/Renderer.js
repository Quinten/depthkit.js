DepthKit.Renderer = function ( viewport, scene, camera ) {
  this.scene = scene || new DeptKit.Scene();
  this.camera = camera || new DepthKit.Camera();
  this.viewport = viewport || new DepthKit.Viewport();
  this.fog = undefined;
}

DepthKit.Renderer.prototype.render = function () {
  this.scene.initM();
  this.scene.rotateM();
  //this.scene.scaleM();
  this.scene.translateM();
  var cosX = Math.cos(this.camera.rotationX * DK.rad);
  var sinX = Math.sin(this.camera.rotationX * DK.rad);
  var cosY = Math.cos(this.camera.rotationY * DK.rad);
  var sinY = Math.sin(this.camera.rotationY * DK.rad);
  var cosZ = Math.cos(this.camera.rotationZ * DK.rad);
  var sinZ = Math.sin(this.camera.rotationZ * DK.rad);
  for ( var m = 0; m < this.scene.meshes.length; m++ ) {
    this.scene.meshes[m].d = 0xffffff;
    for ( var v = 0; v < this.scene.meshes[m].vertices.length; v++ ) {
      var oldX = this.scene.meshes[m].vertices[v].mx - this.camera.x;
      var oldY = this.scene.meshes[m].vertices[v].my - this.camera.y;
      var oldZ = this.scene.meshes[m].vertices[v].mz - this.camera.z;
      var partA = sinZ * oldY + cosZ * oldX;
      var partB = cosY * oldZ + sinY * partA;
      var partC = cosZ * oldY - sinZ * oldX;
      var newX = cosY * partA - sinY * oldZ;
      var newY = sinX * partB + cosX * partC;
      var newZ = cosX * partB - sinX * partC;
      this.scene.meshes[m].vertices[v].px = this.viewport.vpX + (newX - this.camera.ex) * (this.camera.ez / newZ);
      this.scene.meshes[m].vertices[v].py = this.viewport.vpY + (newY - this.camera.ey) * (this.camera.ez / newZ);
      this.scene.meshes[m].vertices[v].pz = newZ;
      this.scene.meshes[m].vertices[v].d = Math.sqrt(oldX * oldX + oldY * oldY + oldZ * oldZ);
      this.scene.meshes[m].d = Math.min(this.scene.meshes[m].d, this.scene.meshes[m].vertices[v].d);
    }
  }
  this.scene.meshes.sort(DK.meshSort);
  for ( m = 0; m < this.scene.meshes.length; m++ ) {
    this.scene.meshes[m].draw(this.viewport.context);
    if ( this.fog !== undefined ) {
      this.fog.update(this.scene.meshes[m].d, this.viewport);
    }
  }
  if ( this.fog !== undefined ) {
    this.fog.finish(this.viewport);
  }
}
 
