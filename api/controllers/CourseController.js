/**
 * CourseController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getCourses : function(req, res) {
		Course.find({}).exec(function coursesFound(err, result) {

			if (err) { return res.view('500'); }

			res.view('Course/index', { data: result });
		});
	},

	getCourseCreate: function(req,res) {
		res.view('Course/create');
	},

	postCourseCreate: function(req,res) {
		var params = _.extend(req.query || {}, req.params || {}, req.body || {});

		var newCourse = {
			startDate: params.startDate,
			endDate: params.endDate,
			price: params.price,
			rentPrice: params.rentPrice
		};
		var newContactPerson = {
			name: params.contactPersonName,
			surname: params.contactPersonSurname,
			email: params.contactPersonEmail,
			phone: params.contactPersonPhone
		};
		newCourse.contactPerson = newContactPerson;

	  	Course.create(newCourse, function courseCreated (err, course) {

	  		if (err) return res.view('500', { error : err });

	  		res.redirect('/courses/'+ course.id);
	  	});
	},

	getCourseDetail : function(req, res) {
		var id = req.param('id')

	  	if (!id) return res.view('404');

	  	Course.findOne(id, function courseFound(err, course) {

	  		if(err) { return res.view('500'); }
			if(!course) { return res.view('404'); }


	  		res.view('Course/detail', { data: course });
	  	});
	},

	getCourseEdit : function(req, res) {
		var id = req.param('id')

	  	if (!id) { return res.view('404'); }

	  	Course.findOne(id, function courseFound(err, course) {

			if(err) { return res.view('500'); }
			if(!course) { return res.view('404'); }

	  		res.view('Course/edit', { data: course });
	  	});
	},


	postCourseEdit : function(req, res) {
		var params = _.extend(req.query || {}, req.params || {}, req.body || {});
	    var id = params.id;

	    if (!id) { return res.view('404'); }

		var updatedCourse = {
			startDate: params.startDate,
			endDate: params.endDate,
			price: params.price,
			rentPrice: params.rentPrice
		};
		var upatedContactPerson = {
			name: params.contactPersonName,
			surname: params.contactPersonSurname,
			email: params.contactPersonEmail,
			phone: params.contactPersonPhone
		};
		updatedCourse.contactPerson = updatedContactPerson;

	    Course.update(id, updatedCourse, function courseUpdated(err, course) {

	      if (err) { res.redirect('/course/edit'); }

	      if(!course) {
	        res.redirect('/course/edit/'+id);
	      }

	      res.redirect('/course/'+id);
	    });
	},


	getCourseRemove : function(req, res) {
		var id = req.param('id');

		if (!id) return res.view('404');

		Course.findOne(id, function courseFound(err, course) {

			if(err) { return res.view('500'); }
			if(!course) { return res.view('404'); }

			Course.destroy(id, function courseDestroyed(err) {

				if(err) { return res.view('500'); }

				return res.redirect('/courses');
			});

		})
	}

};
