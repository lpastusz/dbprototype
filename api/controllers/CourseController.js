/**
 * CourseController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getCourses : function(req, res) {
		Course.find({}).exec(function coursesFound(err, courses) {

			if (err) { return res.showView('500'); }

			res.showView('Course/index', { courses: courses });
		});
	},

	getCourseCreate: function(req,res) {
		res.showView('Course/create');
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

	  		if (err) return res.showView('500', { error : err });

	  		res.redirect('/courses/'+ course.id);
	  	});
	},

	getCourseDetail : function(req, res) {
		var id = req.param('id')

	  	if (!id) return res.showView('404');

	  	Course.findOne(id).populate('pupils').populate('files').exec(function courseFound(err, course) {

	  		if(err) { return res.showView('500'); }
			if(!course) { return res.showView('404'); }

			res.showView('Course/detail', { course: course });

	  	});
	},

	getCourseEdit : function(req, res) {
		var id = req.param('id')

	  	if (!id) { return res.showView('404'); }

	  	Course.findOne(id, function courseFound(err, course) {

			if(err) { return res.showView('500'); }
			if(!course) { return res.showView('404'); }

	  		res.showView('Course/edit', { course: course });
	  	});
	},


	postCourseEdit : function(req, res) {
		var params = _.extend(req.query || {}, req.params || {}, req.body || {});
	    var id = params.id;

	    if (!id) { return res.showView('404'); }

		var updatedCourse = {
			startDate: params.startDate,
			endDate: params.endDate,
			price: params.price,
			rentPrice: params.rentPrice
		};
		var updatedContactPerson = {
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

	      res.redirect('/courses/'+id);
	    });
	},


	getCourseRemove : function(req, res) {
		var id = req.param('id');

		if (!id) return res.showView('404');

		Course.findOne(id, function courseFound(err, course) {

			if(err) { return res.showView('500'); }
			if(!course) { return res.showView('404'); }

			Course.destroy(id, function courseDestroyed(err) {

				if(err) { return res.showView('500'); }

				return res.redirect('/courses');
			});

		})
	},

	getAddFile: function(req, res) {

		var id = req.param('id');

		Course.findOne(id).populate('files').exec(function (err, course) {

			if(err) { return res.showView('500'); }
			if(!course) { return res.showView('404'); }

			File.find().exec(function (err, files) {

				if (err) { return res.showView('500'); }

				res.showView('Course/addFile', { files: files, course : course });

			});

		});
	},

	postAddFile: function(req, res) {

		var fileId = req.param('fileId');
		var courseId = req.param('courseId');


		Course.findOne({ id : courseId }).populate("pupils").populate('files').exec(function(err, course) {
			if(err) { return res.showView('500'); }
			if(!course) { return res.showView('404'); }

			course.files.push(fileId);

			Course.update( courseId, course, function(err, updatedCourse) {
				if(err) { return res.showView('500'); }
				if(!updatedCourse) { return res.showView('404'); }

				res.redirect('courses/'+courseId);
			});
		})
	}

};
