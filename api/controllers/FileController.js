/**
 * FilesController
 *
 * @description :: Server-side logic for managing Files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

 	filesList : function(req, res) {

 		File.find({}).populate('author').exec(function filesFound(err, files) {

 			if (err) { return res.showView('500'); }

 			res.showView('File/index', { files: files, saved : req.param('saved', 0) });
 		});
 	},	

 	upload : function(req, res){

 		req.file('uploadedFile').upload({
		    // don't allow the total upload size to exceed ~10MB
		    maxBytes: 10000000,
		    dirname: require('path').dirname(__filename) + '/../../assets/files'
		},function whenDone(err, uploadedFiles) {

			if (err) { return res.showView('500'); }

		    // If no files were uploaded, respond with an error.
		    if (uploadedFiles.length === 0){
		    	return res.badRequest('No file was uploaded');
		    }

		    for(var i = 0; i < uploadedFiles.length; i++){
		    	File.create({
		    		filename 	: uploadedFiles[i].filename,
		    		localname 	: uploadedFiles[i].fd.replace(/^(.*?)([0-9\-a-z\.]*)$/,'$2'),
		    		author		: req.session.me
		    	}, function (err, file) {
			  		if (err) return res.showView('500', { error : err });			  		
			  	});
		    }
		    res.redirect('/filesPage/?saved=1');

		});

 	},

 	remove : function(req, res) {
		var id = req.param('id');

		if (!id) return res.showView('404');

		File.findOne(id, function (err, file) {

			if(err) { return res.showView('500'); }
			if(!file) { return res.showView('404'); }

			require('fs').unlink(require('path').dirname(__filename) + '/../../assets/files/' + file.localname);

			File.destroy(id, function courseDestroyed(err) {

				if(err) { return res.showView('500'); }

				return res.redirect('/filesPage');
			});

		})
	},
 };

