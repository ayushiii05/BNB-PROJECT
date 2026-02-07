const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
}

const seedListings = [
    {
        title: "Cozy Mountain Cabin",
        description: "Escape to the mountains in this cozy cabin with a fireplace and stunning views.",
        image: "https://images.unsplash.com/photo-1518732656745-d41c4f756496?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FiaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        price: 1500,
        location: "Manali, Himachal Pradesh",
        country: "India",
        category: "Mountains",
    },
    {
        title: "Luxury Beachfront Villa",
        description: "Wake up to the sound of waves in this luxurious villa right on the beach.",
        image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        price: 5000,
        location: "Goa",
        country: "India",
        category: "Amazing pools",
    },
    {
        title: "Historic Castle Stay",
        description: "Experience royalty by staying in a genuine historic castle with modern amenities.",
        image: "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FzdGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        price: 12000,
        location: "Jaipur, Rajasthan",
        country: "India",
        category: "Castles",
    },
    {
        title: "Modern City Apartment",
        description: "Stay in the heart of the city in this modern, fully equipped apartment.",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        price: 3500,
        location: "Mumbai, Maharashtra",
        country: "India",
        category: "Iconic cities",
    },
    {
        title: "Rustic Farmhouse Experience",
        description: "Reconnect with nature in this rustic farmhouse surrounded by lush fields.",
        image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        price: 2000,
        location: "Punjab",
        country: "India",
        category: "Farms",
    },
    {
        title: "Igloo Glamping",
        description: "Unique experience staying in a glass igloo under the stars.",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3dpc3MzMjBhbHBzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        price: 8000,
        location: "Gulmarg, Kashmir",
        country: "India",
        category: "Arctic",
    },
    {
        title: "Houseboat on Backwaters",
        description: "Relax on a traditional houseboat cruising through serene backwaters.",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666c74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2VyYWxhfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        price: 6000,
        location: "Alleppey, Kerala",
        country: "India",
        category: "Houseboats",
    },
    {
        title: "Desert Dome Camp",
        description: "Stay in a luxury dome tent in the middle of the desert dunes.",
        image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzZXJ0JTIwY2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        price: 4500,
        location: "Jaisalmer, Rajasthan",
        country: "India",
        category: "Domes",
    },
    {
        title: "Forest Camping Adventure",
        description: "Camping site located deep within the forest for true adventurers.",
        image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        price: 1200,
        location: "Rishikesh, Uttarakhand",
        country: "India",
        category: "Camping",
    },
    {
        title: "Private Room in Heritage Home",
        description: "A comfortable private room in a beautifully restored heritage home.",
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        price: 1800,
        location: "Pondicherry",
        country: "India",
        category: "Rooms",
    }
];

const seedDB = async () => {
    try {
        await main();
        console.log("Connected to DB");

        // Fetch a user to assign as owner
        const owner = await User.findOne({});
        if (!owner) {
            console.log("No user found! Please register a user first.");
            return;
        }
        console.log(`Assigning listings to owner: ${owner.username}`);

        // Add owner to each listing
        const listingsWithOwner = seedListings.map((listing) => ({
            ...listing,
            owner: owner._id,
        }));

        await Listing.insertMany(listingsWithOwner);
        console.log("Data initialized with 10 new diverse listings");
    } catch (err) {
        console.error("Error seeding DB:", err);
    } finally {
        mongoose.disconnect();
    }
};

seedDB();
