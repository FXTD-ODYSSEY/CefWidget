/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.Help = function ( editor ) {

	var container = new UI.Panel();
	container.setClass( 'menu' );

	var title = new UI.Panel();
	title.setClass( 'title' );
	title.setTextContent( '帮助' );
	container.add( title );

	var options = new UI.Panel();
	options.setClass( 'options' );
	container.add( options );

	// Source code

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( '使用说明' );
	option.onClick( function () {

		var panel = new UI.Panel();
		panel.setClass( 'title' );
		panel.setTextContent( '使用说明' );
		
		var hr = new UI.HorizontalRule();
		panel.add(hr)
		
		var help1 = new UI.Text("左键控制镜头旋转")
		panel.add(help1)
		var help2 = new UI.Text("右键控制镜头平移")
		panel.add(help2)
		var help3 = new UI.Text("滚轮控制镜头缩放")
		panel.add(help3)
		
		var hr = new UI.HorizontalRule();
		panel.add(hr)
		
		var help4 = new UI.Text("右下角有主菜单按钮")
		panel.add(help4)

		editor.signals.showModal.dispatch(panel);
		//window.open( 'https://github.com/mrdoob/three.js/tree/master/editor', '_blank' )

	} );
	options.add( option );

	// About

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( '关于' );
	option.onClick( function () {

		var panel = new UI.Panel();
		panel.setClass( 'title' );
		panel.setTextContent( '使用说明' );
		
		panel.add(new UI.HorizontalRule())
		
		panel.add(new UI.Text("当前开发版本 ver 1.0"))
		panel.add(new UI.Text("更新视窗显示|添加说明文档"))
		panel.add(new UI.HorizontalRule())
		
		editor.signals.showModal.dispatch(panel);

		// window.open( 'http://www.suiyuankj.com', '_blank' );

	} );
	// options.add( option );

	return container;

};
