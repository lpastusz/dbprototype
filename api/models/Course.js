/**
* Course.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {

        startDate      :       'date',
        endDate        :       'date',
        price          :       'float',
        rentPrice      :       'float',
        contactPerson  :       'json',
        pupils: {
            collection: 'pupil',
            via: 'courses'
        },

        'files': {
            collection: 'file',
            via: 'courses'
        },
    }
};
