const mongoose = require("mongoose");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
}

const cleanup = async () => {
    try {
        await main();
        console.log("Connected to DB");

        // Find listings where title or price is missing or null
        const result = await Listing.deleteMany({
            $or: [
                { title: { $exists: false } },
                { title: null },
                { title: "" },
                { price: { $exists: false } },
                { price: null },
                { country: { $exists: false } },
                { country: null },
                { country: "" }
            ]
        });

        console.log(`Deleted ${result.deletedCount} corrupted listings.`);
    } catch (err) {
        console.error("Error during cleanup:", err);
    } finally {
        mongoose.disconnect();
    }
};

cleanup();
