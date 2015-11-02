
function getBaseurl() {
  var usingSSL = sails.config.ssl && sails.config.ssl.key && sails.config.ssl.cert;
  var port = sails.config.proxyPort || sails.config.port;
  var localAppURL =
    (usingSSL ? 'https' : 'http') + '://' +
    (sails.getHost() || 'localhost') +
    (port == 80 || port == 443 ? '' : ':' + port);

  return localAppURL;
};

module.exports = function(viewName, data) {

    if (!data)
    {
        data = new Array();
    }

    data.baseUrl = getBaseurl();

    var req = this.req;
    var res = this.res;

    if (req.session.me)
    {
        data.isLoggedIn = true;

        User.findOne({
            id: req.session.me
        }).exec(function(err, loggedUser) {
            data.user = loggedUser;
            return res.view(viewName, { locals : data });
        });
    }
    else
    {
        data.isLoggedIn = false;

        return res.view(viewName, {locals : data});
    }
}
