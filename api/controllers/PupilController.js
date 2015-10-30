/**
 * PupilsController
 *
 * @description :: Server-side logic for managing Pupils
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getPupils : function(req, res) {
		Pupil.find({}).exec(function pupilsFound(err, result) {

			if (err) { return res.view('500'); }

			res.view('Pupil/index', { data: result });
		});
	},

	getPupilCreate: function(req,res) {
		res.view('Pupil/create');
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

	  	Pupil.create(newPupil, function pupilCreated (err, pupil) {

	  		if (err) return res.view('500', { error : err });

	  		res.redirect('/pupils/'+ pupil.id);
	  	});
	},

	getPupilDetail : function(req, res) {
		var id = req.param('id')

	  	if (!id) return res.view('404');

	  	Pupil.findOne(id, function pupilFound(err, pupil) {

	  		if(err) { return res.view('500'); }
			if(!pupil) { return res.view('404'); }


	  		res.view('Pupil/detail', { data: pupil });
	  	});
	},

	getPupilEdit : function(req, res) {
		var id = req.param('id')

	  	if (!id) { return res.view('404'); }

	  	Pupil.findOne(id, function pupilFound(err, pupil) {

			if(err) { return res.view('500'); }
			if(!pupil) { return res.view('404'); }

	  		res.view('Pupil/edit', { data: pupil });
	  	});
	},


	postPupilEdit : function(req, res) {
		var params = _.extend(req.query || {}, req.params || {}, req.body || {});
	    var id = params.id;

	    if (!id) { return res.view('404'); }

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

		      res.redirect('/pupil/'+id);
		    });

		});
	},


	getPupilRemove : function(req, res) {
		var id = req.param('id');

		if (!id) return res.view('404');

		Pupil.findOne(id, function pupilFound(err, pupil) {

			if(err) { return res.view('500'); }
			if(!pupil) { return res.view('404'); }

			Pupil.destroy(id, function pupilDestroyed(err) {

				if(err) { return res.view('500'); }

				return res.redirect('/pupils');
			});

		})
	}
};
