import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/user.model.js";
import {GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,MODE} from "./config.js"


const uri = MODE === 'developnment' ?  "/oauth/google/redirect" :"https://urlshortner-tav4.onrender.com/oauth/google/redirect";

passport.use(new GoogleStrategy({
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    clientID: process.env.GOOGLE_CLIENT_ID,
    callbackURL: uri
}, async (accessToken, refreshToken, profile, done) => {
    try {
        
        const email = profile.emails[0].value;
        let user = await userModel.findOne({ email });

        if (!user) {
            user = await userModel.create({
                name: profile.displayName,
                email,
                profilePic: profile.photos[0].value,
                emailVerified: true,
                password:`google${profile.id}`
            });
        }

        done(null, user); // attach user to session

    } catch (error) {
        done(error, false);
    }
}));

// Serialize user to session
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id).select("-password");
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});