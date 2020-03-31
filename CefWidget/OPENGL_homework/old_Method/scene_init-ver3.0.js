/************************/
/*******添加全屏按钮********/
/*****并且添加全屏功能*******/                       
 /************************/

//使用JQuery实现按钮添加
var bar_path_Su,bar_path_S,bar_path_Y,bar_path_an,bar_path_Yu,bar_path_logobar_path_i_upper,bar_path_i_lower,tooltip_stop,tooltip_background;
$(function(){ 
        
        //webgl加载失败时显示提示 代码复制自webglreport.js 
        var webglVersion = window.location.search.indexOf('v=2') > 0 ? 2 : 1;
        var report = {
            platform: navigator.platform,
            userAgent: navigator.userAgent,
            webglVersion: webglVersion
        };

        if (webglVersion === 2) {
            $('body').addClass('webgl2');
        }

        if ((webglVersion === 2 && !window.WebGL2RenderingContext) ||
            (webglVersion === 1 && !window.WebGLRenderingContext)) {
            // The browser does not support WebGL
            //显示浏览器不支持webgl的信息
            webgl_fail();
            return;
        }


        var canvas = $('<canvas />', { width: '1', height: '1' }).appendTo('body');
        var gl;
        var possibleNames = (webglVersion === 2) ? ['webgl2', 'experimental-webgl2'] : ['webgl', 'experimental-webgl'];
        var contextName = _.find(possibleNames, function (name) {
            gl = canvas[0].getContext(name, { stencil: true });
            return !!gl;
        });
        canvas.remove();

        if (!gl) {
            // The browser supports WebGL, but initialization failed
            //显示浏览器需要开启webgl的信息
            webgl_update();
            return;
        }
    
    //添加按钮的CSS样式
    var main_css = $("<style></style>").text("#container{position:absolute;width:100%;height:5%;margin-top:40% ;right:25%;}#logo{position:absolute;width:40%;left:40%;top:30%;} #main{position: fixed;bottom: 20px;right: 20px;padding: 1px 15px;color: #fff;background-color: #89a;opacity: 0.7;border-radius: 50%;font-size: 50px;transition: transform 0.2s linear;}  #main:hover {cursor: pointer;opacity: 1;transform: rotate(180deg);}#help_btn {position: fixed;bottom: 100px;right: 30px;padding: 5px 5px;color: #fff;background-color: #89a;opacity: 0.7;border-radius: 50%;font-size: 50px;cursor:pointer;}#full_btn {position: fixed;bottom: 150px;right: 30px;padding: 5px 5px;color: #fff;background-color: #89a;opacity: 0.7;border-radius: 50%;font-size: 50px;cursor:pointer;}#share_btn {position: fixed;bottom: 200px;right: 30px;padding: 5px 5px;color: #fff;background-color: #89a;opacity: 0.7;border-radius: 50%;font-size: 50px;cursor:pointer;}#stop_btn {position: fixed;bottom: 250px;right: 30px;padding: 5px 5px;color: #fff;background-color: #89a;opacity: 0.7;border-radius: 50%;font-size: 50px;cursor:pointer;}#origin_btn {position: fixed;bottom: 300px;right: 30px;padding: 5px 5px;color: #fff;background-color: #89a;opacity: 0.7;border-radius: 50%;font-size: 50px;cursor:pointer;}     #color_dark_btn {position: fixed;bottom: 200px;right: 80px;padding: 5px 5px;color: #fff;background-color: #89a;opacity: 0.7;border-radius: 50%;font-size: 50px;cursor:pointer;}    #color_white_btn {position: fixed;bottom: 200px;right: 80px;padding: 5px 5px;color: #fff;background-color: #89a;opacity: 0.7;border-radius: 50%;font-size: 50px;cursor:pointer;} #color_white_btn_small {position: fixed;bottom: 20px;right: 20px;padding: 5px 5px;color: #fff;background-color: #89a;opacity: 0.7;border-radius: 50%;font-size: 50px;cursor:pointer;} #color_dark_btn_small {position: fixed;bottom: 20px;right: 45px;padding: 5px 5px;color: #fff;background-color: #89a;opacity: 0.7;border-radius: 50%;font-size: 50px;cursor:pointer;} #panel {padding: 0; margin: 0; width: 200px;height: 500px;background: #a0a0f0;position: absolute;right:3px;top:20%;border:2px solid #bbb}    #blocker {position: absolute; top:0px;width: 100%;height: 100%;background-color: rgba(0,0,0,0.5);}    #instructions {width: 100%;height: 100%;display: -webkit-box;display: -moz-box;display: box;-webkit-box-orient: horizontal;-moz-box-orient: horizontal;box-orient: horizontal;-webkit-box-pack: center;-moz-box-pack: center;box-pack: center;-webkit-box-align: center;-moz-box-align: center;box-align: center;color: #ffffff;text-align: center;cursor: pointer;}");
    
    $("body").append(main_css);
    

    //添加按钮
    $("#webgl").after("<button id='main' onclick='icon_display()' onDblClick='express()'>+</button>");
    
    tooltip_anim("main","主菜单");
    
    $("#webgl").after("<img id='help_btn' src='https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/information.ico' width='32px' height='32px' onclick='help_display()'>") 
    
    tooltip_anim("help_btn","帮助");//添加按钮tooltip
    
    $("#help_btn").hide();//隐藏按钮
    
    $("#webgl").after("<img id='full_btn' src='https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/statusNotDone.ico' width='32px' height='32px' onclick='full_screen_fun()'>") 
    
    tooltip_anim("full_btn","全屏");//添加按钮tooltip
    
    $("#full_btn").hide();//隐藏按钮
    
    $("#webgl").after("<img id='share_btn' src='https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/flag.ico' width='32px' height='32px' onclick='share_display()'>") 
    
    tooltip_background = tooltip_anim("share_btn","背景颜色");//这里用这个无法删除改变按钮
    
    $("#share_btn").hide();//隐藏按钮
    
    $("#webgl").after("<img id='stop_btn' src='https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/jumplist_pausealltask.ico' width='32px' height='32px' onclick='rotate_stop()'>") 
    
    tooltip_stop = tooltip_anim("stop_btn","暂停旋转");//添加按钮tooltip
    
    $("#stop_btn").hide();//隐藏按钮
    
    $("#webgl").after("<img id='origin_btn' src='https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/sync.ico' width='32px' height='32px'onclick='origin_position()'>") 
    
    tooltip_anim("origin_btn","初始位置");//添加按钮tooltip
    
    $("#origin_btn").hide();//隐藏按钮
    
    $("#webgl").after("<img id='color_white_btn' src='https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/white.jpg' width='32px' height='32px'onclick='white_BG()'>") 
    
    tooltip_anim("color_white_btn","白背景",'top');//添加按钮tooltip
    
    $("#color_white_btn").hide();//隐藏按钮
    
    $("#webgl").after("<img id='color_dark_btn' src='https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/dark.jpg' width='32px' height='32px'onclick='dark_BG()'>") 
    
    tooltip_anim("color_dark_btn","黑背景",'top');//添加按钮tooltip
    
    $("#color_dark_btn").hide();//隐藏按钮
    
    $("#webgl").after("<img id='color_white_btn_small' src='https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/white.jpg' width='10px' height='10px'onclick='white_BG()' >") 
    
    tooltip_anim("color_white_btn_small","白背景",'top');//添加按钮tooltip
    
    $("#color_white_btn_small").hide();//隐藏按钮
    
    $("#webgl").after("<img id='color_dark_btn_small' src='https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/dark.jpg' width='10px' height='10px'onclick='dark_BG()' >")   
    
    tooltip_anim("color_dark_btn_small","黑背景",'top');//添加按钮tooltip
    
    $("#color_dark_btn_small").hide();//隐藏按钮
    
    $("#webgl").append("<div id='panel'></div>");//控制面板
    $("#panel").hide();//隐藏面板
    
     $("#panel").append("<div id='transform' style='position:absolute;top:5px;left:20px;'><center><p><b>属性面板</b></p></center><div id='panel_translate'style='position:relative;margin:5px;'>平移 <input value='0.0' class='translateX' style='border:2px solid transparent;background-color: transparent; cursor: col-resize; width: 25px;margin:0px 5px;'><input value='0.0' class='translateY' style='background-color: transparent; cursor: col-resize; width: 25px;margin:0px 5px;'><input value='0.0' class='translateZ' style='background-color: transparent; cursor: col-resize; width: 25px;margin:0px 5px;'></div><div id='panel_rotate'style='position:relative;margin:5px;'>旋转 <input class='Number' style='background-color: transparent; cursor: col-resize; width: 25px;margin:0px 5px;'><input class='Number' style='background-color: transparent; cursor: col-resize; width: 25px;margin:0px 5px;'><input class='Number' style='background-color: transparent; cursor: col-resize; width: 25px;margin:0px 5px;'></div><div id='panel_scale'style='position:relative;margin:5px;'>缩放 <input class='Number' style='background-color: transparent; cursor: col-resize; width: 25px;margin:0px 5px;'><input class='Number' style='background-color: transparent; cursor: col-resize; width: 25px;margin:0px 5px;'><input class='Number' style='background-color: transparent; cursor: col-resize; width: 25px;margin:0px 5px;'></div></div>");//控制面板
    
    //var container = new UI.Panel();
//	//container.setBorderTop( '0' );
//	//container.setPaddingTop( '20px' );
//	container.setDisplay( 'block' );
//    
//    var objectPositionRow = new UI.Row();
//	var objectPositionX = new UI.Number().setWidth( '50px' ).onChange( update );
//	var objectPositionY = new UI.Number().setWidth( '50px' ).onChange( update );
//	var objectPositionZ = new UI.Number().setWidth( '50px' ).onChange( update );
//
//	objectPositionRow.add( new UI.Text( 'Position' ).setWidth( '90px' ) );
//	objectPositionRow.add( objectPositionX, objectPositionY, objectPositionZ );
//    
//    container.add(objectPositionRow);
	//$("#panel").append(objectPositionRow);
    
    
    ico_size();//默认使用小图标（大图标在手机端竖屏时使用）
    
    //如果当前窗口过小，隐藏主菜单按钮
    if(window.innerHeight<300 || window.innerWidth < 300){
                rotate_stop();
                $("#main").hide();
                $("#color_white_btn_small").show();
                $("#color_dark_btn_small").show();
    }
    
    
    html5tooltips.refresh();//通过这个刷新tooltip 方可正常显示
    //加载SVG路径生成公司logo为动画做准备
    $("#logo").append(" <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400' ><defs><style>.a{fill:none;}.b{fill:#1d815e;}.c{fill:#3ea251;}</style></defs>            <path fill-opacity='0' stroke-width='1' stroke='#bbb'  d='M533.5,390.2V339.7c0-2.9,1.2-4,4.1-4.1h23.5c1.8,0,2.8,1,2.8,2.6s0,1.9,0,2.8q0,12.5,0,25h0q0,12.8,0,25.7a1.7,1.7,0,0,0,.3.9,2.1,2.1,0,0,0,1.2-.4c2.3-2.2,4.4-4.5,6.8-6.7a4.8,4.8,0,0,0,1.6-3.9q-.1-16.6-.1-33.2c0-5.6,0-11.1-.1-16.7a5.9,5.9,0,0,0-1.1-3.3,6.8,6.8,0,0,0-5.8-2.5H531c-2.7,0-5.7,1.6-6.2,4.6-.1.7-.6.9-1.2.7l-1.1-.5-4.7-3.2c-2-1.3-4.3-1.6-6-.2s-2.4,5.2-.8,6.5,6.3,4.8,9.4,7.2,3,1.9,1.6,5.1-1.9,2.9-4,2.8h-24a7.3,7.3,0,0,0-7.3,7.3q0,15.2.2,30.5a5.1,5.1,0,0,0,3.6,5,11.3,11.3,0,0,0,3.2.4h26.9c.7,0,.9-.4.7-1a3.3,3.3,0,0,0-.6-.9l-6.3-7.3a1.9,1.9,0,0,0-1.6-.7H499.8a9.5,9.5,0,0,1-2.3-.3c-1.3-.4-1.7-1-1.7-2.4q-.1-8.9-.1-17.9c0-1.8.6-2.5,2.3-3h23.3c1.4,0,1.9.5,2,1.9s0,.8,0,1.3q0,13.8-.1,27.6a2.4,2.4,0,0,0,2.5,2.7H531A2.3,2.3,0,0,0,533.5,390.2Z' transform='translate(-268.6 -160.1)'/>        <path fill-opacity='0' stroke-width='1' stroke='#bbb'  d='M363.2,326.6a2.7,2.7,0,0,1,2.5,2.8c0,1.6,0,3.3,0,4.9a2.3,2.3,0,0,1-2,2.3h-2.2l-79.9-.3c-2-.1-3.1.9-3.2,3-.1,4.7-.1,9.4,0,14.1a2.7,2.7,0,0,0,3,2.7h23.6a9,9,0,0,1,5.2,1.6,5.3,5.3,0,0,1,2.2,4.3c.2,2.5.2,5,.2,7.5,0,5.9,0,11.8,0,17.7A5.8,5.8,0,0,1,307,393H270.6l-1.2-.3a4.8,4.8,0,0,1,.6-1l4.2-4.3c1.4-1.5,2.9-2.9,4.4-4.3a2.8,2.8,0,0,1,1.7-.5h19.3c2.3,0,3.1-.7,3.1-3s-.1-7.3-.2-10.9c0-1.5-1-2.3-2.8-2.4H275.8a7.2,7.2,0,0,1-7.1-5.5,3.8,3.8,0,0,1-.1-1c0-8.4-.1-16.8,0-25.2.1-4.4,2.1-7.8,7.4-8.1C279,326.4,361.8,326.5,363.2,326.6Z' transform='translate(-268.6 -160.1)'/>        <path fill-opacity='0' stroke-width='1' stroke='#bbb'  d='M387.2,326.2h11.5c1.8,3.4,4.3,8,6.2,11.3a40.2,40.2,0,0,0,2.6,3.8c.5.7.9.3,1.2-.2l5.2-9.1,3.3-5.9h75.7c.5,0,.5.9.1,1.3l-8.9,8.2a2.1,2.1,0,0,1-1.3.3H425.7a1.3,1.3,0,0,0-1.3.8c-2.5,4.6-4.9,9.3-7.6,13.7-.9,1.4-2.3,4.2-2.3,4.2s-.4,26.7-.5,35.3c0,1.4-.7,2.6-1.9,2.6H405c-1.8,0-2.7-.7-2.7-2.5,0-7.9-.1-16.2-.1-24,0-3.4.1-7.7,0-11l-.9-1.9c-4.5-8.9-8.9-16.8-13.5-25.6C387.6,327.4,387.4,326.7,387.2,326.2Z' transform='translate(-268.6 -160.1)'/>        <path fill-opacity='0' stroke-width='1' stroke='#bbb'  d='M318.6,364.6q0-10.7,0-21.4a2.4,2.4,0,0,1,2.4-2.5h5.2a2.4,2.4,0,0,1,2.6,2.6q.1,17.9.2,35.9c0,2.3.8,3.2,3.2,3.2h21.8c.9,0,1.3-.3,1.3-1.3q0-12.1,0-24.1c0-4.6.1-9.2.2-13.7,0-1.3.5-2.5,2.3-2.5h5.4a2.7,2.7,0,0,1,2.6,3c0,1.2-.2,19.3-.2,27.1,0,5.3.1,10.6,0,15.9a6.9,6.9,0,0,1-1.6,4.9,3.6,3.6,0,0,1-2.8,1.2H333.7c-3.1,0-6.2.2-9.3,0s-5.8-1.8-5.8-5.6c0-7.6,0-15.2,0-22.7Z' transform='translate(-268.6 -160.1)'/>        <path fill-opacity='0' stroke-width='1' stroke='#bbb'  d='M432.9,364.8q0-10.7,0-21.5c0-2.3.8-3.1,3.1-3.1h4.1a2.6,2.6,0,0,1,2.7,3c0,1,.1,2,.1,3q0,16.1,0,32.2c0,.4,0,.8,0,1.2a2.3,2.3,0,0,0,2.6,2.4h20.7c2,0,2.9-.8,3.2-2.8a22.7,22.7,0,0,0,.1-2.4c0-11,0-23.7,0-34.7a1.8,1.8,0,0,1,1.8-1.3H478a1.9,1.9,0,0,1,1.9,2c0,1.3,0,2.6,0,3.9q0,15.2.1,30.4,0,4.5.1,8.9c0,2.5-.7,4.7-3.1,5.9a6.8,6.8,0,0,1-2.4.6c-4.4.3-11.7.1-17.6.1H438.9c-3.8,0-5.6-1.8-5.8-5.3-.1-1.9-.1-3.9-.1-5.8,0-5.5,0-11.1,0-16.6Z' transform='translate(-268.6 -160.1)'/>        <path fill-opacity='0' stroke-width='1' stroke='#bbb'  d='M372.6,366.2q0-11.4,0-22.9c0-1.7.7-2.4,2.3-2.5h5.5c.9,0,2.2.3,2.3,1.5s.1,2.7.1,4q.1,22.3,0,44.5c0,1.5-.3,1.8-1.8,1.9h-7.2a1.4,1.4,0,0,1-1.3-1.4C372.4,383.6,372.5,366.2,372.6,366.2Z' transform='translate(-268.6 -160.1)'/>        <path fill-opacity='0' stroke-width='1' stroke='#bbb'  d='M377.4,326.3h-2.8a3.7,3.7,0,0,0-3.9,3.7c0,.9,0,2.2,0,3.2a3.1,3.1,0,0,0,2.8,2.9c2.5.2,4.7.1,7.2.1a2.7,2.7,0,0,0,2.7-2.8c0-1,0-2.8,0-3.9a3.5,3.5,0,0,0-3.1-3.1Z' transform='translate(-268.6 -160.1)'/>                     <!--animation path-->    <path fill-opacity='0' stroke-width='3' stroke='#1d815e'  id='an'  d='M533.5,390.2V339.7c0-2.9,1.2-4,4.1-4.1h23.5c1.8,0,2.8,1,2.8,2.6s0,1.9,0,2.8q0,12.5,0,25h0q0,12.8,0,25.7a1.7,1.7,0,0,0,.3.9,2.1,2.1,0,0,0,1.2-.4c2.3-2.2,4.4-4.5,6.8-6.7a4.8,4.8,0,0,0,1.6-3.9q-.1-16.6-.1-33.2c0-5.6,0-11.1-.1-16.7a5.9,5.9,0,0,0-1.1-3.3,6.8,6.8,0,0,0-5.8-2.5H531c-2.7,0-5.7,1.6-6.2,4.6-.1.7-.6.9-1.2.7l-1.1-.5-4.7-3.2c-2-1.3-4.3-1.6-6-.2s-2.4,5.2-.8,6.5,6.3,4.8,9.4,7.2,3,1.9,1.6,5.1-1.9,2.9-4,2.8h-24a7.3,7.3,0,0,0-7.3,7.3q0,15.2.2,30.5a5.1,5.1,0,0,0,3.6,5,11.3,11.3,0,0,0,3.2.4h26.9c.7,0,.9-.4.7-1a3.3,3.3,0,0,0-.6-.9l-6.3-7.3a1.9,1.9,0,0,0-1.6-.7H499.8a9.5,9.5,0,0,1-2.3-.3c-1.3-.4-1.7-1-1.7-2.4q-.1-8.9-.1-17.9c0-1.8.6-2.5,2.3-3h23.3c1.4,0,1.9.5,2,1.9s0,.8,0,1.3q0,13.8-.1,27.6a2.4,2.4,0,0,0,2.5,2.7H531A2.3,2.3,0,0,0,533.5,390.2Z' transform='translate(-268.6 -160.1)'/>        <path fill-opacity='0' stroke-width='3' stroke='#1d815e'  id='s'  d='M363.2,326.6a2.7,2.7,0,0,1,2.5,2.8c0,1.6,0,3.3,0,4.9a2.3,2.3,0,0,1-2,2.3h-2.2l-79.9-.3c-2-.1-3.1.9-3.2,3-.1,4.7-.1,9.4,0,14.1a2.7,2.7,0,0,0,3,2.7h23.6a9,9,0,0,1,5.2,1.6,5.3,5.3,0,0,1,2.2,4.3c.2,2.5.2,5,.2,7.5,0,5.9,0,11.8,0,17.7A5.8,5.8,0,0,1,307,393H270.6l-1.2-.3a4.8,4.8,0,0,1,.6-1l4.2-4.3c1.4-1.5,2.9-2.9,4.4-4.3a2.8,2.8,0,0,1,1.7-.5h19.3c2.3,0,3.1-.7,3.1-3s-.1-7.3-.2-10.9c0-1.5-1-2.3-2.8-2.4H275.8a7.2,7.2,0,0,1-7.1-5.5,3.8,3.8,0,0,1-.1-1c0-8.4-.1-16.8,0-25.2.1-4.4,2.1-7.8,7.4-8.1C279,326.4,361.8,326.5,363.2,326.6Z' transform='translate(-268.6 -160.1)'/>        <path fill-opacity='0' stroke-width='3' stroke='#1d815e'  id='y'  d='M387.2,326.2h11.5c1.8,3.4,4.3,8,6.2,11.3a40.2,40.2,0,0,0,2.6,3.8c.5.7.9.3,1.2-.2l5.2-9.1,3.3-5.9h75.7c.5,0,.5.9.1,1.3l-8.9,8.2a2.1,2.1,0,0,1-1.3.3H425.7a1.3,1.3,0,0,0-1.3.8c-2.5,4.6-4.9,9.3-7.6,13.7-.9,1.4-2.3,4.2-2.3,4.2s-.4,26.7-.5,35.3c0,1.4-.7,2.6-1.9,2.6H405c-1.8,0-2.7-.7-2.7-2.5,0-7.9-.1-16.2-.1-24,0-3.4.1-7.7,0-11l-.9-1.9c-4.5-8.9-8.9-16.8-13.5-25.6C387.6,327.4,387.4,326.7,387.2,326.2Z' transform='translate(-268.6 -160.1)'/>        <path fill-opacity='0' stroke-width='3' stroke='#1d815e'  id='Su'  d='M318.6,364.6q0-10.7,0-21.4a2.4,2.4,0,0,1,2.4-2.5h5.2a2.4,2.4,0,0,1,2.6,2.6q.1,17.9.2,35.9c0,2.3.8,3.2,3.2,3.2h21.8c.9,0,1.3-.3,1.3-1.3q0-12.1,0-24.1c0-4.6.1-9.2.2-13.7,0-1.3.5-2.5,2.3-2.5h5.4a2.7,2.7,0,0,1,2.6,3c0,1.2-.2,19.3-.2,27.1,0,5.3.1,10.6,0,15.9a6.9,6.9,0,0,1-1.6,4.9,3.6,3.6,0,0,1-2.8,1.2H333.7c-3.1,0-6.2.2-9.3,0s-5.8-1.8-5.8-5.6c0-7.6,0-15.2,0-22.7Z' transform='translate(-268.6 -160.1)'/>        <path fill-opacity='0' stroke-width='3' stroke='#1d815e'  id='Yu'  d='M432.9,364.8q0-10.7,0-21.5c0-2.3.8-3.1,3.1-3.1h4.1a2.6,2.6,0,0,1,2.7,3c0,1,.1,2,.1,3q0,16.1,0,32.2c0,.4,0,.8,0,1.2a2.3,2.3,0,0,0,2.6,2.4h20.7c2,0,2.9-.8,3.2-2.8a22.7,22.7,0,0,0,.1-2.4c0-11,0-23.7,0-34.7a1.8,1.8,0,0,1,1.8-1.3H478a1.9,1.9,0,0,1,1.9,2c0,1.3,0,2.6,0,3.9q0,15.2.1,30.4,0,4.5.1,8.9c0,2.5-.7,4.7-3.1,5.9a6.8,6.8,0,0,1-2.4.6c-4.4.3-11.7.1-17.6.1H438.9c-3.8,0-5.6-1.8-5.8-5.3-.1-1.9-.1-3.9-.1-5.8,0-5.5,0-11.1,0-16.6Z' transform='translate(-268.6 -160.1)'/>        <path fill-opacity='0' stroke-width='3' stroke='#1d815e'  id='i-lower'  d='M372.6,366.2q0-11.4,0-22.9c0-1.7.7-2.4,2.3-2.5h5.5c.9,0,2.2.3,2.3,1.5s.1,2.7.1,4q.1,22.3,0,44.5c0,1.5-.3,1.8-1.8,1.9h-7.2a1.4,1.4,0,0,1-1.3-1.4C372.4,383.6,372.5,366.2,372.6,366.2Z' transform='translate(-268.6 -160.1)'/>        <path fill-opacity='0' stroke-width='3' stroke='#1d815e'  id='i-upper'  d='M377.4,326.3h-2.8a3.7,3.7,0,0,0-3.9,3.7c0,.9,0,2.2,0,3.2a3.1,3.1,0,0,0,2.8,2.9c2.5.2,4.7.1,7.2.1a2.7,2.7,0,0,0,2.7-2.8c0-1,0-2.8,0-3.9a3.5,3.5,0,0,0-3.1-3.1Z' transform='translate(-268.6 -160.1)'/>               <path fill-opacity='0' stroke-width='3' stroke='#1d815e'  id='logo_path'  d='M354.1,298.4m85.8-14.3a54.6,54.6,0,0,1-16.6,4.3,57.8,57.8,0,0,1-9.7.1,55.7,55.7,0,0,1-9.6-1.5,58.6,58.6,0,0,1-12.1-4.5,56.9,56.9,0,0,1-15.7-12,63.5,63.5,0,0,1-5.4-6.9c-2.1-3.1-3.2-5.6-3.6-6.2a8.2,8.2,0,0,0-3.6-3.5,8.1,8.1,0,0,0-10.8,3.7,8,8,0,0,0,.1,7.2,69.8,69.8,0,0,0,4,7.1c2.2,3.3,4.9,6.7,5.5,7.4a72.6,72.6,0,0,0,11.6,11,71.5,71.5,0,0,0,14.4,8.5,75.6,75.6,0,0,0,13.9,4.5c1.9.4,4.6.9,6.3,1.1s6.8.6,8.3.6a77.5,77.5,0,0,0,17.6-1.9,72.5,72.5,0,0,0,17.4-6.6c1.7-.9,4.6-2.7,6.3-3.8a95.2,95.2,0,0,0,8.5-6.7,106,106,0,0,0,8.3-8.9,62.9,62.9,0,0,0,4.9-7.2c.9-1.4,2.4-4.4,3.6-6.8a74.6,74.6,0,0,0,4-10.8,76.1,76.1,0,0,0,2.3-12c.1-1.7.4-5.7.4-8.3s-.3-5.7-.3-5.8a74.8,74.8,0,0,0-3.1-15.2,81.1,81.1,0,0,0-4.1-10.2,8.2,8.2,0,0,0-12.5-2.6,8.3,8.3,0,0,0-2.4,3.5,8.3,8.3,0,0,0,.1,5.8,52.5,52.5,0,0,1,3.5,8.4c.6,2,1.2,4.3,1.4,5.2a23,23,0,0,1,.3,3.3,5.5,5.5,0,0,1-3.3,4.2c-2,.8-3.9.6-6.8-1-7.5-4.3-16.7-4.8-21.3-4.8-7.6-.1-16.8,3.4-21.9,5.6-13.5,5.9-15.7,8.3-23.9,8.3a25.5,25.5,0,0,1-18.1-7.8,25.2,25.2,0,0,1-7-15.8,24.1,24.1,0,0,1,1.5-10.7,25.7,25.7,0,0,1,3.8-6.8c1.6-2.1,3.9-4.2,8.1-7.5a61.1,61.1,0,0,1,12.6-7.1,54,54,0,0,1,12.7-3.5,65.6,65.6,0,0,1,15-.1,58.2,58.2,0,0,1,15.4,4.1,52.8,52.8,0,0,1,8.8,4.7c2.1,1.4,3.6,2.6,5.9,4.4a8.4,8.4,0,0,0,8.6.1,7.8,7.8,0,0,0,3.6-4.8,8.2,8.2,0,0,0-2.9-8.7l-3.8-2.9a77.9,77.9,0,0,0-7.1-4.5,72.4,72.4,0,0,0-9.1-4.3,70.7,70.7,0,0,0-19.3-4.5,73.8,73.8,0,0,0-15.9.3,69,69,0,0,0-14.7,3.5,57.7,57.7,0,0,0-8.9,3.9,51.2,51.2,0,0,0-8.1,4.8,63.7,63.7,0,0,0-14.1,13.1,40.9,40.9,0,0,0-6.5,13,38.7,38.7,0,0,0-1.7,10.7,43,43,0,0,0,2.6,15.6,42.2,42.2,0,0,0,9,14.1,43.7,43.7,0,0,0,13.4,9.3c8.3,3.5,13.6,3.3,18.3,3.4,12.1-.9,15-4.6,28-9.7s21.1-3.5,26.5-1.8,9.6,3.2,12.2,9.4a13.9,13.9,0,0,1,.8,5.2,33.2,33.2,0,0,1-1,6,24.6,24.6,0,0,1-3.3,7,22.7,22.7,0,0,1-2.1,2.8l-1.9,2c-.8.8-5.5,4.5-6.2,5.1C447.7,280.4,442.5,283,439.9,284.1Z' transform='translate(-268.6 -160.1)'/>    ");
    //设置SVG内部id 的动画效果
    var bar_Su = new ProgressBar.Path('#Su', {
          easing: 'easeInOut',
          duration: 1000
        });
    bar_Su.set(0);
    bar_path_Su = bar_Su;//赋值到全局变量上，供后面使用
    
        var bar_S = new ProgressBar.Path('#s', {
          easing: 'easeInOut',
          duration: 1000
        });
        bar_S.set(0);
        bar_path_S = bar_S;
        var bar_i_upper = new ProgressBar.Path('#i-upper', {
          easing: 'easeInOut',
          duration: 1000
        });
        bar_i_upper.set(0);
        bar_path_i_upper = bar_i_upper;
        
        var bar_i_lower = new ProgressBar.Path('#i-lower', {
          easing: 'easeInOut',
          duration: 1000
        });
        bar_i_lower.set(0);
        bar_path_i_lower = bar_i_lower;
        
        var bar_Y = new ProgressBar.Path('#y', {
          easing: 'easeInOut',
          duration: 1000
        });
        bar_Y.set(0);
        bar_path_Y = bar_Y;
        
        var bar_Yu = new ProgressBar.Path('#Yu', {
          easing: 'easeInOut',
          duration: 1000
        });
        bar_Yu.set(0);
       bar_path_Yu = bar_Yu;
        
        var bar_an = new ProgressBar.Path('#an', {
          easing: 'easeInOut',
          duration: 1000
        });
        bar_an.set(0);
        bar_path_an = bar_an;
        
        var bar_logo = new ProgressBar.Path('#logo_path', {
          easing: 'easeInOut',
          duration: 1000
        });
        bar_logo.set(0);
        bar_path_logo = bar_logo;
});

/*************************/
/***添加tooltip的函数封装***/
/************************/
function tooltip_anim(id,text,direction,animateType,color){
    var tooltip = new HTML5TooltipUIComponent;
    var target = document.getElementById(id);
    
    //预设没有传参的数据
    animateType = animateType ===undefined ? "scalein" : animateType; 
    color = color === undefined ? 'bamboo' :color;
    direction = direction === undefined ?'left':direction;
    tooltip.set({
      animateFunction: animateType,
      color: color,
      contentText: text,
      stickTo: direction,
      target: target
    });

    target.addEventListener('mouseenter',function(){
      tooltip.show();//鼠标在上面时显示tooltip
    });

    target.addEventListener('mouseleave',function(){
      tooltip.hide();//鼠标离开时取消显示
    });

    tooltip.mount();
    
    return tooltip;
}

/************************/
/*****识别手机横竖屏状态****/
/*****调整按钮图标的大小****/
/************************/

var screen_horizontal_check = true;
//判断手机横竖屏状态：  参考网上的代码
function hengshuping(){ 
    if(window.orientation==180||window.orientation==0)
    { 
        //alert("竖屏状态！") 
        large_ico();
        screen_horizontal_check = true;
    } 
    if(window.orientation==90||window.orientation==-90)
    { 
        //alert("横屏状态！") 
        tiny_ico();
        screen_horizontal_check = false;
    } 
} 
hengshuping();//打开网页就进行识别
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false); 



//移动设备适应图标大小
function ico_size(){
    if(isMobile.any == true && full_screen_check == false){
    //默认打开网页额时候放大按钮
        if(screen_horizontal_check){
            large_ico();
        }
        
        
    }else{
    //当全屏的时候 恢复按钮大小   
        tiny_ico();
        
    }
}

//大图标 设置的函数
function large_ico(){
    $("#main").css('padding','20px 48px ');
    $("#main").css('font-size','100px ');
    $("#help_btn").attr('width','64px');
    $("#full_btn").attr('width','64px'); 
    $("#share_btn").attr('width','64px');
    $("#stop_btn").attr('width','64px');
    $("#origin_btn").attr('width','64px');
    $("#color_dark_btn").attr('width','64px');
    $("#color_white_btn").attr('width','64px');
    
    $("#help_btn").attr('height','64px');
    $("#full_btn").attr('height','64px'); 
    $("#share_btn").attr('height','64px');
    $("#stop_btn").attr('height','64px');
    $("#origin_btn").attr('height','64px');
    $("#color_dark_btn").attr('height','64px');
    $("#color_white_btn").attr('height','64px');
          
    $("#help_btn").css('padding','20px 20px');
    $("#full_btn").css('padding','20px 20px'); 
    $("#share_btn").css('padding','20px 20px');
    $("#stop_btn").css('padding','20px 20px');
    $("#origin_btn").css('padding','20px 20px');
    $("#color_dark_btn").css('padding','20px 20px');
    $("#color_white_btn").css('padding','20px 20px');
    
    $("#help_btn").css('bottom','200px');
    $("#full_btn").css('bottom','325px'); 
    $("#share_btn").css('bottom','450px');
    $("#stop_btn").css('bottom','575px');
    $("#origin_btn").css('bottom','700px');
    $("#color_dark_btn").css('bottom','450px');
    $("#color_white_btn").css('bottom','450px');
        
    $("#help_btn").css('right','50px');
    $("#full_btn").css('right','50px'); 
    $("#share_btn").css('right','50px');
    $("#stop_btn").css('right','50px');
    $("#origin_btn").css('right','50px');
    $("#color_dark_btn").css('right','160px');
    $("#color_white_btn").css('right','270px');
}

//小图标 其实就是默认图标大小
function tiny_ico(){
    $("#main").css('padding','1px 15px ');
    $("#main").css('font-size','50px ');
    $("#help_btn").attr('width','32px');
    $("#full_btn").attr('width','32px'); 
    $("#share_btn").attr('width','32px');
    $("#stop_btn").attr('width','32px');
    $("#origin_btn").attr('width','32px');
    $("#color_dark_btn").attr('width','32px');
    $("#color_white_btn").attr('width','32px');
    
    $("#help_btn").attr('height','32px');
    $("#full_btn").attr('height','32px'); 
    $("#share_btn").attr('height','32px');
    $("#stop_btn").attr('height','32px');
    $("#origin_btn").attr('height','32px');
    $("#color_dark_btn").attr('height','32px');
    $("#color_white_btn").attr('height','32px');
          
    $("#help_btn").css('padding','5px 5px');
    $("#full_btn").css('padding','5px 5px'); 
    $("#share_btn").css('padding','5px 5px');
    $("#stop_btn").css('padding','5px 5px');
    $("#origin_btn").css('padding','5px 5px');
    $("#color_dark_btn").css('padding','5px 5px');
    $("#color_white_btn").css('padding','5px 5px');
    
    $("#help_btn").css('bottom','100px');
    $("#full_btn").css('bottom','150px'); 
    $("#share_btn").css('bottom','200px');
    $("#stop_btn").css('bottom','250px');
    $("#origin_btn").css('bottom','300px');
    $("#color_dark_btn").css('bottom','200px');
    $("#color_white_btn").css('bottom','200px');
        
    $("#help_btn").css('right','30px');
    $("#full_btn").css('right','30px'); 
    $("#share_btn").css('right','30px');
    $("#stop_btn").css('right','30px');
    $("#origin_btn").css('right','30px');
    $("#color_dark_btn").css('right','80px');
    $("#color_white_btn").css('right','130px');
}


/*************************/
/*******实现按钮功能********/
/************************/

/*主菜单 显示按钮功能*/
function icon_display(){  
    $("#help_btn").fadeToggle(100);
    $("#full_btn").fadeToggle(200);
    $("#share_btn").fadeToggle(300);
    $("#stop_btn").fadeToggle(400);
    $("#origin_btn").fadeToggle(500);
    $("#color_dark_btn").hide();
    $("#color_white_btn").hide();
    
}

/*按帮助按钮弹出窗口*/
function help_display(){
    
    //检测是否是移动设备 弹出不同的帮助文档 分别指示触摸和鼠标
    if(isMobile.any){
        //这里使用picoModal的弹框 代码引用自官方文档
    picoModal({
      content: 
       "<div style= 'float:left; margin:10px 10px ;'><center><img src = 'https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/sync.ico' width='100px' height='100px'></br>单手滑动进行旋转</center></div>" +
        "<div style= 'float:left; margin:10px 10px ;'><center><img src = 'https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/sync.ico' width='100px' height='100px'></br>双手滑动进行缩放</center></div>" +
        "<div style= 'float:left; margin:10px 10px ;'><center><img src = 'https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/sync.ico' width='100px' height='100px'></br>三指滑动进行平移</center></div>" 
       ,
      overlayStyles: function ( styles ) { styles.opacity = 0; },
      modalStyles: function ( styles ) { styles.opacity = 0; }
  })
  .afterShow(function(modal){
      $(modal.overlayElem()).animate({opacity: .5});
      $(modal.modalElem()).animate({opacity: 1});
  })
  .beforeClose(function(modal, event) {
      event.preventDefault();
      $(modal.overlayElem()).add(modal.modalElem())
          .animate(
              { opacity: 0 },
              { complete: modal.forceClose }
          );
  })
  .show();
    }else{
        //这里使用picoModal的弹框 代码引用自官方文档
    picoModal({
      content: 
       "<div style= 'float:left; margin:10px 10px ;'><center><img src = 'https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/sync.ico' width='100px' height='100px'></br>鼠标左键进行旋转</center></div>" +
        "<div style= 'float:left; margin:10px 10px ;'><center><img src = 'https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/sync.ico' width='100px' height='100px'></br>鼠标滚轮进行缩放</center></div>" +
        "<div style= 'float:left; margin:10px 10px ;'><center><img src = 'https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/sync.ico' width='100px' height='100px'></br>鼠标右键进行平移</center></div>" 
       ,
      overlayStyles: function ( styles ) { styles.opacity = 0; },
      modalStyles: function ( styles ) { styles.opacity = 0; }
  })
  .afterShow(function(modal){
      $(modal.overlayElem()).animate({opacity: .5});
      $(modal.modalElem()).animate({opacity: 1});
  })
  .beforeClose(function(modal, event) {
      event.preventDefault();
      $(modal.overlayElem()).add(modal.modalElem())
          .animate(
              { opacity: 0 },
              { complete: modal.forceClose }
          );
  })
  .show();
    }
    
}

/*分享按钮*/ //现在是背景颜色修改功能了 233

var share_click = true;
function share_display(){
    if(share_click){
        tooltip_background.set({stickTo:"right"});
        share_click = false;
        $("#color_dark_btn").toggle(500);
        $("#color_white_btn").toggle(500);
    }else{
        tooltip_background.set({stickTo:"left"});
        share_click = true;
        $("#color_dark_btn").toggle(500);
        $("#color_white_btn").toggle(500);
    }
    


}

//更改背景颜色的函数
function dark_BG(){
    scene.background = new THREE.Color( 0x333333 );//灰色背景
    
}

function white_BG(){
    scene.background = new THREE.Color( 0xF0FFFF );//白蓝色背景
    
}

/*旋转停止按钮*/
var rotate_check = true;
function rotate_stop(){
    if(rotate_check){
        rotate_check=false;  $("#stop_btn").attr("src","https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/jumplist_startalltask.ico");  //修改图标
        tooltip_stop.set({contentText:"开始旋转"});//修改tooltip提示
        html5tooltips.refresh();
    }else{
        rotate_check=true;  $("#stop_btn").attr("src","https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/jumplist_pausealltask.ico");//修改图标
        // tooltip_stop.set({contentText:'暂停旋转'});//修改tooltip提示
        html5tooltips.refresh();
    }   
}

/*设置全屏函数，供全屏按钮调用*/
var full_screen_check = false;

function full_screen_fun(){
    if(full_screen_check){
        exitFull();//退出全屏
        ico_size();//自动检测 自适应图标大小
    }else{
        requestFullScreen(document.documentElement);//  全屏整个网页
        ico_size();//自动检测 自适应图标大小
    }
    
};

//全屏功能
function requestFullScreen(element) {
    // 判断各种浏览器，找到正确的方法
    full_screen_check = true;
    var requestMethod = element.requestFullScreen || //W3C
    element.webkitRequestFullScreen ||    //Chrome等
    element.mozRequestFullScreen || //FireFox
    element.msRequestFullScreen; //IE11
    if (requestMethod) {
        requestMethod.call(element);
    }
    else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

//退出全屏 判断浏览器种类
function exitFull() {
    full_screen_check = false;
    // 判断各种浏览器，找到正确的方法
    var exitMethod = document.exitFullscreen || //W3C
    document.mozCancelFullScreen ||    //Chrome等
    document.webkitExitFullscreen || //FireFox
    document.webkitExitFullscreen; //IE11
    if (exitMethod) {
        exitMethod.call(document);
    }
    else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
} 


//摄像机回到默认位置
var camera_check;//默认摄像机就会自动归位

function origin_position(){ 
    camera_check = true;  //点击归位按钮自动归位
}

/*获取摄像机位置初值 采用vector向量约束*/

var cameraPosX,cameraPosY,cameraPosZ;
cameraPosX = 5;
cameraPosY = 2;
cameraPosZ = 3;

var PosRange = 0.3;
var PosChange = 0.3;

//摄像机位置修正 function
function cameraFix(){
    //约束摄像机目标点
    
    if(camera_orbitControl_check){
        controls.target = new THREE.Vector3(0, 0, 0)
    }

    //摄像机位置修正 通过持续递减和递增让摄像机复位
    if( camera.position.x >= cameraPosX+PosRange){
       camera.position.x -= PosChange;
    }
    if( camera.position.x <= cameraPosX-PosRange){
        camera.position.x += PosChange;
    } 
    
    
    if( camera.position.y >= cameraPosY+PosRange){
        camera.position.y -= PosChange;
    }
    if( camera.position.y <= cameraPosY-PosRange){
        camera.position.y += PosChange;
    }
    
    if( camera.position.z >= cameraPosZ+PosRange){
        camera.position.z -= PosChange;
    }
    if( camera.position.z <= cameraPosZ-PosRange){
        camera.position.z += PosChange;
    }
    
    //复位完成 关闭修正功能 
    if(camera.position.x <= cameraPosX+PosChange && camera.position.x >= cameraPosX-PosChange &&camera.position.y <= cameraPosY+PosChange && camera.position.y >= cameraPosY-PosChange &&camera.position.z <= cameraPosZ+PosChange && camera.position.z >= cameraPosZ-PosChange ){
        camera_check = false;  
    }  
}

/************************/
/******自动化按钮函数******/
/************************/

//自动修正摄像机位置
var cameraTimer;
var rotateTimer;

//旋转时停止旋转
document.getElementById("webgl").addEventListener('touchstart',rotate_AutoStop_0,false );
document.getElementById("webgl").addEventListener('touchend', rotate_AutoStop_1, false );

document.getElementById("webgl").addEventListener( 'mousedown',rotate_AutoStop_0,false );
document.getElementById("webgl").addEventListener( 'mouseup', rotate_AutoStop_1, false );

rotateTimer = setTimeout("rotate_stop();",10000);//定时10秒之后自动旋转
function rotate_AutoStop_0(){
        clearTimeout(rotateTimer);
        //clearTimeout(cameraTimer);
        rotate_check = true;
        rotate_stop();
}

function rotate_AutoStop_1(){
        
        rotateTimer=setTimeout("rotate_stop();",3000);
        //cameraTimer=setTimeout("camera_check = true;",10000);
}


/************************/
/************************/
/************************/

//这段代码可以在右上角显示帧率
//需要stats.min.js支持
var stats = new Stats();  
  
 stats.setMode(0);   
 stats.domElement.style.position = 'absolute';  
 stats.domElement.style.left = '0px';  
 stats.domElement.style.top = '0px';  
 document.body.appendChild(stats.domElement);  


/************************/
/*****webgl报错函数********/
/************************/

//浏览器不支持webgl时 弹出消息的函数 此处调用在最顶部
function webgl_fail() {
    //这里依然采用picoModal插件 代码复制自官方（修改弹出内容）
   picoModal({
      content: 
       "<center><strong>当前浏览器没有webgl功能</br>无法浏览本页面的的内容</br>您可以更新版本或者使用其他浏览器</br>推荐使用最新版的chrome浏览器<strong></center></br>"
       ,
      overlayStyles: function ( styles ) { styles.opacity = 0; },
      modalStyles: function ( styles ) { styles.opacity = 0; }
  })
  .afterShow(function(modal){
      $(modal.overlayElem()).animate({opacity: .5});
      $(modal.modalElem()).animate({opacity: 1});
  })
  .beforeClose(function(modal, event) {
      event.preventDefault();
      $(modal.overlayElem()).add(modal.modalElem())
          .animate(
              { opacity: 0 },
              { complete: modal.forceClose }
          );
  })
  .show();
}

//浏览器未开启webgl 弹出消息的函数
function webgl_update() {
   picoModal({
      content: 
       "<center><strong>当前浏览器没有开启webgl 无法加载本页面<strong></center></br></br>" +
       "<center><strong>需要在浏览器中开启 硬件加速功能 以加载webgl<strong></center></br></br>" +
       "<center><strong>如果开启 硬件加速功能 不能解决问题<strong></center></br>" +
       "<center><strong>说明你的显卡较弱被浏览器屏蔽<strong></center></br>" +
       "<center><strong>你需要在浏览器上的地址上输入\"chrome://flags\"</br>启用Override software rendering list 选项</br>（中文译名为：覆盖软件渲染列表）</br>然后重启浏览器<strong></center></br>" +
       "<center><strong>上述解决方案来自 <a href='https://www.zhihu.com/question/19647275'>@知乎</a><strong></center></br>" +
       "<center><strong>更多解决方案 <a href='http://blog.csdn.net/long405581649/article/details/22614153'>@链接</a><strong></center></br>" 
       ,
      overlayStyles: function ( styles ) { styles.opacity = 0; },
      modalStyles: function ( styles ) { styles.opacity = 0; }
  })
  .afterShow(function(modal){
      $(modal.overlayElem()).animate({opacity: .5});
      $(modal.modalElem()).animate({opacity: 1});
  })
  .beforeClose(function(modal, event) {
      event.preventDefault();
      $(modal.overlayElem()).add(modal.modalElem())
          .animate(
              { opacity: 0 },
              { complete: modal.forceClose }
          );
  })
  .show();
}



/*****************************/
/*********搭建三维场景**********/
/*设置好望向坐标原点的orbit摄像机*/
/****************************/

var scene = new THREE.Scene();//创建三维场景

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );//创建摄像机


var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha:false,
    preserveDrawingBuffer: false});//使用Webgl渲染 

renderer.setSize( window.innerWidth - 3, window.innerHeight-3 );//设置渲染的范围大小
renderer.setPixelRatio( window.devicePixelRatio );
renderer.shadowMapEnabled = true; //为渲染器开启 深度贴图阴影
//renderer.shadowMapType = THREE.PCFSoftShadowMap;

//将渲染的内容添加到HTML中
document.getElementById('webgl').appendChild( renderer.domElement );

//开启pointerLock摄像机
var controls;
var controlsEnabled = false;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var raycaster;
var objects = [];

function camera_pointerLockControl(){

    
    controls = new THREE.PointerLockControls( camera );
    scene.add( controls.getObject() );

    var onKeyDown = function ( event ) {

        switch ( event.keyCode ) {

            case 38: // up
            case 87: // w
                moveForward = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true; break;

            case 40: // down
            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;

            case 32: // space
                if ( canJump === true ) velocity.y += 250;
                canJump = false;
                break;

        }

    };

    var onKeyUp = function ( event ) {

        switch( event.keyCode ) {

            case 38: // up
            case 87: // w
                moveForward = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            case 83: // s
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;

        }

    };

    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );
    raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
    
}

function camera_pointerLockControl_block(){
        $('#webgl').append("<div id=\"blocker\"><div id=\"instructions\"><span style=\"font-size:40px\">点击开始</span><br />(键盘WASD键可以移动, 空格键可以跳跃, 鼠标可以控制镜头)</div></div>");

        var blocker = document.getElementById( 'blocker' );
        var instructions = document.getElementById( 'instructions' );

        var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

        if ( havePointerLock ) {

            var element = document.body;

            var pointerlockchange = function ( event ) {

                if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

                    controlsEnabled = true;
                    controls.enabled = true;

                    blocker.style.display = 'none';

                } else {

                    controls.enabled = false;

                    blocker.style.display = 'block';

                    instructions.style.display = '';

                }

            };

            var pointerlockerror = function ( event ) {

                instructions.style.display = '';

            };

            // Hook pointer lock state change events
            document.addEventListener( 'pointerlockchange', pointerlockchange, false );
            document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
            document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

            document.addEventListener( 'pointerlockerror', pointerlockerror, false );
            document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
            document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

            instructions.addEventListener( 'click', function ( event ) {

                instructions.style.display = 'none';

                // Ask the browser to lock the pointer
                element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
                element.requestPointerLock();

            }, false );

        } else {

            instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

        }
}

function camera_pointerLockControl_collison_detect(){
    var angle = controls.getObject().rotation.y;
                    
    var raycaster_top = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, 1, 0), 0, 1 );

    raycaster_top.ray.origin.copy( controls.getObject().position );

    var intersections_top = raycaster_top.intersectObjects( objects );

    if ( intersections_top.length > 0) {
        //console.log("detect_top");
        velocity.y = Math.min( 0, velocity.y );
    }


    var raycaster_front = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( -Math.sin(angle), 0, -Math.cos(angle)), 0, 2 );

    raycaster_front.ray.origin.copy( controls.getObject().position );

    var intersections_front = raycaster_front.intersectObjects( objects );

    if ( intersections_front.length > 0) {
        //console.log("detect_front");
        velocity.z = Math.max( 0, velocity.z );
    }

    var raycaster_back = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( -Math.sin(angle + Math.PI), 0, -Math.cos(angle + Math.PI)), 0, 2 );

    raycaster_back.ray.origin.copy( controls.getObject().position );

    var intersections_back = raycaster_back.intersectObjects( objects );

    if ( intersections_back.length > 0) {
        //console.log("detect_back");
        velocity.z = Math.min( 0, velocity.z );
    }

    var raycaster_left = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( -Math.sin(angle + Math.PI/2), 0, -Math.cos(angle + Math.PI/2)), 0, 2 );

    raycaster_left.ray.origin.copy( controls.getObject().position );

    var intersections_left = raycaster_left.intersectObjects( objects );

    if ( intersections_left.length > 0) {
        //console.log("detect_left");
        velocity.x = Math.max( 0, velocity.x );
    }

    var raycaster_right = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( -Math.sin(angle - Math.PI/2), 0, -Math.cos(angle - Math.PI/2)), 0, 2 );

    raycaster_right.ray.origin.copy( controls.getObject().position );

    var intersections_right = raycaster_right.intersectObjects( objects );

    if ( intersections_right.length > 0) {
        //console.log("detect_right");
        velocity.x = Math.min( 0, velocity.x );
    }

    var raycaster_down = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

    raycaster_down.ray.origin.copy( controls.getObject().position );
    //raycaster_down.ray.origin.y += 10;

    var intersections_down = raycaster_down.intersectObjects( objects );

    if ( intersections_down.length > 0) {
        velocity.y = Math.max( 0, velocity.y );
        canJump = true; 
    }
    
    var raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( -Math.sin(angle), 0, -Math.cos(angle)), 0, 5 );

    raycaster.ray.origin.copy( controls.getObject().position );

    var intersections = raycaster.intersectObjects( objects );

    if ( intersections.length > 0) {
        /*var glowMesh	= new THREEx.GeometricGlowMesh(intersections[0])
	    intersections[0].add(glowMesh.object3d)
        var insideUniforms	= glowMesh.insideMesh.material.uniforms
        insideUniforms.glowColor.value.set('white')
        var outsideUniforms	= glowMesh.outsideMesh.material.uniforms
        outsideUniforms.glowColor.value.set('white')*/
        
    }
}


//开启orbit摄像机
camera_orbitControl_check = false;
function camera_orbitControl(minDistance,maxDistance,enableDamping,dampingFactor,rotateSpeed,zoomSpeed){
    camera_orbitControl_check = true;
    //启用orbit摄像机 可以实现环绕360度摄像机 支持缩放功能 需要OrbitControls.js支持 
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    //设置摄像机的位置（摄像机在0，0，0位置，看不见东西）
    camera.position.z = 25;
    camera.position.y = 20;
    camera.position.x = 25;
    controls.target = new THREE.Vector3(0, 0, 0);
    //camera.lookAt(new THREE.Vector3(0, 30, 0));//使摄像机望向原点
    
    //这里为参数设置初值 
    /*
    a==b?b++:0
    这个就是如果a等于b成立，就返回b++，如果不成立，就返回0
    */
    minDistance = minDistance === undefined ? 3 : minDistance;
    maxDistance = maxDistance === undefined ? 25 : maxDistance;
    enableDamping = enableDamping === undefined ? true : enableDamping;
    dampingFactor = dampingFactor === undefined ? 0.1 : dampingFactor;
    rotateSpeed = rotateSpeed === undefined ? 0.15 : rotateSpeed;
    zoomSpeed = zoomSpeed === undefined ? 1 : zoomSpeed; 

    controls.enableDamping = enableDamping;
    controls.dampingFactor = dampingFactor;
    controls.rotateSpeed = rotateSpeed;
    controls.zoomSpeed = zoomSpeed;
    controls.maxDistance = maxDistance;
    controls.minDistance = minDistance;
}




window.addEventListener('resize',function()
{
    //调节窗口大小的时候可以自动刷新界面（否则渲染界面大小不改变）
    var width = window.innerWidth - 3;
    var height = window.innerHeight -3;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix(); 
    //当窗口过小的时候 图标放不下 所以使用小图标模式
    if(width<300 || height < 300){
                
                $("#main").hide();
                $("#help_btn").hide();
                $("#full_btn").hide();
                $("#share_btn").hide();
                $("#stop_btn").hide();
                $("#origin_btn").hide();
                $("#color_white_btn_small").show();
                $("#color_dark_btn_small").show();
                          
                
    }else{
        //当窗口够大回复默认状态
        $("#main").show();
        $("#color_white_btn_small").hide();
        $("#color_dark_btn_small").hide();
    }

})

/*******************/
/*****初始化灯光******/
/*******************/

//初始化环境灯光 营造更好地灯光效果
var ambientLight = getLight('ambient',1,0xFFFFFF);
//var ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
//ambientLight.position.set( 3, 1, 10 );
scene.add(ambientLight);

//创建平行光 
var directionalLight = getLight('directional',.7,0xFFFFFF);
directionalLight.position.set( 3, 1, 10 );
//scene.add(directionalLight);
var helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
scene.add(helper);

var rimLight = getLight('directional',0.5,0xFFFFFF);
rimLight.position.set( 0, 0, -20 );
//scene.add(rimLight);
var rimhelper = new THREE.DirectionalLightHelper( rimLight, 5 );
scene.add(rimhelper);

var fillLight = getLight('directional',0.3,0xFFFFFF);
fillLight.position.set( 3, 1, 10 );
//scene.add(fillLight);
var fillhelper = new THREE.DirectionalLightHelper( fillLight, 5 );
scene.add(fillhelper);

rimLight.castShadow  =false ;//关闭投射阴影的功能
fillLight.castShadow = false ;

var threeLightState = true;
function toggleThreeLight(){
    
    if(threeLightState){
        scene.add(directionalLight);
        scene.add(rimLight);
        scene.add(fillLight);
    }else{
       scene.remove(directionalLight);
        scene.remove(rimLight);
        scene.remove(fillLight); 
    }
    
}

//加载默认的白蓝色的背景
scene.background = new THREE.Color( 0xF0FFFF );



/*********/                        
/*函数封装*/
/********/


//加载环境环境贴图cubemap
function getEnvMap(path , format , fileNames){
//加载样式
//var path = '../../js/three.js-master/examples/textures/cube/skyboxsun25deg/';
//var format = '.jpg';
//var fileNames = ['px', 'nx', 'py', 'ny', 'pz', 'nz'];
    //如果参数没有定义设置初值 
    path= path === undefined ? 'https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/NEW_packed/texture/skyboxsun25deg/' : path;
    format= format === undefined ? '.jpg' : format;
    fileNames= fileNames === undefined ? ['px', 'nx', 'py', 'ny', 'pz', 'nz'] : format;
	var reflectionCube = new THREE.CubeTextureLoader(manager).load(fileNames.map(function(fileName) {
		return path + fileName + format;
	}));
    return reflectionCube;
    //这里参考lynda教程的写法
}

//材质函数封装
//这个是获取材质阴影的一种奇葩的方法，因为没法解决，所以用这种荒唐的做法修正材质无法投射阴影的问题
function shadowMaterial(selectedMaterial,castShadow,receiveShadow){
    var cube_obj = new THREE.BoxGeometry( 0.001, 0.001,0.001 );
    var cube2 = new THREE.Mesh( cube_obj, selectedMaterial );
    cube2.castShadow = true;
    cube2.receiveShadow = true;
    scene.add( cube2 );
}
function getMaterial(type,color,shadow,castShadow,receiveShadow) {
	var selectedMaterial;
    shadow = shadow === undefined ? true : shadow;
    castShadow = castShadow === undefined ? true : castShadow;
    receiveShadow = receiveShadow === undefined ? true : receiveShadow;
	var materialOptions = {
 
		color: color === undefined ? 'rgb(255, 255, 255)' : color,
        side: THREE.DoubleSide
	};//这里如果color没有定义直接定义为纯白，否则就color的值
    
    //下面是threejs内置的常用材质，可以加载第三方js来扩展材质
	switch (type) {
		case 'basic':
			selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
			break;//这个材质等同于Maya中的surface表面材质，不受灯光影响
		case 'lambert':
			selectedMaterial = new THREE.MeshLambertMaterial(materialOptions);
            if(shadow){
                shadowMaterial(selectedMaterial,castShadow,receiveShadow);
            }
			break;//这个材质等同于Maya中的lambert材质
		case 'phong':
			selectedMaterial = new THREE.MeshPhongMaterial(materialOptions);
            if(shadow){
                shadowMaterial(selectedMaterial,castShadow,receiveShadow);
            }
			break;//这个材质等同于Maya中的phong材质
		case 'standard':
			selectedMaterial = new THREE.MeshStandardMaterial(materialOptions);
            if(shadow){
                shadowMaterial(selectedMaterial,castShadow,receiveShadow);
            }
			break;//这个材质等同于unity的standrad材质，这个材质支持的功能相对较多，性能消耗最厉害
		default: 
			selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
			break;//默认是basic材质
	}

	return selectedMaterial;
}

//获取灯光函数的封装
function getLight(type,intensity, color, distant) {
    var light_check = true;
	color = color === undefined ? 'rgb(255, 255, 255)' : color;//设置颜色，与材质的相同
    distant = distant === undefined ? 50 : distant;//设置点光源初始值为50
    switch (type) {
		case 'spot':
			var light = new THREE.SpotLight(color, intensity);
			break;//创建聚光灯
		case 'point':
			var light = new THREE.PointLight(color, intensity ,distant);
			break;//创建点光源
		case 'directional':
			var light = new THREE.DirectionalLight(color, intensity);
			break;//创建平行光
		case 'ambient':
			var light = new THREE.AmbientLight(color, intensity);
            light_check = false;
			break;//创建环境光
		default: 
			var light = new THREE.PointLight(color, intensity);
			break;
    }
	//设置深度贴图的大小以及偏差值
    if(light_check){
        light.penumbra = 0.5;//使灯光边缘柔化
        light.castShadow = true;//开启阴影
        light.shadow.mapSize.width = 1024;//设置深度贴图的大小
        light.shadow.mapSize.height = 1024;
        light.shadow.bias = 0.001; //设置阴影偏差值
    }
	return light;
}


//导入manager

//进度条预加载 需要ProgressBar.js的支持 代码复制自官方
var bar = new ProgressBar.Line(container, { 
      strokeWidth: 4,
      easing: 'easeInOut',
      duration: 1000,
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: {width: '100%', height: '50%'},
      text: {
        style: {
          color: '#eee',
          position: 'absolute',
          right: '45%',
          top: '75%',
          padding: '5px',
          margin: 0,
          transform: null
        },
        autoStyleContainer: false
      },
      from: {color: '#FFEA82'},
      to: {color: '#1d815e'},
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
        bar.setText(Math.round(bar.value() * 100) + ' %');
      }
    });

var manager = new THREE.LoadingManager();  

manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    
    
};

manager.onLoad = function ( ) {
    //添加logo 眼睛
setTimeout("    $('#logo').append(\"<svg id='svg_fill' style='position: absolute;left:0px;' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400' ><defs><style>.a{fill:none;}.b{fill:#1d815e;}.c{fill:#3ea251;}</style></defs> <ellipse class='c' cx='127.2' cy='50.5' rx='15.2' ry='15.5'/> <path class='b' d='M354.1,298.4m85.8-14.3a54.6,54.6,0,0,1-16.6,4.3,57.8,57.8,0,0,1-9.7.1,55.7,55.7,0,0,1-9.6-1.5,58.6,58.6,0,0,1-12.1-4.5,56.9,56.9,0,0,1-15.7-12,63.5,63.5,0,0,1-5.4-6.9c-2.1-3.1-3.2-5.6-3.6-6.2a8.2,8.2,0,0,0-3.6-3.5,8.1,8.1,0,0,0-10.8,3.7,8,8,0,0,0,.1,7.2,69.8,69.8,0,0,0,4,7.1c2.2,3.3,4.9,6.7,5.5,7.4a72.6,72.6,0,0,0,11.6,11,71.5,71.5,0,0,0,14.4,8.5,75.6,75.6,0,0,0,13.9,4.5c1.9.4,4.6.9,6.3,1.1s6.8.6,8.3.6a77.5,77.5,0,0,0,17.6-1.9,72.5,72.5,0,0,0,17.4-6.6c1.7-.9,4.6-2.7,6.3-3.8a95.2,95.2,0,0,0,8.5-6.7,106,106,0,0,0,8.3-8.9,62.9,62.9,0,0,0,4.9-7.2c.9-1.4,2.4-4.4,3.6-6.8a74.6,74.6,0,0,0,4-10.8,76.1,76.1,0,0,0,2.3-12c.1-1.7.4-5.7.4-8.3s-.3-5.7-.3-5.8a74.8,74.8,0,0,0-3.1-15.2,81.1,81.1,0,0,0-4.1-10.2,8.2,8.2,0,0,0-12.5-2.6,8.3,8.3,0,0,0-2.4,3.5,8.3,8.3,0,0,0,.1,5.8,52.5,52.5,0,0,1,3.5,8.4c.6,2,1.2,4.3,1.4,5.2a23,23,0,0,1,.3,3.3,5.5,5.5,0,0,1-3.3,4.2c-2,.8-3.9.6-6.8-1-7.5-4.3-16.7-4.8-21.3-4.8-7.6-.1-16.8,3.4-21.9,5.6-13.5,5.9-15.7,8.3-23.9,8.3a25.5,25.5,0,0,1-18.1-7.8,25.2,25.2,0,0,1-7-15.8,24.1,24.1,0,0,1,1.5-10.7,25.7,25.7,0,0,1,3.8-6.8c1.6-2.1,3.9-4.2,8.1-7.5a61.1,61.1,0,0,1,12.6-7.1,54,54,0,0,1,12.7-3.5,65.6,65.6,0,0,1,15-.1,58.2,58.2,0,0,1,15.4,4.1,52.8,52.8,0,0,1,8.8,4.7c2.1,1.4,3.6,2.6,5.9,4.4a8.4,8.4,0,0,0,8.6.1,7.8,7.8,0,0,0,3.6-4.8,8.2,8.2,0,0,0-2.9-8.7l-3.8-2.9a77.9,77.9,0,0,0-7.1-4.5,72.4,72.4,0,0,0-9.1-4.3,70.7,70.7,0,0,0-19.3-4.5,73.8,73.8,0,0,0-15.9.3,69,69,0,0,0-14.7,3.5,57.7,57.7,0,0,0-8.9,3.9,51.2,51.2,0,0,0-8.1,4.8,63.7,63.7,0,0,0-14.1,13.1,40.9,40.9,0,0,0-6.5,13,38.7,38.7,0,0,0-1.7,10.7,43,43,0,0,0,2.6,15.6,42.2,42.2,0,0,0,9,14.1,43.7,43.7,0,0,0,13.4,9.3c8.3,3.5,13.6,3.3,18.3,3.4,12.1-.9,15-4.6,28-9.7s21.1-3.5,26.5-1.8,9.6,3.2,12.2,9.4a13.9,13.9,0,0,1,.8,5.2,33.2,33.2,0,0,1-1,6,24.6,24.6,0,0,1-3.3,7,22.7,22.7,0,0,1-2.1,2.8l-1.9,2c-.8.8-5.5,4.5-6.2,5.1C447.7,280.4,442.5,283,439.9,284.1Z' transform='translate(-268.6 -160.1)'/>\");",1000);
    //使加载图标消失
    setTimeout("$('#logo').fadeToggle(2000);",1000) ;
    //删除加载进度条
    setTimeout("bar.destroy();",4000);
    setTimeout("$('bar_Su').remove();",4000);
    setTimeout("$('bar_S').remove();",4000);
    setTimeout("$('bar_i_upper').remove();",4000);
    setTimeout("$('bar_i_lower').remove();",4000);
    setTimeout("$('bar_Yu').remove();",4000);
    setTimeout("$('bar_an').remove();",4000);
    setTimeout("camera_check = true;",2500) ;
    //关闭镜头模糊
    setTimeout("postprocessing.enabled = false;",2500) ;
    
    if(camera_orbitControl_check==false){
      setTimeout("camera_pointerLockControl_block();",2500);  
    }
    
    
    setTimeout("if(isMobile.any){full_screen_fun();}",2500) ;
        
    console.log( 'Loading complete!');
};


manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {


        
        
       /* var bar_dot = new ProgressBar.Path('#dot', {
          easing: 'easeInOut',
          duration: 1000
        });
        bar_dot.set(0);
        bar_dot.animate(itemsLoaded/itemsTotal); */
    
    bar.animate(itemsLoaded/itemsTotal); 
    setTimeout("bar_path_Su.animate(1);",100);
    setTimeout("bar_path_S.animate(1);  ",100);
    setTimeout("bar_path_i_upper.animate(1);",100);
    setTimeout("bar_path_i_lower.animate(1); ",100);
    setTimeout("bar_path_Y.animate(1); ",100);
    setTimeout("bar_path_Yu.animate(1); ",100);
    setTimeout("bar_path_an.animate(1);",100);


    console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

manager.onError = function ( url ) {

    console.log( 'There was an error loading ' + url );

};

//导入模型的封装函数
function getModel(modelPath,mtl){
    
//获取加载文件的后缀名
var arr=modelPath.split('.');//通过点将路径字符串切分
    
var format = arr[arr.length-1];// 那么后缀名就是数组最后一个元素
    switch(format){
        //通过switch匹配后缀名
        //这里采用正则表达式进行后缀名匹配，忽略后缀名的大小写 
        case (format.match(/obj$/i)||{}).input:
            
            /*****************************/
            /*********识别Obj加载**********/
            /****************************/
           
        //这里本来使用下面这个函数缩减代码量的，但是这样参数传递会导致未知的错误。
        //getObjModel(modelPath,mtl); 
        //为了稳定，我将代码从function里面拆了出来
        //这些函数并没有删除，提供更多的加载选择。
        //注意OBJ加载函数是背景模型加载专用的，加载OBJ要使用这个函数
        
        var loader = new THREE.OBJLoader(manager);//加载Obj加载器，需要OBJLoader.js的支持

        var model = new THREE.Group();//设置模型的大组，后面会return到外面

        var GeoY = new Array();//这个function内部的全局变量，用来储存模型各个部分的最低点
        
        //传入的参数如果是字符串 说明是路径 则加载mtlLoader 导入mtl文件
        if(typeof(mtl) == 'string'){
            //mtl为mtl文件路径 例如：'obj/bed.mtl'
            var arr=mtl.split('/');//按照/切割路径
            var mtl_file = arr[arr.length-1];//获取路径中最后一个元素 即‘bed.mtl’
            var arr = mtl.split(mtl_file);//按照最后一个元素切割路径 获取mtl文件之前的文件夹 即‘obj/’
            var mtl_folder = arr[0];

            THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader(manager) );//用于dds贴图的加载
            var mtlLoader = new THREE.MTLLoader(manager);//需要MTLLoader.js的支持
            mtlLoader.setPath( mtl_folder );//将mtl的文件夹路径设置进去
            //设置mtl文件传入的材质的部分属性 这里添加双面材质及重复贴图的处理
            mtlLoader.setMaterialOptions( {side:THREE.DoubleSide,wrap:THREE.MirroredRepeatWrapping } );
            //加载mtl
            //输入传入的路径
            mtlLoader.load( mtl_file, function( materials ) {
            materials.preload();//这行代码官方有，但是不知道有什么作用，去掉也无影响。
            loader.setMaterials( materials );//设置Obj的材质为mtl带有的材质
            //加载Obj文件
            loader.load( modelPath, function ( object ) {
               object.traverse(function(child) {
                   //设置所有的子对象都可以投射和接受阴影
                    child.castShadow = true;
                    child.recieveShadow = true;
                   objects.push( child );
                    
            } ); //完成OBJ文件的加载      
            //将模型添加到model组里面
            model.add( object );  
            backgroundY = backgroundY ===undefined ? 0 :backgroundY;//设置初值
            //让模型导入就到背景模型上
            model.position.y += backgroundY;
            });
        });
        }

        //传入的参数如果是材质（object）则直接赋到模型上
         if(typeof(mtl) == 'object'){
             loader.load(modelPath, function (object) {
                 //这里使用的方法与上面调用基本相同
            object.traverse(function(child) {
                    child.material = mtl;
                    child.castShadow = true;
                    child.recieveShadow = true;
                    objects.push( child );

            } );       
                //添加模型
                model.add( object ); 
                
                backgroundY = backgroundY ===undefined ? 0 :backgroundY;
                model.position.y += backgroundY;
            });
         }   

    return model;//返回模型
            
            
        break;//结束OBJ的导入
            
            
            
        //检测模型如果符合JSON的后缀名   
        case (format.match(/json$/i)||{}).input:
            
            /******************************/
            /*********识别Json加载**********/
            /*****************************/
            
        var loader = new THREE.JSONLoader(manager);//加载JSON文件 只需要three.js的支持
    
        var model = new THREE.Group();

        loader.load( modelPath, function ( geometry, materials ) {
            
        var mesh = new THREE.Mesh( geometry, materials );//将模型和材质添加到mesh中
        
        mesh.castShadow = true;
        mesh.recieveShadow = true;
        model.add(mesh);//添加到model组中
        objects.push( mesh );
        backgroundY = backgroundY ===undefined ? 0 :backgroundY;//设置初值
        
        model.position.y += backgroundY;//移动模型到地板上
        
        } );
        
            /********************************/
            /*********识别Object加载**********/
            /*******************************/
            
        var ObjectLoader = new THREE.ObjectLoader(manager);

        ObjectLoader.load(modelPath,function ( obj ) {
            obj.castShadow = true;
            obj.recieveShadow = true;
            model.add(obj);
            objects.push( obj );
            backgroundY = backgroundY ===undefined ? 0 :backgroundY;//设置初值
            model.position.y += backgroundY;//移动模型到地板上
        }

        );
        
        return model;
        break;
            
            
//        default:
//        return model;
//        break;
    }
}

//导入Object的函数封装
function getObjectModel(modelPath,mtl){
    
    var ObjectLoader = new THREE.ObjectLoader(manager);
    
    var model = new THREE.Group();
    
    ObjectLoader.load(modelPath,function ( obj ) {
        obj.castShadow = true;
        obj.recieveShadow = true;
        model.add(obj);
        backgroundY = backgroundY ===undefined ? 0 :backgroundY;//设置初值
        model.position.y += backgroundY;//移动模型到地板上
	}

    );
        
    return model;
}

//导入Json的函数封装
function getJsonModel(modelPath,mtl){
    
    var loader = new THREE.JSONLoader(manager);//加载JSON文件 只需要three.js的支持
    
    var model = new THREE.Group();
    
    loader.load( modelPath, function ( geometry, materials ) {

        //geometry.computeBoundingBox();  //获取模型的边界
        
          mtl = mtl === undefined ? materials :mtl;
        var mesh = new THREE.Mesh( geometry, mtl );//将模型和材质添加到mesh中
        
        mesh.castShadow = true;
        mesh.recieveShadow = true;
        model.add(mesh);//添加到model组中
        
        //changePivot(0,min,0,model);//修改模型轴心点到最低点上
        
        backgroundY = backgroundY ===undefined ? 0 :backgroundY;//设置初值
        model.position.y += backgroundY;//移动模型到地板上
        } );
        
        return model;
}

//导入Obj的函数封装
function getObjModel(modelPath,mtl,colorMap,bumpMap){

var loader = new THREE.OBJLoader(manager);//加载Obj加载器，需要OBJLoader.js的支持

        var model = new THREE.Group();//设置模型的大组，后面会return到外面

        var GeoY = new Array();//这个function内部的全局变量，用来储存模型各个部分的最低点
        
        //传入的参数如果是字符串 说明是路径 则加载mtlLoader 导入mtl文件
        if(typeof(mtl) == 'string'){
            //mtl为mtl文件路径 例如：'obj/bed.mtl'
            var arr=mtl.split('/');//按照/切割路径
            var mtl_file = arr[arr.length-1];//获取路径中最后一个元素 即‘bed.mtl’
            var arr = mtl.split(mtl_file);//按照最后一个元素切割路径 获取mtl文件之前的文件夹 即‘obj/’
            var mtl_folder = arr[0];

            THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader(manager) );//用于dds贴图的加载
            var mtlLoader = new THREE.MTLLoader(manager);//需要MTLLoader.js的支持
            mtlLoader.setPath( mtl_folder );//将mtl的文件夹路径设置进去
            //设置mtl文件传入的材质的部分属性 这里添加双面材质及重复贴图的处理
            mtlLoader.setMaterialOptions( {side:THREE.DoubleSide,wrap:THREE.MirroredRepeatWrapping } );
            //加载mtl
            //输入传入的路径
            mtlLoader.load( mtl_file, function( materials ) {
            materials.preload();//这行代码官方有，但是不知道有什么作用，去掉也无影响。
            loader.setMaterials( materials );//设置Obj的材质为mtl带有的材质
            //加载Obj文件
            loader.load( modelPath, function ( object ) {
      
               object.traverse(function(child) {
                   //设置所有的子对象都可以投射和接受阴影
                    child.castShadow = true;
                    child.recieveShadow = true;
                    if(colorMap !== undefined){
                        mtl.map = colorMap;//颜色贴图
                    }
                     if(bumpMap !== undefined){
                         mtl.bumpMap = bumpMap;//凹凸贴图
                     }
            } ); //完成OBJ文件的加载      
            //将模型添加到model组里面
            model.add( object );  
            
            backgroundY = backgroundY ===undefined ? 0 :backgroundY;//设置初值
            //让模型导入就到背景模型上
            model.position.y = backgroundY;
            });
        });
        }

        //传入的参数如果是材质（object）则直接赋到模型上
         if(typeof(mtl) == 'object'){
             loader.load(modelPath, function (object) {
                 //这里使用的方法与上面调用基本相同
            object.traverse(function(child) {
                    child.material = mtl;
                    child.castShadow = true;
                    child.recieveShadow = true;
                    if(colorMap !== undefined){
                        mtl.map = colorMap;//颜色贴图
                    }
                     if(bumpMap !== undefined){
                         mtl.bumpMap = bumpMap;//凹凸贴图
                     }
            } );       
                //添加模型
                model.add( object );    
                backgroundY = backgroundY ===undefined ? 0 :backgroundY;
                model.position.y = backgroundY;
            });
         }   

    return model;//返回模型
}



//背景obj函数封装
var background_obj_exist = false;
var backgroundY;
var background_material;
function background_obj(objPath,background_mtl,positionY,scale){
    positionY = positionY === undefined ? -3 :positionY;
    scale = scale === undefined ? 1.1 : scale;
    switch (objPath) {
		case 'capsule':
			    var background_path = 'https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/NEW_packed/BGobj/background_capsule.obj';
			break;
		default: 
			var background_path = objPath;
			break;
    }
    
    background_mtl = background_mtl === undefined ? getMaterial('standard',0x777777,true) :background_mtl;
    background_mtl.roughness = 1;
    var background_obj = getObjModel(background_path,background_mtl);
    scene.add(background_obj);  
    background_obj.scale.x = background_obj.scale.y =background_obj.scale.z = scale;
    background_obj.position.y = positionY;
    backgroundY = positionY;
    background_obj_exist =true;
    background_material = background_mtl;
    background_material.transparent = true;
    return background_obj;
}



//完成封装函数
var modelgrp = new THREE.Group();
scene.add(modelgrp);
modelgrp.recieveShadow = true;
modelgrp.castShadow = true;
function finish_init(model,floorCheck,floorPoxY){
    modelgrp.add( model );
    floorCheck = floorCheck === undefined ? false : floorCheck;
    floorPoxY = floorPoxY === undefined ? -3 : floorPoxY;
    _floorCheck = floorCheck;
    _floorPoxY = floorPoxY;
    update() ;
}

//update函数封装 

function update() {

    //确保每秒刷新60次场景
    requestAnimationFrame( update );



    //通过camera的摄像机将场景渲染出来
    renderer.render( scene, camera );

   stats.update();
    
    if(camera_orbitControl_check){
        controls.update();
    }else{
        rotate_check = false;
    }
    
    
    //实现摄像机回到初始位置
    if(camera_check == true && camera_orbitControl_check == true){
        cameraFix();
    }
    
    //实现模型自动旋转
    if(rotate_check){  
      modelgrp.rotation.y += 0.01;   
    }
    
    //锁定摄像机的最低位置
    if(_floorCheck){
        
        if(camera.position.y <_floorPoxY){
            camera.position.y = _floorPoxY;
        }
    } 
    
    //
    if(transformControls_rotate){
        transformControls.setMode( "rotate" );
    }
    if(transformControls_translate){
        transformControls.setMode( "translate" );
    }
    if(transformControls_scale){
        transformControls.setMode( "scale" );
    }
    
    if(background_obj_exist){
        if(camera.position.y  <backgroundY + 3 && background_material.opacity>0){
            background_material.opacity -= 0.1;
        }
        if(background_material.opacity<0){
            background_material.opacity = 0;
        }
        if(camera.position.y >backgroundY && background_material.opacity<.5){
          background_material.opacity += 0.05;  
        }
        
    }
    
    if ( controlsEnabled === true ) {
    
        var time = performance.now();
        var delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveLeft ) - Number( moveRight );
        direction.normalize(); // this ensures consistent movements in all directions

        if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;
        
        camera_pointerLockControl_collison_detect();
        
        /////////////////////////////////
        controls.getObject().translateX( velocity.x * delta );
        controls.getObject().translateY( velocity.y * delta );
        controls.getObject().translateZ( velocity.z * delta );

        if ( controls.getObject().position.y < 10 ) {

            velocity.y = 0;
            controls.getObject().position.y = 10;

            canJump = true;

        }

        prevTime = time;

    }
    
    postprocessing_blur();
}

/****************************/
/***Postprocessing 后期处理***/
/***************************/
//Postprocessing 使场景模糊

var postprocessing = { enabled  : true };
var shaderSettings = {rings: 3,samples: 4};
function initPostprocessing() {

    postprocessing.scene = new THREE.Scene();

    postprocessing.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2,  window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
    postprocessing.camera.position.z = 100;

    postprocessing.scene.add( postprocessing.camera );

    var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat };
    postprocessing.rtTextureDepth = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, pars );
    postprocessing.rtTextureColor = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, pars );



    var bokeh_shader = THREE.BokehShader;

    postprocessing.bokeh_uniforms = THREE.UniformsUtils.clone( bokeh_shader.uniforms );

    postprocessing.bokeh_uniforms[ "tColor" ].value = postprocessing.rtTextureColor.texture;
    postprocessing.bokeh_uniforms[ "tDepth" ].value = postprocessing.rtTextureDepth.texture;

    postprocessing.bokeh_uniforms[ "textureWidth" ].value = window.innerWidth;

    postprocessing.bokeh_uniforms[ "textureHeight" ].value = window.innerHeight;

    postprocessing.materialBokeh = new THREE.ShaderMaterial( {

        uniforms: postprocessing.bokeh_uniforms,
        vertexShader: bokeh_shader.vertexShader,
        fragmentShader: bokeh_shader.fragmentShader,
        defines: {
            RINGS: shaderSettings.rings,
            SAMPLES: shaderSettings.samples
        }

    } );

    postprocessing.quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight ), postprocessing.materialBokeh );
    postprocessing.quad.position.z = - 500;
    postprocessing.scene.add( postprocessing.quad );
    postprocessing.bokeh_uniforms[ "maxblur" ].value = 3.0;
    postprocessing.bokeh_uniforms[ "manualdof" ].value = false;
    postprocessing.bokeh_uniforms[ "vignetting" ].value = false;
    postprocessing.bokeh_uniforms[ "depthblur" ].value = false;
    postprocessing.bokeh_uniforms[ "threshold" ].value = 0;
    postprocessing.bokeh_uniforms[ "gain" ].value = 0;
    postprocessing.bokeh_uniforms[ "bias" ].value = 0;
    postprocessing.bokeh_uniforms[ "fringe" ].value = 0;

}

initPostprocessing();

var material_depth = new THREE.MeshDepthMaterial();
function postprocessing_blur(){
    

    if ( postprocessing.enabled ) {

        renderer.clear();

        scene.overrideMaterial = null;
        renderer.render( scene, camera, postprocessing.rtTextureColor, true );

        scene.overrideMaterial = material_depth;
        renderer.render( scene, camera, postprocessing.rtTextureDepth, true );

        renderer.render( postprocessing.scene, postprocessing.camera );


    } else {

        scene.overrideMaterial = null;

        renderer.clear();
        renderer.render( scene, camera );

    }
}





/****************/
/***设置调节GUI***/
/***************/

//设置灯光的位置
directionalLight.position.x = 12;
directionalLight.position.y = 18.5;
directionalLight.position.z = 17;
directionalLight.rotation.x = -0.5;
directionalLight.rotation.y = 0.2;
directionalLight.rotation.z = 0.25;

fillLight.position.x = -20;
fillLight.position.y = 14;
fillLight.position.z = 9;
fillLight.rotation.x = -0.9;
fillLight.rotation.y = -1.1;
fillLight.rotation.z = 0.28;

//添加灯光的GUI
var gui = new dat.GUI();
helper.visible = false;
fillhelper.visible = false;
rimhelper.visible = false;
var h = gui.addFolder( "light control" );
h.add( directionalLight, "intensity", 0, 20.0, .1 ).name( "光照强度" );
h.add( directionalLight.position, "x", -20 , 20.0, 0.5 ).name( "PosX" );
h.add( directionalLight.position, "y", -20, 20.0, 0.5).name( "PosY" );
h.add( directionalLight.position, "z", -20, 20.0, 0.5 ).name( "PosZ" );
h.add( directionalLight.rotation, "x", -180* Math.PI /180, 180.0* Math.PI /180, 0.25* Math.PI /180 ).name( "RotX" );
h.add( directionalLight.rotation, "y", -180* Math.PI /180, 180.0* Math.PI /180, 0.25* Math.PI /180).name( "RotY" );
h.add( directionalLight.rotation, "z", -180* Math.PI /180, 180.0* Math.PI /180, 0.25* Math.PI /180 ).name( "RotZ" );
h.add(helper,"visible").name("灯光助手");

var h = gui.addFolder( "rim control" );
h.add( rimLight, "intensity", 0, 20.0, .1 ).name( "光照强度" );
h.add( rimLight.position, "x", -20 , 20.0, 0.5 ).name( "PosX" );
h.add( rimLight.position, "y", -20, 20.0, 0.5).name( "PosY" );
h.add( rimLight.position, "z", -20, 20.0, 0.5 ).name( "PosZ" );
h.add( rimLight.rotation, "x", -180* Math.PI /180, 180.0* Math.PI /180, 0.25* Math.PI /180 ).name( "RotX" );
h.add( rimLight.rotation, "y", -180* Math.PI /180, 180.0* Math.PI /180, 0.25* Math.PI /180).name( "RotY" );
h.add( rimLight.rotation, "z", -180* Math.PI /180, 180.0* Math.PI /180, 0.25* Math.PI /180 ).name( "RotZ" );
h.add(rimhelper,"visible").name("灯光助手");

var h = gui.addFolder( "fill control" );
h.add( fillLight, "intensity", 0, 20.0, .1 ).name( "光照强度" );
h.add( fillLight.position, "x", -20 , 20.0, 0.5 ).name( "PosX" );
h.add( fillLight.position, "y", -20, 20.0, 0.5).name( "PosY" );
h.add( fillLight.position, "z", -20, 20.0, 0.5 ).name( "PosZ" );
h.add( fillLight.rotation, "x", -180* Math.PI /180, 180.0* Math.PI /180, 0.25* Math.PI /180 ).name( "RotX" );
h.add( fillLight.rotation, "y", -180* Math.PI /180, 180.0* Math.PI /180, 0.25* Math.PI /180).name( "RotY" );
h.add( fillLight.rotation, "z", -180* Math.PI /180, 180.0* Math.PI /180, 0.25* Math.PI /180 ).name( "RotZ" );
h.add(fillhelper,"visible").name("灯光助手");

var h = gui.addFolder( "ambient control" );
h.add( ambientLight, "intensity", 0, 20.0, .1 ).name( "光照强度" );

//双击主菜单按钮 可以开启高级模式 打开gui 和 帧率显示

express();
var express_check = true;
function express(){
    dat.GUI.toggleHide();//显示灯光控制
    if(express_check){
        document.body.appendChild(stats.domElement); //添加帧率显示
        express_check = false;
        express_control();
        rotate_check = true;
        rotate_stop();
    }else{
        document.body.removeChild(stats.domElement); 
        express_check = true;

        scene.remove( gridHelper );
        scene.remove( transformControls );
        $("#panel").hide();
        rotate_check = false;
        rotate_stop();
    }
    
}

var transformControls,gridHelper;
var transformControls_check = false;
var transformControls_rotate = false;
var transformControls_translate = false;
var transformControls_scale = false;
function express_control(){
    
    transformControls_check = false; 
    
    transformControls_check = true;
    //添加网格显示
    gridHelper = new THREE.GridHelper( 10, 10 );
    scene.add( gridHelper );
    
    transformControls = new THREE.TransformControls( camera, renderer.domElement );
    //selectControl.addEventListener( 'change', selectControl.update );

    transformControls.attach( RotateGrp );
    scene.add( transformControls );
    
    $("#panel").show();
    
    window.addEventListener( 'keydown', function ( event ) {

        switch ( event.keyCode ) {

            case 81: // Q
                transformControls.setSpace( transformControls.space === "local" ? "world" : "local" );
                break;

            case 17: // Ctrl
                transformControls.setTranslationSnap( 100 );
                transformControls.setRotationSnap( THREE.Math.degToRad( 15 ) );
                break;

            case 87: // W
                transformControls.setMode( "translate" );
                transformControls_rotate = false;
                transformControls_translate = true;
                transformControls_scale = false;
                break;

            case 69: // E
                transformControls.setMode( "rotate" );
                transformControls_rotate = true;
                transformControls_translate = false;
                transformControls_scale = false;
                break;

            case 82: // R
                transformControls.setMode( "scale" );
                transformControls_rotate = false;
                transformControls_translate = false;
                transformControls_scale = true;
                break;

            case 187:
            case 107: // +, =, num+
                transformControls.setSize( transformControls.size + 0.1 );
                break;

            case 189:
            case 109: // -, _, num-
                transformControls.setSize( Math.max( transformControls.size - 0.1, 0.1 ) );
                break;

        }

    });

    window.addEventListener( 'keyup', function ( event ) {

        switch ( event.keyCode ) {

            case 17: // Ctrl
                control.setTranslationSnap( null );
                control.setRotationSnap( null );
                break;

        }

    });
    
    //object
    
}

