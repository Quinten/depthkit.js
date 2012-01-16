DepthKit.Fog = function ( color, depth ) {
  this.depth = depth || 3000;
  this.color = color || "#ffffff"; 
  var nColor = window.parseInt(this.color.slice(1), 16),
      red = nColor >> 16,
      green = nColor >> 8 & 0xff,
      blue = nColor & 0xff;
  this.aColor = "rgba(" + red + ", " + green + ", " + blue + ", 0.20)";
  this.lastZ = this.depth;
}

DepthKit.Fog.prototype.init = function ( viewport ) {
  viewport.context.save();
  viewport.context.fillStyle = this.color;
  viewport.context.fillRect(0,0,viewport.canvas.width, viewport.canvas.height);
  viewport.context.restore();
}

DepthKit.Fog.prototype.update = function ( z, viewport ) {
  viewport.context.save();
  viewport.context.fillStyle = this.aColor;
  for ( this.lastZ = this.lastZ; (this.lastZ > z && this.lastZ > 0); this.lastZ -= this.depth/20 ) {
    viewport.context.fillRect(0,0,viewport.canvas.width, viewport.canvas.height);
  }
  viewport.context.restore();
}

DepthKit.Fog.prototype.finish = function ( viewport ) {
  this.update(0, viewport);
  this.lastZ = this.depth;
}

