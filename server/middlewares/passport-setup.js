const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User"); // Import your User model

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create a user based on Google profile information
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
          });
        }
        // Generate and set a token for the user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "5h",
        });

        user.token = token;

        await user.save();

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user into session
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // Deserialize user from session
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });

module.exports = passport;
