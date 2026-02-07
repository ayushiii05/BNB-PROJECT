const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const NEW_OWNER_ID = "68a958b182355b09d9bd0521"; // The user ID from your logs

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    const result = await Listing.updateMany({}, { owner: NEW_OWNER_ID });
    console.log(`Updated ${result.modifiedCount} listings to be owned by user ${NEW_OWNER_ID}`);
}

main().then(() => {
    console.log("Done");
    process.exit(0);
}).catch(err => {
    console.log(err);
    process.exit(1);
});
