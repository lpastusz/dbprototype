/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      login              :      'string',
      pass               :      'string',
      role               :      'string',
      email              :      'string',

      files	: {
      	collection 	: 'file',
      	via 		: 'author'
      },
      payments : {
        collection  : 'payment',
        via     : 'author'
      }
  }
};
