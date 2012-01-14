DepthKit.mouse = {};

DepthKit.mouse.attachTo = function (viewport) {
  var mouse = {x: 0, y: 0, event: null},
      body_scrollLeft = document.body.scrollLeft,
      element_scrollLeft = document.documentElement.scrollLeft,
      body_scrollTop = document.body.scrollTop,
      element_scrollTop = document.documentElement.scrollTop,
      offsetLeft = viewport.canvas.offsetLeft,
      offsetTop = viewport.canvas.offsetTop;
  
  viewport.canvas.addEventListener('mousemove', function (e) {
    var x, y;
    
    if (e.pageX || e.pageY) {
      x = e.pageX;
      y = e.pageY;
    } else {
      x = e.clientX + body_scrollLeft + element_scrollLeft;
      y = e.clientY + body_scrollTop + element_scrollTop;
    }
    x -= offsetLeft;
    y -= offsetTop;
    
    mouse.x = x;
    mouse.y = y;
    mouse.event = e;
  }, false);
  
  viewport.mouse = mouse;
}

