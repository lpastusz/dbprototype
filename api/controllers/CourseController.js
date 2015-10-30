/**
 * CourseController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getCourses : function(req, res) {

		console.log('gg');

		Course.find({}).exec(function(err, result) {

			if (err) { res.view(500); return; }

			res.json(result);

		});
	}

};
