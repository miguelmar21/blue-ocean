const passport = require('passport');
const { UserSchema} = require('../../../../database');
const LocalStrategy = require('passport-local').Strategy;


exports.local = passport.use(new LocalStrategy(UserSchema.authenticate()));

passport.serializeUser(UserSchema.serializeUser());
passport.deserializeUser(UserSchema.deserializeUser());
// the serializeUser and deserializeUser provided by passport local module
