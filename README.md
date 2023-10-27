# WebGL Geodesic Sphere

This project is a WebGL application created using the three.js library. It starts with a tetrahedron and applies recursive subdivision to transform it into a geodesic sphere.

## How it Works

- The initial shape is a tetrahedron defined by vertices 'va', 'vb', 'vc', and 'vd'.
- The 'tetrahedron' function takes these vertices and initiates the recursive subdivision process.

### Recursive Subdivision

- The 'divideTriangle' function recursively subdivides the initial tetrahedron into smaller triangles.
- For each triangle face, midpoints are calculated ('ab', 'ac', 'bc').
- These midpoints are then used to create four smaller triangles.
- The recursion continues, refining the shape.

### Geodesic Sphere

- After multiple levels of recursive subdivision, the final shape closely resembles a geodesic sphere.
- The 'normalize' function ensures that each new vertex is adjusted to lie on the unit sphere.

## Controls

- Use the arrow keys to rotate the sphere.
