/**
 * @author mrdoob / http://mrdoob.com/
 */

Viewport.Info = function (editor) {

	var signals = editor.signals;

	var container = new UI.Panel();
	container.setId('info');
	container.setPosition('absolute');
	container.setLeft('10px');
	container.setBottom('72px');
	container.setFontSize('12px');
	container.setColor('#fff');

	var objectsText = new UI.Text('0').setMarginLeft('6px');
	var verticesText = new UI.Text('0').setMarginLeft('6px');
	var trianglesText = new UI.Text('0').setMarginLeft('6px');

	container.add(new UI.Text('对象个数'), objectsText, new UI.Break());
	container.add(new UI.Text('点个数'), verticesText, new UI.Break());
	container.add(new UI.Text('三角形个数'), trianglesText, new UI.Break());

	signals.objectAdded.add(update);
	signals.objectRemoved.add(update);
	signals.geometryChanged.add(update);

	// NOTE 选择物体显示对应的多边形面数
	signals.objectSelected.add(function (object) {

		var objects = 1, vertices = 0, triangles = 0;
		if (object instanceof THREE.Mesh) {

			var geometry = object.geometry;

			if (geometry instanceof THREE.Geometry) {

				vertices += geometry.vertices.length;
				// console.log("Geometry vertices", vertices)
				triangles += geometry.faces.length;

			} else if (geometry instanceof THREE.BufferGeometry) {

				if (geometry.index !== null) {

					vertices += geometry.index.count / 3;
					// console.log("BufferGeometry vertices", vertices)
					triangles += geometry.index.count;

				} else {

					vertices += geometry.attributes.position.count;
					// console.log("vertices", vertices)
					triangles += geometry.attributes.position.count / 3;

				}

			}

			objectsText.setValue(objects.format());
			verticesText.setValue(vertices.format());
			trianglesText.setValue(triangles.format());

		} else {
			update()
		}

	});


	function update() {

		var scene = editor.scene;

		var objects = 0, vertices = 0, triangles = 0;

		for (var i = 0, l = scene.children.length; i < l; i++) {

			var object = scene.children[i];

			object.traverseVisible(function (object) {

				objects++;

				if (object instanceof THREE.Mesh) {

					var geometry = object.geometry;

					if (geometry instanceof THREE.Geometry) {

						vertices += geometry.vertices.length;
						// console.log("Geometry vertices", vertices)
						triangles += geometry.faces.length;

					} else if (geometry instanceof THREE.BufferGeometry) {

						if (geometry.index !== null) {

							vertices += geometry.index.count / 3;
							// console.log("BufferGeometry vertices", vertices)
							triangles += geometry.index.count;

						} else {

							vertices += geometry.attributes.position.count;
							// console.log("vertices", vertices)
							triangles += geometry.attributes.position.count / 3;

						}

					}

				}

			});

		}

		objectsText.setValue(objects.format());
		verticesText.setValue(vertices.format());
		trianglesText.setValue(triangles.format());

	}

	return container;

};
