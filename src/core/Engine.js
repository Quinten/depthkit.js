DepthKit.Engine = function () {
  this.scene = new DepthKit.Scene();
  this.camera = new DepthKit.Camera();
  this.light = new DepthKit.Light();
  this.viewport = new DepthKit.Viewport();
  this.renderer = new DepthKit.Renderer(this.viewport, this.scene, this.camera);
  var frameID = 0;
  this.time = DepthKit.getTimer();
  this.elapsed = DepthKit.getTimer() - this.time;
  this.paintMode = false;
}

DepthKit.Engine.prototype.step = function ( sceneObject ) {
  if ( sceneObject.children !== undefined ) {
    for ( var c = 0; c < sceneObject.children.length; c++ ) {
      this.step(sceneObject.children[c]);
    }
  }
  if ( sceneObject.step !== undefined && typeof sceneObject.step === 'function') {
    sceneObject.step();
  }
}

DepthKit.Engine.prototype.start = function () {
  this.time = DepthKit.getTimer();
  this.elapsed = DepthKit.getTimer() - this.time;
  var self = this;
  (function onF () {
    // update timers
    frameID = window.requestAnimationFrame(onF, self.viewport.canvas);
    self.elapsed = DepthKit.getTimer() - self.time;
    self.time = DepthKit.getTimer();
    // clear canvas or not
    if (!self.paintMode) {
      self.viewport.context.clearRect(0, 0, self.viewport.canvas.width, self.viewport.canvas.height);
    }
    // animate things
    self.step(self.scene);
    self.step(self.light);
    self.step(self.camera);
    // translate everything and draw it
    self.renderer.render();
    // unset pressed keys
    DepthKit.key.unsetPressed();    
  }());
}

DepthKit.Engine.prototype.stop = function () {
  window.cancelRequestAnimationFrame(frameID);
}

