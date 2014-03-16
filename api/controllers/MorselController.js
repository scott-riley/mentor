/**
 * MorselController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var MorselController = {
  get: function (req, res) {
    Morsel.find(req.param('id'))
      .sort('user')
      .exec(function (err, morsels) {
        if (err) return req.send(500, err);

        res.json(morsels);
      });
  },
  post: function (req, res) {
    // this tells us if we're authenticated
    if (req.session.username) {
      // bind username to incoming request
      req.body.user = req.session.username;

      Morsel.create(req.body)
        .done(function (err, morsel) {
          // just return error to the client
          if (err) return req.send(500, err);

          res.json(morsel);
        });
    }
    else {
      res.send(401);
    }
  }
};

module.exports = MorselController;
