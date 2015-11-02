/**
 * HomepageController
 *
 * @description :: Server-side logic for managing Pupils
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getHomepage : function(req, res) {
		res.showView('homepage');
	}
}
