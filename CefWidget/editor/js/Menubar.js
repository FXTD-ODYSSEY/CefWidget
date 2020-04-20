/**
 * @author mrdoob / http://mrdoob.com/
 */

var Menubar = function ( editor ) {

	var container = new UI.Panel();
	container.setId( 'menubar' );

	var text = new UI.Text("Zeus 三维浏览器")
	text.setId( 'title' );
	container.add(text)
	text.dom.style.cssText = `
	text-align: center;
    color: white;
    font-size: large;
    font-weight: bold;
    right: 20px;
    position: absolute;
	`
	

	container.add( new Menubar.File( editor ) );
	container.add( new Menubar.Edit( editor ) );
	container.add( new Menubar.Add( editor ) );
	container.add( new Menubar.Help( editor ) );


	return container;

};
