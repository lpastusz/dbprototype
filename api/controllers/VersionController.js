/**
 * VersionController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	list : function(req, res) {
		Version.find({}).exec(function coursesFound(err, versions) {

			if (err) { return res.showView('500'); }

			res.showView('Version/index', { versions: versions, saved : req.param('saved', 0) });
		});
	},

	create: function(req,res) {
		var params = _.extend(req.query || {}, req.params || {}, req.body || {});

	  	Version.create({
	  		name : params.name,
	  		updateDate : params.updateDate,
	  		version : params.version
	  	}, function (err) {

	  		if (err) return res.showView('500', { error : err });

	  		res.redirect('/versions?saved=1');
	  	});
	},

	remove: function(req,res) {
		var id = req.param('id');

		if (!id) return res.showView('404');

		Version.findOne(id, function (err, version) {

			if(err) { return res.showView('500'); }
			if(!version) { return res.showView('404'); }

			Version.destroy(id, function (err) {

				if(err) { return res.showView('500'); }

				return res.redirect('/versions');
			});

		})
	}

};
