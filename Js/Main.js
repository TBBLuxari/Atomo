const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//------------------------------------------------------------------------------------------------------
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
//------------------------------------------------------------------------------------------------------
const Orbit = new THREE.OrbitControls(camera,renderer.domElement);
//------------------------------------------------------------------------------------------------------
const geometry = new THREE.SphereGeometry( 0.6, 50, 50);
const material = new THREE.MeshPhongMaterial( { color: 0xa0e0fc } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
camera.position.z = 5;
//----------------------------------------------------------------------------
const params = { bloomStrength: 2,bloomThreshold: 0,bloomRadius: 0,cambio_mat:0.1,Luz_global:0.1,velocidad:0.05};
//----------------------------------------------------------------------------
const renderScene = new THREE.RenderPass( scene, camera );
//----------------------------------------------------------------------------
const bloomPass = new THREE.UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;
//----------------------------------------------------------------------------
composer = new THREE.EffectComposer( renderer );
composer.addPass( renderScene );
composer.addPass( bloomPass );

//-------------------------------------------------------------------------------

let x =0;
let t1=0;
let n1=0;
//let i1=0.1;
//-------------------------------------------
/*Colores 
Rojito = 	FA4221
Naranja = 	FA8E21
Amarillo = 	FADC21
Verde = 	5FFA21
Turquesa = 	21FAC2
Azul =	 	2184FA
Morado = 	6637D3
Rodaso = 	F02EE4
Rosadoso = 	F81F95
Vino = 		BB0707
*/

const colores=[
new THREE.Color( 0xFA4221 ),
new THREE.Color( 0xFA8E21 ),
new THREE.Color( 0xFADC21 ),
new THREE.Color( 0x5FFA21 ),
new THREE.Color( 0x21FAC2 ),
new THREE.Color( 0x2184FA ),
new THREE.Color( 0x6637D3 ),
new THREE.Color( 0xF02EE4 ),
new THREE.Color( 0xF81F95 ),
new THREE.Color( 0xBB0707 )]
//--------------------------------------------------------------
const l1 = new THREE.AmbientLight( 0xffffff,params.Luz_global);
scene.add(l1);
//--------------------------------------------------------------
const Luces = []

for (let i = 0; i < 10; i++) 
{
	let x = new THREE.PointLight( colores[i],0.1);
	x.name="Luz"+[i];
	Luces.push(x)[i];
	scene.add(x);

	//Luces[i].position.set(Math.floor(Math.random() * (3 - (-3)) + (-3)),Math.floor(Math.random() * (3 - (-3)) + (-3)),Math.floor(Math.random() * (3 - (-3)) + (-3)))

	const pointLightHelper = new THREE.PointLightHelper( Luces[i],0.3);
	scene.add( pointLightHelper );
}

//--------------------------------------------------------------
const pivot = new THREE.Object3D();
pivot.position.set(cube.position.x,cube.position.y,cube.position.z);
scene.add(pivot);

for (var i = 0; i < Luces.length; i++) 
{
	pivot.add(Luces[i])
}
//-----------------------------------------------------------------

	const gui = new dat.GUI();

	gui.add( params, 'bloomThreshold', 0.0, 1.0 ).onChange( function ( value ) 
	{bloomPass.threshold = Number( value );});

	gui.add( params, 'bloomStrength', 0.0, 3.0 ).onChange( function ( value ) 
	{bloomPass.strength = Number( value );} );

	gui.add( params, 'bloomRadius', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) 
	{bloomPass.radius = Number( value );});


	gui.add( params, 'cambio_mat', 0.0, 1.0 ).onChange( function ( value ) 
	{cambio_mat = Number( value );} );

	/*gui.add( params, 'Luz_global', 0.0, 3.0 ).onChange( function ( value ) 
	{Luz_global = Number( value );} );*/

	gui.add( params, 'velocidad', 0.01, 2.0 ).onChange( function ( value ) 
	{velocidad = Number( value );} );

//----------------------------------------------------------------





const animate = function () 
{
	requestAnimationFrame( animate );

	composer.render();
	//------------------------------------------
	x+=params.velocidad;

	Luces[0].position.x= Math.cos(x)*3
	Luces[0].position.y= Math.sin(x)*2

	Luces[1].position.x=-Math.cos(x)*3
	Luces[1].position.y=-Math.sin(x)*2

	Luces[2].position.x= Math.cos(x+x)*3
	Luces[2].position.y= Math.sin(x+x)*4
	Luces[2].position.z= Math.sin(x+x)*3

	Luces[3].position.x=-Math.cos(x+x)*3
	Luces[3].position.y= Math.sin(x+x)*4
	Luces[3].position.z= Math.cos(x+x)*3

	Luces[4].position.z= Math.cos(x)*2
	Luces[4].position.y=-Math.sin(x)*4

	Luces[5].position.z=-Math.cos(x)*3
	Luces[5].position.y= Math.sin(x)*2

	Luces[6].position.z=Math.cos(x)*3
	Luces[6].position.x=Math.sin(x)*2

	Luces[7].position.x=Math.cos(x+x/2)*3
	Luces[7].position.z=Math.sin(x+x/2)*2

	Luces[8].position.z=Math.cos(x)*3
	Luces[8].position.y=Math.sin(x)*2
	Luces[8].position.x=Math.sin(x)*2

	Luces[9].position.z=Math.cos(x)*3
	Luces[9].position.x=Math.sin(x)*2
	Luces[9].position.y=Math.sin(x)*2
	//------------------------------------------
	t1+=params.cambio_mat;
	if (t1>2)
	{
		if (n1>8) {n1=-1}
		n1+=1
		material.color=colores[n1]
		t1=0;
	}
	//-----------------------------------------



	//renderer.render( scene, camera );
};

animate();
//l1.color=colores[Math.floor(Math.random()*10)];
//const l1 = new THREE.AmbientLight( colores[0],0.2);
//console.log(Math.floor(Math.random()*10))

/*pointLight.position.x=(Math.cos(x))*3;
pointLight.position.y=(Math.sin(x))*3;*/