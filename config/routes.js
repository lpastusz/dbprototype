/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET  /login'                 : 'UserController.getLogin',
  'GET  /registration'          : 'UserController.getRegistration',
  'POST /login'                 : 'UserController.postLogin',
  'POST /registration'          : 'UserController.postRegistration',
  'GET  /is-logged-in'          : 'UserController.isLoggedIn',
  'GET  /logout'                : 'UserController.getLogout',

  'GET  /courses'               : 'CourseController.getCourses',
  'GET  /courses/create'        : 'CourseController.getCourseCreate',
  'POST /courses/create'        : 'CourseController.postCourseCreate',
  'GET  /courses/:id'           : 'CourseController.getCourseDetail',
  'GET  /courses/edit/:id'      : 'CourseController.getCourseEdit',
  'POST /courses/edit/:id'      : 'CourseController.postCourseEdit',
  'GET  /courses/remove/:id'    : 'CourseController.getCourseRemove',
  'GET  /courses/addfile/:id'        : 'CourseController.getAddFile',
  'POST /courses/addfile/:id'        : 'CourseController.postAddFile',

  'GET  /pupils'                : 'PupilController.getPupils',
  'GET  /pupils/create'         : 'PupilController.getPupilCreate',
  'POST /pupils/create'         : 'PupilController.postPupilCreate',
  'GET  /pupils/:id'            : 'PupilController.getPupilDetail',
  'GET  /pupils/edit/:id'       : 'PupilController.getPupilEdit',
  'POST /pupils/edit/:id'       : 'PupilController.postPupilEdit',
  'GET  /pupils/remove/:id'     : 'PupilController.getPupilRemove',
  'GET  /pupils/add-to-course/:id' : 'PupilController.getAddToCourse',
  'POST /pupils/add-to-course/:id' : 'PupilController.postAddToCourse',

  'POST  /pupils/addPayment/:id'    : 'PupilController.addPayment',
  'GET /pupils/:pupilId/removePayment/:id' : 'PupilController.removePayment',


  'GET  /filesPage'                   : 'FileController.filesList',
  'POST /filesPage/upload'            : 'FileController.upload',
  'GET  /filesPage/remove/:id'        : 'FileController.remove',

  'GET  /versions'                   : 'VersionController.list',
  'POST /versions/create'            : 'VersionController.create',
  'GET  /versions/remove/:id'        : 'VersionController.remove',

  'GET  /schools'               : 'SchoolController.getSchools',
  'GET  /schools/create'        : 'SchoolController.getSchoolCreate',
  'POST /schools/create'        : 'SchoolController.postSchoolCreate',
  'GET  /schools/:id'           : 'SchoolController.getSchoolDetail',
  'GET  /schools/edit/:id'      : 'SchoolController.getSchoolEdit',
  'POST /schools/edit/:id'      : 'SchoolController.postSchoolEdit',
  'GET  /schools/remove/:id'    : 'SchoolController.getSchoolRemove',

  'GET /about'                       : 'AboutController.index',

  'GET /'                       : 'HomepageController.getHomepage'


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
