/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.Project = function ( editor ) {

	var config = editor.config;
	var signals = editor.signals;

	var rendererTypes = {

		'WebGLRenderer': THREE.WebGLRenderer,
		'CanvasRenderer': THREE.CanvasRenderer,
		'SVGRenderer': THREE.SVGRenderer,
		'SoftwareRenderer': THREE.SoftwareRenderer,
		'RaytracingRenderer': THREE.RaytracingRenderer

	};

	var container = new UI.Panel();
	container.setBorderTop( '0' );
	container.setPaddingTop( '20px' );

	// Title

	var titleRow = new UI.Row();
	var title = new UI.Input( config.getKey( 'project/title' ) ).setLeft( '100px' ).onChange( function () {

		config.setKey( 'project/title', this.getValue() );

	} );

	titleRow.add( new UI.Text( '网页标题' ).setWidth( '90px' ) );
	titleRow.add( title );

	container.add( titleRow );

	// Editable

	var editableRow = new UI.Row();
	var editable = new UI.Checkbox( config.getKey( 'project/editable' ) ).setLeft( '100px' ).onChange( function () {

		config.setKey( 'project/editable', this.getValue() );

	} );

	editableRow.add( new UI.Text( '修改按钮' ).setWidth( '90px' ) );
	editableRow.add( editable );

//	container.add( editableRow );

	// VR

	var vrRow = new UI.Row();
	var vr = new UI.Checkbox( config.getKey( 'project/vr' ) ).setLeft( '100px' ).onChange( function () {

		config.setKey( 'project/vr', this.getValue() );

	} );

	vrRow.add( new UI.Text( 'VR' ).setWidth( '90px' ) );
	vrRow.add( vr );

//	container.add( vrRow );

	// Renderer

	var options = {};

	for ( var key in rendererTypes ) {

		if ( key.indexOf( 'WebGL' ) >= 0 && System.support.webgl === false ) continue;

		options[ key ] = key;

	}

	var rendererTypeRow = new UI.Row();
	var rendererType = new UI.Select().setOptions( options ).setWidth( '150px' ).onChange( function () {

		var value = this.getValue();

		config.setKey( 'project/renderer', value );

		updateRenderer();

	} );

	rendererTypeRow.add( new UI.Text( 'Renderer' ).setWidth( '90px' ) );
	rendererTypeRow.add( rendererType );

//	container.add( rendererTypeRow );

	if ( config.getKey( 'project/renderer' ) !== undefined ) {

		rendererType.setValue( config.getKey( 'project/renderer' ) );

	}

	// Renderer / Antialias

	var rendererPropertiesRow = new UI.Row().setMarginLeft( '90px' );

	var rendererAntialias = new UI.THREE.Boolean( config.getKey( 'project/renderer/antialias' ), '抗锯齿' ).onChange( function () {

		config.setKey( 'project/renderer/antialias', this.getValue() );
		updateRenderer();

	} );
	rendererPropertiesRow.add( rendererAntialias );

	// Renderer / Shadows

	var rendererShadows = new UI.THREE.Boolean( config.getKey( 'project/renderer/shadows' ), '阴影' ).onChange( function () {

		config.setKey( 'project/renderer/shadows', this.getValue() );
		updateRenderer();

	} );
	rendererPropertiesRow.add( rendererShadows );

	rendererPropertiesRow.add( new UI.Break() );

	// Renderer / Gamma input

	var rendererGammaInput = new UI.THREE.Boolean( config.getKey( 'project/renderer/gammaInput' ), '输入端伽马校正' ).onChange( function () {

		config.setKey( 'project/renderer/gammaInput', this.getValue() );
		updateRenderer();

	} );
	rendererPropertiesRow.add( rendererGammaInput );
    
    rendererPropertiesRow.add( new UI.Break() );
    
	// Renderer / Gamma output

	var rendererGammaOutput = new UI.THREE.Boolean( config.getKey( 'project/renderer/gammaOutput' ), '输出端伽马校正' ).onChange( function () {

		config.setKey( 'project/renderer/gammaOutput', this.getValue() );
		updateRenderer();

	} );
	rendererPropertiesRow.add( rendererGammaOutput );

	container.add( rendererPropertiesRow );
    
    rendererPropertiesRow.add( new UI.Break() );
    rendererPropertiesRow.add( new UI.Break() );
    
    var lightToggle = false;
    var rendererGammaOutput = new UI.THREE.Boolean( config.getKey( lightToggle ), '三点照明' ).onChange( function () {
        console.log(lightToggle);
        if(lightToggle == false){
        var directionalLight = new THREE.DirectionalLight('rgb(255, 255, 255)', 0.7);
        directionalLight.name = '主光';
        
        directionalLight.position.set( 7, 1, 10 );
        editor.execute( new AddObjectCommand( directionalLight ) );

        var rimLight = new THREE.DirectionalLight('rgb(255, 255, 255)', 0.5);
        rimLight.name = '轮廓光';
        
        rimLight.position.set( 0, 0, -20 );
        editor.execute( new AddObjectCommand( rimLight ) );

        var fillLight = new THREE.DirectionalLight('rgb(255, 255, 255)', 0.3);
        fillLight.name = '补光';
        
        fillLight.position.set( -5, 1, 10 );
        editor.execute( new AddObjectCommand( fillLight ) ); 
            
        var ligthGroup = new THREE.Group();
        ligthGroup.add(directionalLight);
        ligthGroup.add(fillLight);
        ligthGroup.add(rimLight);
        editor.execute( new AddObjectCommand( ligthGroup ) );
            
        lightToggle = true;
        }else{
            
            editor.execute( new RemoveObjectCommand( rimLight ) );
            
            editor.execute( new RemoveObjectCommand( directionalLight ) );

            editor.execute( new RemoveObjectCommand( fillLight ) );

            lightToggle = false;    
        }
        

	} );
	rendererPropertiesRow.add( rendererGammaOutput );

	container.add( rendererPropertiesRow );

	//

	function updateRenderer() {

		createRenderer( rendererType.getValue(), rendererAntialias.getValue(), rendererShadows.getValue(), rendererGammaInput.getValue(), rendererGammaOutput.getValue() );

	}

	function createRenderer( type, antialias, shadows, gammaIn, gammaOut ) {

		if ( type === 'WebGLRenderer' && System.support.webgl === false ) {

			type = 'CanvasRenderer';

		}

		rendererPropertiesRow.setDisplay( type === 'WebGLRenderer' ? '' : 'none' );

		var renderer = new rendererTypes[ type ]( { antialias: antialias} );
		renderer.gammaInput = gammaIn;
		renderer.gammaOutput = gammaOut;
		if ( shadows && renderer.shadowMap ) {

			renderer.shadowMap.enabled = true;
			// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		}

		signals.rendererChanged.dispatch( renderer );

	}

	createRenderer( config.getKey( 'project/renderer' ), config.getKey( 'project/renderer/antialias' ), config.getKey( 'project/renderer/shadows' ), config.getKey( 'project/renderer/gammaInput' ), config.getKey( 'project/renderer/gammaOutput' ) );

	return container;

};
