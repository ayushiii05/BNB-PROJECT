const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const User = require("./models/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    const listings = await Listing.find({});
    const listingsWithoutOwner = listings.filter(l => !l.owner);

    console.log(`Total listings: ${listings.length}`);
    console.log(`Listings without owner: ${listingsWithoutOwner.length}`);

    if (listingsWithoutOwner.length > 0) {
        console.log("Found listings without owners. Attempting to assign a default owner...");
        const user = await User.findOne({});
        if (user) {
            console.log(`Found a user: ${user.username} (${user._id})`);
            await Listing.updateMany({ owner: { $exists: false } }, { owner: user._id });
            console.log("Updated listings with default owner.");
        } else {
            console.log("No users found to assign as owner.");
        }
    } else {
        console.log("All listings have owners.");
    }
}

main().then(() => {
    console.log("Done");
    process.exit(0);
}).catch(err => {
    console.log(err);
    process.exit(1);
});
