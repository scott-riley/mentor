var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var verifyHandler = function(token, tokenSecret, profile, done) {
  var data = profile._json;
  var username = data.screen_name;
  return done(null, username);
};

module.exports = {
  express: {
    customMiddleware: function (app) {
      app.use(passport.initialize());
      app.use(passport.session());
      passport.use(new TwitterStrategy({
          consumerKey: process.env.TWITTER_CONSUMER_KEY,
          consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
          callbackURL: process.env.TWITTER_CALLBACK
        },
        verifyHandler
      ));
      app.get('/auth/twitter',
        passport.authenticate('twitter', { failureRedirect: '/account' })
      );
      app.get('/connect/twitter/callback',
        passport.authenticate('twitter', { failureRedirect: '/account' }),
        function(req, res) {
          var user = req.user;
          req.session.username = user;
          res.redirect('/');
        }
      );
    }
  }
}
