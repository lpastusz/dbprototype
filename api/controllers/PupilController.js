/**
 * PupilsController
 *
 * @description :: Server-side logic for managing Pupils
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getPupils : function(req, res) {
		Pupil.find({}).exec(function pupilsFound(err, pupil) {

			if (err) { return res.showView('500'); }

			res.showView('Pupil/index', { pupils: pupil });
		});
	},

	getPupilCreate: function(req,res) {

		School.find({}).exec(function coursesFound(err, schools) {

			if (err) { return res.showView('500'); }

			res.showView('Pupil/create', { schools : schools });

		});

	},

	postPupilCreate: function(req,res) {
		var params = _.extend(req.query || {}, req.params || {}, req.body || {});

		var moment = require('moment');

		var date = moment().format('YYYY-MM-DD');

		var newPupil = {
			name: params.name,
			surname: params.surname,
			birthdate: params.birthdate,
			registrationDate: date
		};
		var newRental = {
			height: params.rentalHeight,
			weight: params.rentalWeight
		};
		var newContact = {
			email: params.contactEmail,
			phone: params.contactPhone
		};
		newPupil.rental = newRental;
		newPupil.contact = newContact;
		newPupil.school = params.schoolId;

	  	Pupil.create(newPupil, function pupilCreated (err, pupil) {

	  		if (err) return res.showView('500', { error : err });

	  		res.redirect('/pupils/'+ pupil.id);
	  	});
	},

	getPupilDetail : function(req, res) {
		var id = req.param('id')

	  	if (!id) return res.showView('404');

	  	Pupil.findOne(id).populate('school').populate('courses').exec(function pupilFound(err, pupil) {

	  		if(err) { return res.showView('500'); }
			if(!pupil) { return res.showView('404'); }

			Payment.find({pupil: pupil.id}).populate('author').exec(function(err, payments){
				if(!err){
					pupil.payments = payments;
				}
				res.showView('Pupil/detail', { pupil: pupil });
			});
	  	});
	},

	getPupilEdit : function(req, res) {
		var id = req.param('id')

	  	if (!id) { return res.showView('404'); }

	  	Pupil.findOne(id).populate('school').exec(function pupilFound(err, pupil) {

			if(err) { return res.showView('500'); }
			if(!pupil) { return res.showView('404'); }

			School.find({}).exec(function coursesFound(err, schools) {

				if (err) { return res.showView('500'); }

					res.showView('Pupil/edit', { pupil: pupil, schools : schools });

			});

	  	});
	},


	postPupilEdit : function(req, res) {
		var params = _.extend(req.query || {}, req.params || {}, req.body || {});
	    var id = params.id;

	    if (!id) { return res.showView('404'); }

		var updatedPupil = {
			name: params.name,
			surname: params.surname,
			birthdate: params.birthdate,
			registrationDate: params.registrationDate
		};
		var updatedRental = {
			height: params.rentalHeight,
			weight: params.rentalWeight
		};
		var updatedContact = {
			email: params.contactEmail,
			phone: params.contactPhone
		};
		updatedPupil.rental = updatedRental;
		updatedPupil.contact = updatedContact;
		updatedPupil.school = params.schoolId;

		Pupil.findOne(id, function pupilFound(err, pupil) {

			if (err) { res.redirect('/pupil/edit'); }

			if(!pupil) {
			  res.redirect('/pupil/edit/'+id);
			}

			updatedPupil.registrationDate = pupil.registrationDate;

			Pupil.update(id, updatedPupil, function PupilUpdated(err, pupil) {

		      if (err) { res.redirect('/pupil/edit'); }

		      if(!pupil) {
		        res.redirect('/pupil/edit/'+id);
		      }

		      res.redirect('/pupils/'+id);
		    });

		});
	},


	getPupilRemove : function(req, res) {
		var id = req.param('id');

		if (!id) return res.showView('404');

		Pupil.findOne(id, function pupilFound(err, pupil) {

			if(err) { return res.showView('500'); }
			if(!pupil) { return res.showView('404'); }

			Pupil.destroy(id, function pupilDestroyed(err) {

				if(err) { return res.showView('500'); }

				return res.redirect('/pupils');
			});

		})
	},

	getAddToCourse: function(req, res) {

		var id = req.param('id');


		Pupil.findOne(id).populate('courses').exec(function pupilFound(err, pupil) {

			if(err) { return res.showView('500'); }
			if(!pupil) { return res.showView('404'); }

			Course.find({ id: { '!' :  pupil.courses }}).exec(function coursesFound(err, courses) {

				if (err) { return res.showView('500'); }

				res.showView('Pupil/addToCourse', { courses: courses, pupil : pupil });

			});

		});
	},

	postAddToCourse: function(req, res) {

		var pupilId = req.param('pupilId');
		var courseId = req.param('courseId');


		Pupil.findOne({ id : pupilId }).populate('courses').populate('payments').exec(function(err, pupil) {
			if(err) { return res.showView('500'); }
			if(!pupil) { return res.showView('404'); }

			pupil.courses.push(courseId);

			Pupil.update( pupilId, pupil, function(err, updatedPupil) {
				if(err) { return res.showView('500'); }
				if(!updatedPupil) { return res.showView('404'); }

				res.redirect('pupils/'+pupilId);
			});
		})
	},

	addPayment: function (req, res) {
		var pupilId = req.param('id');
		var price = req.param('price');

		Payment.create({
			price: price,
			pupil: pupilId,
			author: req.session.me
		}, function (err, payment) {

	  		if (err) return res.showView('500', { error : err });

	  		res.redirect('/pupils/'+ pupilId);
	  	});
		
	},

	removePayment: function (req, res) {
		var id = req.param('id');
		var pupilId = req.param('pupilId');

		if (!id) return res.showView('404');

		Payment.findOne({id: id, pupil: pupilId}, function (err, payment) {

			if(err) { return res.showView('500'); }
			if(!payment) { return res.showView('404'); }

			Payment.destroy(id, function (err) {

				if(err) { return res.showView('500'); }

				return res.redirect('/pupils/'+pupilId);
			});

		})
	}
};
