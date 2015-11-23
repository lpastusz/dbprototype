/**
* Pupils.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      name              :       'string',
      surname           :       'string',
      birthdate         :       'date',
      rental            :       'json',
      contact           :       'json',
      registrationDate  :       'date',
      courses: {
       collection: 'course',
       via: 'pupils',
       dominant: true
      },
      school            :       { model : 'school'},
      payments : {
        collection: 'Payment',
        via : 'pupil' 
      }
  }
};
