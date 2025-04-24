const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const {saveRedirectUrl} = require("../middleware.js");
const wrapAsync = require('../utils/wrapAsync');

// Signup routes
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(async(req, res, next) => {
    try {
        const { email, username, password } = req.body;
        
        console.log("Attempting to register new user:", { 
            email, 
            username,
            password: "" // Hide raw password in logs for security


        });

        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser,(err) =>{
            if(err) {
                return next(err);
            }
        })
        
        // Log successful registration with hash
        console.log("User successfully registered:", {
            id: registeredUser._id,
            username: registeredUser.username,
            email: registeredUser.email,
            hash: registeredUser.hash,  // This will show the hashed password
            
        });

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect(req.session.redirectUrl);
        });

    } catch (err) {
        console.log("Registration error:", err);
        req.flash("error", err.message || "Registration failed");
        return res.redirect("/signup");
    }
}));

// Login routes
router.get("/login", (req, res) => {
    res.render("users/login.ejs");

});

router.post("/login", 
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }), 
   async (req, res) => {
        req.flash("success", "Welcome back to wanderlust!");
        let redirectUrl = res.locals.redirectUrl ||"/listings";
        res.redirect(redirectUrl);
    }
);

router.get("/logout",(req,res,next)=> {
    req.logout((err)=>{
if(err) {
  return  next(err);
}
req.flash("success","you are logged out!");
res.redirect("/listings");
    })
})

module.exports = router;