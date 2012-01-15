DepthKit.mouse = {};

DepthKit.mouse.attachTo = function (viewport) {
  var mouse = {x: 0, y: 0, event: null};
  viewport.mousemove = function (e) {
    var x, y;
    if (e.pageX || e.pageY) {
      x = e.pageX;
      y = e.pageY;
    } else {
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= viewport.canvas.offsetLeft;
    y -= viewport.canvas.offsetTop;
    mouse.x = x;
    mouse.y = y;
    mouse.event = e;
  };
  viewport.canvas.addEventListener('mousemove', viewport.mousemove, false);
  viewport.mouse = mouse;
}

DepthKit.mouse.detachFrom = function (viewport) {
  viewport.canvas.removeEventListener('mousemove', viewport.mousemove, false);
  delete viewport.mouse;
  delete viewport.mousemove;
}

