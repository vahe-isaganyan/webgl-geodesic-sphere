// global variables are defined
let scene, camera, renderer, mesh;
let rotateLeft = false;
let rotateRight = false;
let rotateUp = false;
let rotateDown = false;

// using three.js library for the scene

function init() {

    scene = new THREE.Scene();

    // camera creation
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    //antialiased webgl renderer (added the antialias to reduce jaggies and make the image smoother)
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // array to store vertices
    let pointsArray = [];

    // initialize the tetrahedron vertices
    let va = new THREE.Vector3(0.0, 0.0, -1.0);
    let vb = new THREE.Vector3(0.0, 0.942809, 0.333333);
    let vc = new THREE.Vector3(-0.816497, -0.471405, 0.333333);
    let vd = new THREE.Vector3(0.816497, -0.471405, 0.333333);

    // recursively subdividing the tetrahedron
    function tetrahedron(a, b, c, d, n) {
        divideTriangle(a, b, c, n);
        divideTriangle(d, c, b, n);
        divideTriangle(a, d, b, n);
        divideTriangle(a, c, d, n);
    }

    // subdividetriangle
    function divideTriangle(a, b, c, count) {
        if (count > 0) {
            let ab = new THREE.Vector3().lerpVectors(a, b, 0.5).normalize();
            let ac = new THREE.Vector3().lerpVectors(a, c, 0.5).normalize();
            let bc = new THREE.Vector3().lerpVectors(b, c, 0.5).normalize();

            divideTriangle(a, ab, ac, count - 1);
            divideTriangle(ab, b, bc, count - 1);
            divideTriangle(bc, c, ac, count - 1);
            divideTriangle(ab, bc, ac, count - 1);
        } else {
            triangle(a, b, c);
        }
    }

    // add the vertices of a triangle to array
    function triangle(a, b, c) {
        pointsArray.push(a.x, a.y, a.z);
        pointsArray.push(b.x, b.y, b.z);
        pointsArray.push(c.x, c.y, c.z);
    }

    // start subdivision, create geometry, material, and mesh

    tetrahedron(va, vb, vc, vd, 4);

    let geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(pointsArray, 3));

    let material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });

    mesh = new THREE.Mesh(geometry, material);

    // it was too small so scaled it up
    mesh.scale.set(2, 2, 2);

    // add  mesh to  scene and render
    scene.add(mesh);

    function animate() {
        requestAnimationFrame(animate);

        //sphere rotation

        if (rotateLeft) {
            mesh.rotation.y -= 0.05;
        }
        if (rotateRight) {
            mesh.rotation.y += 0.05;
        }
        if (rotateUp) {
            mesh.rotation.x -= 0.05;
        }
        if (rotateDown) {
            mesh.rotation.x += 0.05;
        }

        renderer.render(scene, camera);
    }

    animate();
}

window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
});

// keyboard controls
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            rotateLeft = true;
            break;
        case 'ArrowRight':
            rotateRight = true;
            break;
        case 'ArrowUp':
            rotateUp = true;
            break;
        case 'ArrowDown':
            rotateDown = true;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            rotateLeft = false;
            break;
        case 'ArrowRight':
            rotateRight = false;
            break;
        case 'ArrowUp':
            rotateUp = false;
            break;
        case 'ArrowDown':
            rotateDown = false;
            break;
    }
});

init();
