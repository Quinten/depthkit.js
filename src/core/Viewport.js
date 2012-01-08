DepthKit.Viewport = function () {
  this.canvas = document.createElement('canvas');
  this.context = this.canvas.getContext('2d');
  this.canvas.width = 480;
  this.canvas.height = 320;
  this.vpX = 240;
  this.vpY = 160;
}

DepthKit.Viewport.prototype.fillPage = function ( zIndex ) {
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.vpX = this.canvas.width / 2;
  this.vpY = this.canvas.height / 2;
  this.canvas.style.position = "absolute";
  this.canvas.style.zIndex = zIndex || "auto";
  document.body.appendChild(this.canvas);
}

DepthKit.Viewport.prototype.fillElement = function ( id, zIndex ) {
  var element = document.getElementById(id);
  this.canvas.width = Number((String(element.style.width)).replace('px', ''));
  this.canvas.height = Number((String(element.style.height)).replace('px', ''));;
  this.vpX = this.canvas.width / 2;
  this.vpY = this.canvas.height / 2;
  this.canvas.style.position = "relative";
  this.canvas.style.zIndex = zIndex || "auto";
  element.appendChild(this.canvas);
}

DepthKit.Viewport.prototype.setBackgroundcolor = function ( color ) {
  this.canvas.style.background = color;
}

