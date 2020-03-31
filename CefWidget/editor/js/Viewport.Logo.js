/**
 * @author mrdoob / http://mrdoob.com/
 */

Viewport.Logo = function ( editor ) {

//	var signals = editor.signals;

	var container = new UI.Panel();
	container.setId( 'logo' );
	container.setPosition( 'absolute' );
	container.setRight( '10px' );
	container.setBottom( '10px' );
    // $(document).ready(function(){
    // $("#logo").append("<img src='plugin/logo.png' height='60'>");
    // });


	return container;

};
