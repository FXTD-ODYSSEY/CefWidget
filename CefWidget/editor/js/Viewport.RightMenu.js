/**
 * @author mrdoob / http://mrdoob.com/
 */

Viewport.RightMenu = function ( editor ) {


	/*************************/
	/***添加tooltip的函数封装***/
	/************************/
	function tooltip_anim(id, text, direction, animateType, color) {
		var tooltip = new HTML5TooltipUIComponent;
		var target = document.getElementById(id);

		//预设没有传参的数据
		animateType = animateType === undefined ? "scalein" : animateType;
		color = color === undefined ? 'bamboo' : color;
		direction = direction === undefined ? 'left' : direction;
		tooltip.set({
			animateFunction: animateType,
			color: color,
			contentText: text,
			stickTo: direction,
			target: target
		});

		target.addEventListener('mouseenter', function () {
			tooltip.show();//鼠标在上面时显示tooltip
		});

		target.addEventListener('mouseleave', function () {
			tooltip.hide();//鼠标离开时取消显示
		});

		tooltip.mount();

		return tooltip;
	}

	// /*旋转停止按钮*/
	// var rotate_check = true;
	// function rotate_stop() {
	// 	if (rotate_check) {
	// 		rotate_check = false; $("#perps_view").attr("src", "https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/jumplist_startalltask.ico");  //修改图标
	// 		tooltip_stop.set({ contentText: "开始旋转" });//修改tooltip提示
	// 		html5tooltips.refresh();
	// 	} else {
	// 		rotate_check = true; $("#perps_view").attr("src", "https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/jumplist_pausealltask.ico");//修改图标
	// 		// tooltip_stop.set({contentText:'暂停旋转'});//修改tooltip提示
	// 		html5tooltips.refresh();
	// 	}
	// }

	//使用JQuery实现按钮添加
	var tooltip_stop, tooltip_background;
	var main_toggle = true;

	//添加按钮的CSS样式
	var pos = 45
	var h = 80
	var main_css = $("<style></style>").text(`
	#container {
		position: absolute;
		width: 100%;
		height: 5%;
		margin-top: 40%;
		right: 25%;
	}
	#logo {
		position: absolute;
		width: 40%;
		left: 40%;
		top: 30%;
	}
	#main {
		position: fixed;
		bottom: 10px;
		right: 20px;
		padding: 1px 15px;
		color: #fff;
		background-color: #89a;
		opacity: 0.7;
		border-radius: 50%;
		font-size: 50px;
		transition: transform 0.2s linear;
	}
	#main:hover {
		cursor: pointer;
		opacity: 1;
		transform: rotate(180deg);
	}
	#front_view {
		position: fixed;
		bottom: ${pos*0 + h}px;
		right: 30px;
		padding: 5px 5px;
		color: #fff;
		background-color: #89a;
		opacity: 0.7;
		border-radius: 50%;
		font-size: 50px;
		cursor: pointer;
	}
	#side_view {
		position: fixed;
		bottom: ${pos*1 + h}px;
		right: 30px;
		padding: 5px 5px;
		color: #fff;
		background-color: #89a;
		opacity: 0.7;
		border-radius: 50%;
		font-size: 50px;
		cursor: pointer;
	}
	#top_view {
		position: fixed;
		bottom: ${pos*2 + h}px;
		right: 30px;
		padding: 5px 5px;
		color: #fff;
		background-color: #89a;
		opacity: 0.7;
		border-radius: 50%;
		font-size: 50px;
		cursor: pointer;
	}
	#perps_view {
		position: fixed;
		bottom: ${pos*3 + h}px;
		right: 30px;
		padding: 5px 5px;
		color: #fff;
		background-color: #89a;
		opacity: 0.7;
		border-radius: 50%;
		font-size: 50px;
		cursor: pointer;
	}
	#sidebar_toggle {
		position: fixed;
		bottom: ${pos*4 + h}px;
		right: 30px;
		padding: 5px 5px;
		color: #fff;
		background-color: #89a;
		opacity: 0.7;
		border-radius: 50%;
		font-size: 50px;
		cursor: pointer;
	}
	#info_toggle {
		position: fixed;
		bottom: ${pos*5 + h}px;
		right: 30px;
		padding: 5px 5px;
		color: #fff;
		background-color: #89a;
		opacity: 0.7;
		border-radius: 50%;
		font-size: 50px;
		cursor: pointer;
	}

	#blocker {
		position: absolute;
		top: 0px;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}
	#instructions {
		width: 100%;
		height: 100%;
		display: -webkit-box;
		display: -moz-box;
		display: box;
		-webkit-box-orient: horizontal;
		-moz-box-orient: horizontal;
		box-orient: horizontal;
		-webkit-box-pack: center;
		-moz-box-pack: center;
		box-pack: center;
		-webkit-box-align: center;
		-moz-box-align: center;
		box-align: center;
		color: #ffffff;
		text-align: center;
		cursor: pointer;
	}
	
	`);

	$("body").append(main_css);

	//添加按钮
	$("body").after("<button id='main'>+</button>");
	$("#main").click(()=>{
		/*主菜单 显示按钮功能*/
		$("#front_view").fadeToggle(100);
		$("#side_view").fadeToggle(200);
		$("#top_view").fadeToggle(300);
		$("#perps_view").fadeToggle(400);
		$("#sidebar_toggle").fadeToggle(500);
		$("#info_toggle").fadeToggle(600);
		main_toggle = !main_toggle
	});
	$("#main").css("opacity","0");
	$("#main").hover(function(){
		$("#main").animate({"opacity":"1"});
	},function(){
		if (main_toggle)
		$("#main").animate({"opacity":"0"});
	});

	this.perps_camera = editor.camera;

	// NOTE 创建正交摄像机
	width = window.innerWidth;
	height = window.innerHeight;
	ratio = 128;
	this.ortho_camera = new THREE.OrthographicCamera( width / - ratio, width / ratio, height / ratio, height / - ratio,-100, 10 );
	// this.ortho_camera.position.set(new THREE.Vector3(1,0,0))
	this.ortho_camera.outlinerHide = false;
	editor.scene.add( this.ortho_camera );
	var scope = this;

	tooltip_anim("main", "主菜单");
	
	$("body").after("<img id='front_view' src='./img/front.png' width='32px' height='32px'>")
	tooltip_anim("front_view", "正视图");//添加按钮tooltip
	$("#front_view").hide();//隐藏按钮
	$("#front_view").click(function (){
		scope.ortho_camera.rotation.set(0,0,0)
		editor.camera = scope.ortho_camera
		editor.controls.rotateEnabled = false;
		editor.controls.center = new THREE.Vector3();
		editor.controls.changeCamera(scope.ortho_camera);
		editor.signals.sceneGraphChanged.dispatch();
	});

	$("body").after("<img id='side_view' src='./img/side.png' width='32px' height='32px'>")
	tooltip_anim("side_view", "侧视图");//添加按钮tooltip
	$("#side_view").hide();//隐藏按钮
	$("#side_view").click(function (){
		scope.ortho_camera.rotation.set(0,Math.PI/2,0)
		editor.camera = scope.ortho_camera
		editor.controls.rotateEnabled = false;
		editor.controls.center = new THREE.Vector3();
		editor.controls.changeCamera(scope.ortho_camera);
		editor.signals.sceneGraphChanged.dispatch();

	});

	$("body").after("<img id='top_view' src='./img/top.png' width='32px' height='32px'>")
	tooltip_background = tooltip_anim("top_view", "顶视图");//这里用这个无法删除改变按钮
	$("#top_view").hide();//隐藏按钮
	$("#top_view").click(function (){
		scope.ortho_camera.rotation.set(Math.PI/2,0,0)
		editor.camera = scope.ortho_camera
		editor.controls.rotateEnabled = false;
		editor.controls.center = new THREE.Vector3();
		editor.controls.changeCamera(scope.ortho_camera);
		editor.signals.sceneGraphChanged.dispatch();
	});
	
	$("body").after("<img id='perps_view' src='./img/perps.png' width='32px' height='32px' >")
	tooltip_stop = tooltip_anim("perps_view", "透视图");//添加按钮tooltip
	$("#perps_view").hide();//隐藏按钮
	$("#perps_view").click(function (){
		editor.camera = scope.perps_camera
		editor.controls.rotateEnabled = true;
		editor.controls.center = new THREE.Vector3();
		editor.controls.changeCamera(scope.perps_camera);
		editor.signals.sceneGraphChanged.dispatch();
		editor.controls.focus( editor.selected ? editor.selected : editor.scene);
	});


	$("body").after("<img id='sidebar_toggle' src='./img/panel.png' width='32px' height='32px'>")

	tooltip_anim("sidebar_toggle", "编辑面板打开关闭");//添加按钮tooltip

	$("#sidebar_toggle").hide();//隐藏按钮
	$("#sidebar_toggle").click(function (){
		$("#sidebar").toggle(200)
	});

	$("body").after("<img id='info_toggle' src='./img/info.png' width='32px' height='32px'>")

	tooltip_anim("info_toggle", "工具栏打开关闭");//添加按钮tooltip

	$("#info_toggle").hide();//隐藏按钮
	$("#info_toggle").click(function (){
		$("#toolbar").toggle(200)
		$("#info").toggle(200)
	});

	html5tooltips.refresh();//通过这个刷新tooltip 方可正常显示

	
	
	/*******************************************************/
	/*******************************************************/
	/*******************************************************/
	// signals.objectAdded.add( update );
	// signals.objectRemoved.add( update );
	// signals.geometryChanged.add( update );

	// function update() {

	// }

	// return container;

};
