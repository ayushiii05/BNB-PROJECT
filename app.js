const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require('./models/user.js');

const UserRouter = require("./routes/user.js");

const { error } = require("console");
const {listingSchema} = require("./schema.js");
const Review = require("./models/review.js");
const { isLoggedIn } = require("./middleware");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly:true,
    },
};
app.get("/",(req,res) => {
    res.send("hi,im root");
});
    app.use(session(sessionOptions));
 app.use(flash());
 app.use(passport.initialize());
 app.use(passport.session());

 passport.use(new LocalStrategy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());

app.use ((req, res, next)=>{
    res.locals.success = req.flash("success");
    console.log(res.locals.success);
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

//demo user
 /*app.get("/demouser", async(req, res) =>{
    let fakeUser = new User({
        email: "student@gmail.com",
        username:"ayushi singh"
    });
  let registeredUser= await User.register(fakeUser,"helloWorld");
res.send(registeredUser);
});
*/
app.use("/", UserRouter);

//index route
app.get("/listings", async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
});

// IMPORTANT: Put "new" route BEFORE ":id" routes and add isLoggedIn
app.get("/listings/new", isLoggedIn, (req,res) => {
    res.render("listings/new.ejs");
});

//testing route
    app.get("/testListing", async (req,res) => {

        let sampleListing = new Listing({
            title: "My new villa",
            description: "by the beach",
            price: 1000,
            location: "Calangute, Goa",
            country: "India" ,
        });
          await sampleListing.save();
        console.log("sample was saved");
        res.send("successful testing");
        
        });

      //show route
    app.get("/listings/:id", async (req,res) => {
        let {id} = req.params;
        const listing = await Listing.findById(id).populate("reviews");
        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }
        res.render("listings/show.ejs", {listing});
    });
  //create route
  app.post("/listings", isLoggedIn, wrapAsync(async(req, res, next) => {
    try {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        req.flash("success", "New listing Created!");
        res.redirect(`/listings/${newListing._id}`);
    } catch(err) {
        next(err);
    }
  }));

  //edit route
  app.get("/listings/:id/edit",isLoggedIn, wrapAsync(async (req,res) => {
    try {
        let {id} = req.params;
        // Trim any whitespace from the ID
        id = id.trim();
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.redirect("/listings");
        }
        res.render("listings/edit.ejs", {listing});
    } catch(err) {
        console.log(err);
        res.redirect("/listings");
    }
  }));

  //update route
 app.put("/listings/:id",isLoggedIn, wrapAsync(async (req,res) => {
    try {
        let {id} = req.params;
        id = id.trim();
        const listing = await Listing.findByIdAndUpdate(
            id, 
            {...req.body.listing},
            
            {new: true, runValidators: true}
        );
        if (!listing) {
            return res.redirect("/listings");
        }
        res.redirect(`/listings/${listing._id}`);
    } catch(err) {
        console.log(err);
        res.redirect("/listings");
    }
    req.flash("success", "listing Updated");
  }));
 

//   app.put("/listings/:id", async (req, res) => {
//       let { id } = req.params;
  
//       // Validate if the id is a correct ObjectId
//       if (!mongoose.Types.ObjectId.isValid(id)) {
//           return res.status(400).json({ error: "Invalid ID format" });
//       }
  
//       try {
//           await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//           res.redirect("/listings");
//       } catch (error) {
//           res.status(500).json({ error: "Server error" });
//       }
//   });
//delete route
app.delete("/listings/:id",isLoggedIn, async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "listing Deleted!");
    res.redirect("/listings");
})

//reviews
app.post("/listings/:id/reviews", wrapAsync(async(req,res) => {
    try {
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);

        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();
        req.flash("success", "New Review Created!");
        res.redirect(`/listings/${listing._id}`);
    } catch(err) {
        next(err);
    }
}));

app.delete("/listings/:id/reviews/:reviewId", async (req, res) => {
    try {
        let { id, reviewId } = req.params;
        // Trim any whitespace from the IDs
        id = id.trim();
        reviewId = reviewId.trim();
        
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        req.flash("success", "Review Deleted!");
        res.redirect(`/listings/${id}`);
    } catch(err) {
        console.log(err);
        res.redirect(`/listings/${id}`);
    }
});

//middleware
/*app.all("", (req,res,next) =>{
    next(new ExpressError(404,"page Not Found!")); 
}) */
app.use((err,req,res,next)=>{
    /*let{statusCode,message} = err;
    res.status(statusCode).send(message); */
    res.send("something went wrong!");
    
});
 
 
const server = app.listen(8080, () => {
    console.log("server is running on port 8080");
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log('Port 8080 is busy, trying to close existing connection...');
        require('child_process').exec('taskkill /F /IM node.exe', (err, stdout, stderr) => {
            if (err) {
                console.error('Error killing process:', err);
                return;
            }
            console.log('Previous process killed, restarting server...');
            server.listen(8080);
        });
    }
});

// Add graceful shutdown
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});



