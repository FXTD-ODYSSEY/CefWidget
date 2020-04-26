/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.File = function (editor) {

	var NUMBER_PRECISION = 6;

	function parseNumber(key, value) {

		return typeof value === 'number' ? parseFloat(value.toFixed(NUMBER_PRECISION)) : value;

	}

	//

	var config = editor.config;

	var container = new UI.Panel();
	container.setClass('menu');

	var title = new UI.Panel();
	title.setClass('title');
	title.setTextContent('文件');
	container.add(title);

	var options = new UI.Panel();
	options.setClass('options');
	container.add(options);

	// New

	var option = new UI.Row();
	option.setClass('option');
	option.setTextContent('新建');
	option.onClick(function () {

		if (confirm('没有发布的部分将会丢失，你确定吗？')) {

			editor.clear();

		}

	});
	options.add(option);

	//

	options.add(new UI.HorizontalRule());

	// Import

	var form = document.createElement('form');
	form.style.display = 'none';
	document.body.appendChild(form);

	var fileInput = document.createElement('input');
	fileInput.type = 'file';
	fileInput.addEventListener('change', function (event) {

		//		editor.loader.loadFile( fileInput.files[ 0 ] );
		editor.loader.loadFile(fileInput.files[0]);
		form.reset();

	});
	form.appendChild(fileInput);

	var option = new UI.Row();
	option.setClass('option');
	option.setTextContent('导入');
	option.onClick(function () {

		fileInput.click();

	});
	options.add(option);

	//

	options.add(new UI.HorizontalRule());

	// Publish

	var option = new UI.Row();
	option.setClass('option');
	option.setTextContent('保存');
	option.onClick(function () {

		//		var zip = new JSZip();
		//

		var output = editor.toJSON();
		output.metadata.type = 'App';
		output.camera.object.control = true;
		delete output.history;

		// var vr = output.project.vr;
		output = JSON.stringify(output, parseNumber, '\t');
		output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');

		$('#uploadText').fadeToggle(1000);
		$('#background_block').fadeToggle(1000);

		var form = new FormData();
		form.append("data", output);
		form.append("format", "json");

		var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": window.location.host + "/api/upload/model",
		  "method": "POST",
		  "processData": false,
		  "contentType": false,
		  "mimeType": "multipart/form-data",
		  "data": form
		}

		$.ajax(settings).done(function (response) {
			$('#uploadText').fadeToggle(1000);
			$('#background_block').fadeToggle(1000);
			text = new UI.Text("上传成功")
			editor.signals.showModal.dispatch(text);
		    //   window.location.href="http://3d.suiyuankj.com/manage/model/windclose";
		});


	});
	options.add(option);


	//

	var link = document.createElement('a');
	link.style.display = 'none';
	document.body.appendChild(link); // Firefox workaround, see #6594

	function save(blob, filename) {

		link.href = URL.createObjectURL(blob);
		link.download = filename || 'data.json';
		link.click();
		//        window.open( 'https://github.com/mrdoob/three.js/tree/master/editor', '_blank' )

		// URL.revokeObjectURL( url ); breaks Firefox...

	}

	function saveString(text, filename) {

		save(new Blob([text], { type: 'text/plain' }), filename);

	}

	return container;

};

