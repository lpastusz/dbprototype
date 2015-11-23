/**
 * SchoolController
 *
 * @description :: Server-side logic for managing Schools
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getSchools : function(req, res) {
		School.find({}).exec(function schoolsFound(err, school) {

			if (err) { return res.showView('500'); }

			res.showView('School/index', { schools: school });
		});
	},

	getSchoolCreate: function(req,res) {
		res.showView('School/create');
	},

	postSchoolCreate: function(req,res) {
		var params = _.extend(req.query || {}, req.params || {}, req.body || {});

		var newSchool = {
			name: params.name
		};
		var newSchoolAddress = {
			street: params.addressStreet,
			city: params.addressCity,
			zipCode: params.addressZipCode
		};
		newSchool.address = newSchoolAddress;

	  	School.create(newSchool, function schoolCreated (err, school) {

	  		if (err) return res.showView('500', { error : err });

	  		res.redirect('/schools/'+ school.id);
	  	});
	},

	getSchoolDetail : function(req, res) {
		var id = req.param('id')

	  	if (!id) return res.showView('404');

	  	School.findOne(id, function schoolFound(err, school) {

	  		if(err) { return res.showView('500'); }
			if(!school) { return res.showView('404'); }


	  		res.showView('School/detail', { school: school });
	  	});
	},

	getSchoolEdit : function(req, res) {
		var id = req.param('id')

	  	if (!id) { return res.showView('404'); }

	  	School.findOne(id, function schoolFound(err, school) {

			if(err) { return res.showView('500'); }
			if(!school) { return res.showView('404'); }

	  		res.showView('School/edit', { school: school });
	  	});
	},


	postSchoolEdit : function(req, res) {
		var params = _.extend(req.query || {}, req.params || {}, req.body || {});
	    var id = params.id;

		console.log(updatedSchool);

	    if (!id) { return res.showView('404'); }

		var updatedSchool = {
			name: params.name
		};
		var updatedSchoolAddress = {
			street: params.addressStreet,
			city: params.addressCity,
			zipCode: params.addressZipCode
		};
		updatedSchool.address = updatedSchoolAddress;


	    School.update(id, updatedSchool, function schoolUpdated(err, school) {

	      if (err) { res.redirect('/school/edit'); }

	      if(!school) {
	        res.redirect('/school/edit/'+id);
	      }

	      res.redirect('/schools/'+id);
	    });
	},


	getSchoolRemove : function(req, res) {
		var id = req.param('id');

		if (!id) return res.showView('404');

		School.findOne(id, function schoolFound(err, school) {

			if(err) { return res.showView('500'); }
			if(!school) { return res.showView('404'); }

			School.destroy(id, function schoolDestroyed(err) {

				if(err) { return res.showView('500'); }

				return res.redirect('/schools');
			});

		})
	}

};
