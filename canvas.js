var HEIGHT = $(document).height()*0.9, WIDTH = $(document).width();
$("#canvas").height(HEIGHT).width(WIDTH);
var VIEW_ANGLE = 45,
  ASPECT = WIDTH / HEIGHT,
  NEAR = 0.1,
  FAR = 10000;

// get the DOM element to attach to
// - assume we've got jQuery to hand
var $canvas = $('#canvas');

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer();
var camera =
  new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);

var scene = new THREE.Scene();

// add the camera to the scene
scene.add(camera);

// start the renderer
renderer.setSize(WIDTH, HEIGHT);
$canvas.append(renderer.domElement);
// attach the render-supplied DOM element
var geometry = new THREE.BoxGeometry( 8, 1, 2 );
var material = new THREE.MeshPhongMaterial( { color: 0x80ff80 } );
var solid0 = new THREE.Mesh( geometry, material );
var solid1 = new THREE.Mesh( geometry, material );
scene.add( solid0, solid1 );
solid0.rotation.y=0.5;
solid1.rotation.y=-0.5;
// solid0.rotation.x = 0.5;
// solid0.rotation.y = 0.5;
// solid1.rotation.x = 0.5;
// solid1.rotation.y = 0.5;
solid0.position.x = -4;
solid1.position.x = 4;


camera.position.z = 10;

// create a point light
var pointLight0 =
  new THREE.PointLight(0xFFFFFF);
var pointLight1 = pointLight0.clone();
// set its position
pointLight0.position.x = 12;
pointLight0.position.y = 12;
pointLight0.position.z = 4;
pointLight1.position.x = -12;
pointLight1.position.y = -12;
pointLight1.position.z = -4;

// add to the scene
scene.add(pointLight0, pointLight1);
function render() {
	requestAnimationFrame( render );
	solid0.position.y = volume[0] -4;
	solid1.position.y = volume[1] -4;
	renderer.render( scene, camera );
}
render();