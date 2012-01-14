DepthKit.key = {};

DepthKit.key.startCapturing = function () {
  // these are the keys we will be capturing
  // down is currently down
  // pressed is like 'just pressed' and is intended to last only till the end of a frame 
  DepthKit.key.down = {UP: false, DOWN: false, LEFT: false, RIGHT: false, X: false, C: false, SPACE: false};
  DepthKit.key.pressed = {UP: false, DOWN: false, LEFT: false, RIGHT: false, X: false, C: false, SPACE: false}; 
  window.addEventListener('keydown', DepthKit.key.onKD, false);
  window.addEventListener('keyup', DepthKit.key.onKU, false);
}

DepthKit.key.stopCapturing = function () { 
  window.removeEventListener('keydown', DepthKit.key.onKD, false);
  window.removeEventListener('keyup', DepthKit.key.onKU, false);
  delete DepthKit.key.down;
  delete DepthKit.key.pressed;
}

// Best to call this at the end of a frame if you intend to build your own prototype of Engine.js
DepthKit.key.unsetPressed = function () {
  DepthKit.key.pressed.UP = false;
  DepthKit.key.pressed.DOWN = false;
  DepthKit.key.pressed.LEFT = false;
  DepthKit.key.pressed.RIGHT = false;
  DepthKit.key.pressed.X = false;
  DepthKit.key.pressed.C = false;
  DepthKit.key.pressed.SPACE = false;
}

DepthKit.key.onKD = function (e) {
  switch (e.keyCode) {           
    case 38:
      if(!DepthKit.key.down.UP){
        DepthKit.key.pressed.UP = true;
        DepthKit.key.down.UP = true;
      }
      break;
    case 40:
      if(!DepthKit.key.down.DOWN){
        DepthKit.key.pressed.DOWN = true;
        DepthKit.key.down.DOWN = true;
      }
      break;
    case 37:
      if(!DepthKit.key.down.LEFT){
        DepthKit.key.pressed.LEFT = true;
        DepthKit.key.down.LEFT = true;
      }
      break;
    case 39:
      if(!DepthKit.key.down.RIGHT){
        DepthKit.key.pressed.RIGHT = true;
        DepthKit.key.down.RIGHT = true;
      }
      break;
    case 88:
      DepthKit.key.down.X = true;
      if(!DepthKit.key.down.X){
        DepthKit.key.pressed.X = true;
        DepthKit.key.down.X = true;
      }
      break;
    case 67:
      if(!DepthKit.key.down.C){
        DepthKit.key.pressed.C = true;
        DepthKit.key.down.C = true;
      }
      break;
    case 32:
      if(!DepthKit.key.down.SPACE){
        DepthKit.key.pressed.SPACE = true;
        DepthKit.key.down.SPACE = true;
      }
      break;
  }
}
  
DepthKit.key.onKU = function (e) {
  switch (e.keyCode) {           
    case 38:
      DepthKit.key.down.UP = false;
      break;
    case 40:
      DepthKit.key.down.DOWN = false;
      break;
    case 37:
      DepthKit.key.down.LEFT = false;
      break;
    case 39:
      DepthKit.key.down.RIGHT = false;
      break;
    case 88:
      DepthKit.key.down.X = false;
      break;
    case 67:
      DepthKit.key.down.C = false;
      break;
    case 32:
      DepthKit.key.down.SPACE = false;
      break;
  }
}

