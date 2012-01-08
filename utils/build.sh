#!/bin/sh

files=( '../src/DepthKit.js' '../src/core/Vertex.js' '../src/core/Edge.js' '../src/core/Face.js' '../src/core/SceneObject.js' '../src/core/Mesh.js' '../src/core/Container.js' '../src/core/Scene.js' '../src/core/Camera.js' '../src/core/Light.js' '../src/core/Viewport.js' '../src/core/Renderer.js' '../src/core/Timers.js' '../src/ui/Key.js' '../src/core/Engine.js' '../src/objects/Cube.js' )

echo "" > ../builds/depthkit.js

for file in ${files[@]}
do
cat $file >> ../builds/depthkit.js
done

java -jar ./compiler/compiler.jar --js ../builds/depthkit.js --js_output_file ../builds/depthkit.min.js
