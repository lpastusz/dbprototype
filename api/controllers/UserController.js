/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	getRegistration : function(req, res) {
		return res.showView('registration');
	},

	getLogin : function (req, res){
		return res.showView('login');
	},

	loginFunction : function (userId, req, res){
		req.session.me = userId;
		return res.redirect('');
	},



	isLoggedIn: function(req, res) {

		if (req.session.me)
		{
			return res.ok('logged in, user: ' + req.session.me);
		}
		else
		{
			return res.ok('not logged');
		}

	},

	postLogin: function(req, res) {
		var PasswordEncrypteMachine = require('machinepack-passwords');
		var textPassword = req.param('pass');


		User.findOne({
			login: req.param('login')
		}).exec(function(err, user) {

			if (err) {
				return res.showView('500', { error: err })
			}

			if (!user) {

				return res.showView('login', {
					notification: {
						type : 'error',
						message: 'User or password does not match'
					}
				});
			}

			PasswordEncrypteMachine.checkPassword({
				passwordAttempt: textPassword,
				encryptedPassword: user.pass
			}).exec({

				// Unexpected error
				error: function (err){
					return res.showView('login', {
						notification: {
							type : 'error',
							message: 'We cannot log you in because of technical difficulties' + JSON.stringify(err)
						}
					});
				},

				// Password attempt does not match already-encrypted version
				incorrect: function (){
					return res.showView('login', {
						notification: {
							type : 'error',
							message: 'User or password does not match'
						}
					});
				},

				// OK.
				success: function() {
					return module.exports.loginFunction(user.id, req, res);
				}
			});
		});
	},

	getLogout: function(req, res) {

		req.session.me = null;
		return res.redirect('');

	},


	postRegistration: function(req, res) {

		var PasswordEncrypteMachine = require('machinepack-passwords');
		var textPassword = req.param('pass');

		PasswordEncrypteMachine.encryptPassword({
			password: textPassword,
			difficulty: 10
		}).exec({
			error: function(err)
			{
				return res.showView('500', err);
			},

			// on passwordEncrypt success
			success: function(encryptedPassword) {
				User.create({
					login:  		req.param('login'),
					pass: 			encryptedPassword,
					role: 			'parent',
					email: 			req.param('email'),
				}, function userCreated(err, newUser) {

					if (err) {
						return res.badRequest(err);
					}

					return res.redirect('/login')
				});
			}
		});
	}
};
