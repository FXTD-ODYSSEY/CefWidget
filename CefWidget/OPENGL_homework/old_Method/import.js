//$(function(){
//    $("#help_btn").hide(); 
//    $("#full_btn").hide(); 
//    $("#share_btn").hide(); 
//    $("#stop_btn").hide(); 
//    $("#origin_btn").hide(); 
//    $("#color_dark_btn").hide(); 
//    $("#color_white_btn").hide();
//    $("#main").hide();
//});

var textureLoader = new THREE.TextureLoader();
var envPath = 'https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/NEW_packed/texture/SwedishRoyalCastle/';
var reflectionCube = getEnvMap(envPath);
toggleThreeLight();
renderer.shadowMapEnabled = false; 
scene.background = new THREE.Color( 0x333333 );

//加载材质
var path = 'https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/model/head.obj';
var geo_material = getMaterial('standard','rgb(200,200,200)');
var colorMap = textureLoader.load('https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/model/texture/head.jpg');
geo_material.matelness = 1;
geo_material.roughness = .85;
geo_material.skinning = true;
geo_material.map = colorMap;
geo_material.envMap = reflectionCube;
var model_source_1 = getModel(path,geo_material);

var RotateGrp = new THREE.Group();

RotateGrp.add(model_source_1);

RotateGrp.scale.set(.021,.021,.021);

scene.add(RotateGrp);


toggleThreeLight();
ambientLight.intensity  = 1.8;

camera_orbitControl(2,40);
finish_init(RotateGrp,true,-20);




