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
  random: function(req,res) {
    Morsel.find({sort: 'content ASC'}).done(function(err,morsel){
      if (err) return res.send(err,500);
      var morselCount = morsel.length;
      if(morselCount) {
        var rand = Math.floor(Math.random() * 10);
        /** TODO: Refactor this to not be a fucking loop you mong **/
        while(rand > morselCount || rand == 0) {
          rand = Math.floor(Math.random() * 10);
        }
        res.send('morsel[rand - 1]');
        }
    });
  }
}

module.exports = MorselController;
