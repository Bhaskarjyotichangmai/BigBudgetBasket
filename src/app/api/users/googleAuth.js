require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5004;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;

const clientid = "502417525504-r1ad88a8n7c38unlter2dfo5n189ivp5.apps.googleusercontent.com"
const clientsecret = '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'


app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));
app.use(express.json());

// setup session
app.use(session({
    secret:"14454h5h5hhttgeef48488",
    resave:false,
    saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"http://localhost:5004/auth/google/callback",
        scope:["profile","email"]
    },
async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if the user already exists in the database
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            // If the user doesn't exist, create a new user
            user = new User({
                googleId: profile.id,
                email: profile.emails[0].value,
                // Other relevant fields from Google profile can be added here
            });

            // Save the new user to the database
            await user.save();
        }
        console.log("Login with Google server started successfully");
        // Pass the user to the passport callback
       return done(null, user);
    } catch (error) {
       return done(error, null);
    }

}));

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/dashboard",
    failureRedirect:"http://localhost:3000/login"
}))

app.get("/login/sucess",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:3000");
    })
})

app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`)
})