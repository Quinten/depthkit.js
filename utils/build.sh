#!/bin/sh

files=( '../src/DepthKit.js' '../src/core/Vertex.js' '../src/core/Edge.js' '../src/core/Face.js' '../src/core/SceneObject.js' '../src/core/Mesh.js' '../src/core/Container.js' '../src/core/Scene.js' '../src/core/Camera.js' '../src/core/Light.js' '../src/core/Viewport.js' '../src/core/Fog.js' '../src/core/Renderer.js' '../src/core/Timers.js' '../src/ui/Key.js' '../src/ui/Mouse.js' '../src/core/Engine.js' '../src/objects/Cube.js' '../src/objects/ObjModel.js' )

echo "" > ../builds/depthkit.js

for file in ${files[@]}
do
cat $file >> ../builds/depthkit.js
done

java -jar ./compiler/compiler.jar --js ../builds/depthkit.js --js_output_file ../builds/temp.js

echo '/* https://github.com/Quinten/depthkit.js */' > ../builds/depthkit.min.js

cat ../builds/temp.js >> ../builds/depthkit.min.js

rm ../builds/temp.js
