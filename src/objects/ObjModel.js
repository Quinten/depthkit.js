DepthKit.ObjModel = function ( ) {
  DepthKit.Mesh.call(this, 0, 0, 0);
  this.scale = 1;
}

DepthKit.ObjModel.prototype = new DepthKit.Mesh();
DepthKit.ObjModel.prototype.constructor = DepthKit.ObjModel;
DepthKit.ObjModel.prototype.upper = DepthKit.Mesh.prototype;
DepthKit.ObjModel.prototype.type = "ObjModel";

DepthKit.ObjModel.prototype.parseFile = function ( file, scale ) {
  if ( file !== undefined ) {
    this.scale = scale || 100;
    var self = this;
    var objFile = new XMLHttpRequest();
    objFile.open("GET", file, true);
    objFile.onreadystatechange = function () {
      if (objFile.readyState === 4 && objFile.status === 200) {
        var content = objFile.responseText;
        var lines = content.split("\n");
        for ( var i = 0; i < lines.length; i++) {
          var symbols = lines[i].split(" ");
          if (symbols[0] === "v") {
            self.addVertex(symbols[1] * self.scale, symbols[2] * self.scale, symbols[3] * self.scale);
          } else if (symbols[0] === "f") {
            self.addFace(self.vertices[(symbols[3].split("/")[0] - 1)], self.vertices[(symbols[2].split("/")[0] - 1)], self.vertices[(symbols[1].split("/")[0] - 1)]);
          }
        }
        self.onParsed();
      }
    }
    objFile.send(null);
  } 
}

DepthKit.ObjModel.prototype.onParsed = function () { }

