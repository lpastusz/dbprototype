/**
 * AboutController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index : function(req, res) {

		About.find({}).exec(function coursesFound(err, abouts) {

			if (err) { return res.showView('500'); }

			res.showView('About/index', { about: abouts[0] });
		});
	}

};
