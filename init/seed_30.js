const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
require("dotenv").config();

const dbUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(dbUrl);
}

const seedListings = [
    // Trending
    {
        title: "Luxury Penthouse with City Views",
        description: "Experience the ultimate luxury in this stunning penthouse with panoramic city views.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 8500,
        location: "New York City, USA",
        country: "United States",
        category: "Trending",
    },
    {
        title: "Secluded Tropical Paradise",
        description: "Escape to your own private island villa surrounded by crystal clear waters.",
        image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 15000,
        location: "Maldives",
        country: "Maldives",
        category: "Trending",
    },
    {
        title: "Modern Loft in Downtown",
        description: "A chic and modern loft located in the heart of the vibrant downtown district.",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 4500,
        location: "Tokyo, Japan",
        country: "Japan",
        category: "Trending",
    },

    // Rooms
    {
        title: "Cozy Room in Historic Villa",
        description: "Stay in a beautifully decorated room within a historic villa.",
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 1200,
        location: "Florence, Italy",
        country: "Italy",
        category: "Rooms",
    },
    {
        title: "Private Suite with Garden View",
        description: "Relax in a spacious suite overlooking a serene private garden.",
        image: "https://images.unsplash.com/photo-1616594039964-40891a90c_28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 1800,
        location: "Kyoto, Japan",
        country: "Japan",
        category: "Rooms",
    },
    {
        title: "Sunny Room near the Beach",
        description: "Bright and airy room just steps away from the sandy shores.",
        image: "https://images.unsplash.com/photo-1512918760513-95f192972701?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 1500,
        location: "Barcelona, Spain",
        country: "Spain",
        category: "Rooms",
    },

    // Iconic cities
    {
        title: "Parisian Apartment with Eiffel View",
        description: "Romantic apartment with a stunning view of the Eiffel Tower.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 6000,
        location: "Paris, France",
        country: "France",
        category: "Iconic cities",
    },
    {
        title: "London Townhouse",
        description: "Classic Victorian townhouse in a charming London neighborhood.",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 5500,
        location: "London, UK",
        country: "United Kingdom",
        category: "Iconic cities",
    },
    {
        title: "Sydney Harbour View Apartment",
        description: "Modern apartment with breathtaking views of the Sydney Opera House.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 7000,
        location: "Sydney, Australia",
        country: "Australia",
        category: "Iconic cities",
    },

    // Mountains
    {
        title: "Swiss Alps Chalet",
        description: "Traditional wooden chalet perfect for skiing and hiking enthusiasts.",
        image: "https://images.unsplash.com/photo-1519712641171-50e5025d5ce6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 9000,
        location: "Zermatt, Switzerland",
        country: "Switzerland",
        category: "Mountains",
    },
    {
        title: "Aspen Mountain Lodge",
        description: "Luxurious lodge with ski-in/ski-out access and a hot tub.",
        image: "https://images.unsplash.com/photo-1519658404972-e56597274439?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 11000,
        location: "Aspen, USA",
        country: "United States",
        category: "Mountains",
    },
    {
        title: "Himalayan Stone Cottage",
        description: "Quaint stone cottage offering peace and tranquility in the Himalayas.",
        image: "https://images.unsplash.com/photo-1444837527263-149b80b74127?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 2500,
        location: "Manali, India",
        country: "India",
        category: "Mountains",
    },

    // Castles
    {
        title: "Medieval Scottish Castle",
        description: "Live like a lord in this authentic medieval castle in the Scottish Highlands.",
        image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 18000,
        location: "Edinburgh, Scotland",
        country: "United Kingdom",
        category: "Castles",
    },
    {
        title: "French ChÃ¢teau",
        description: "Elegant chÃ¢teau surrounded by vineyards in the French countryside.",
        image: "https://images.unsplash.com/photo-1568283626154-8e434cd133ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 14000,
        location: "Bordeaux, France",
        country: "France",
        category: "Castles",
    },
    {
        title: "German Fairytale Fortress",
        description: "Stay in a fortress that inspired fairytales, overlooking the Rhine river.",
        image: "https://images.unsplash.com/photo-1565538965611-39641772646c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 16000,
        location: "Bavaria, Germany",
        country: "Germany",
        category: "Castles",
    },

    // Amazing pools
    {
        title: "Infinity Pool Villa in Bali",
        description: "Stunning villa with an infinity pool overlooking the lush jungle.",
        image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 6500,
        location: "Ubud, Bali",
        country: "Indonesia",
        category: "Amazing pools",
    },
    {
        title: "Santorini Sunset Plunge Pool",
        description: "White-washed cave house with a private plunge pool and sunset views.",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 10000,
        location: "Oia, Greece",
        country: "Greece",
        category: "Amazing pools",
    },
    {
        title: "Desert Oasis with Pool",
        description: "Cool off in a private pool in this luxurious desert retreat.",
        image: "https://images.unsplash.com/photo-1572331165267-854da2b00ca1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 7500,
        location: "Palm Springs, USA",
        country: "United States",
        category: "Amazing pools",
    },

    // Camping
    {
        title: "Redwood Forest Campsite",
        description: "Pitch a tent among the giant redwoods for a magical nature experience.",
        image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 800,
        location: "California, USA",
        country: "United States",
        category: "Camping",
    },
    {
        title: "Lakeside Glamping",
        description: "Luxury tent with a comfortable bed right by the lake.",
        image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 2500,
        location: "Lake Tahoe, USA",
        country: "United States",
        category: "Camping",
    },
    {
        title: "Desert Stargazing Camp",
        description: "Sleep under the stars in this secluded desert camp.",
        image: "https://images.unsplash.com/photo-1496545672479-7f946c940fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 1500,
        location: "Wadi Rum, Jordan",
        country: "Jordan",
        category: "Camping",
    },

    // Farms
    {
        title: "Tuscan Farmhouse",
        description: "Authentic farmhouse experience in the heart of Tuscany with olive groves.",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 4000,
        location: "Siena, Italy",
        country: "Italy",
        category: "Farms",
    },
    {
        title: "Organic Farm Stay",
        description: "Learn about organic farming and enjoy fresh produce at this cozy farm stay.",
        image: "https://images.unsplash.com/photo-1562657591-6277025816da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 1800,
        location: "Chiang Mai, Thailand",
        country: "Thailand",
        category: "Farms",
    },
    {
        title: "Vineyard Cottage",
        description: "Stay in a cottage right in the middle of a working vineyard.",
        image: "https://images.unsplash.com/photo-1534234828569-16d2524d770c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 5000,
        location: "Napa Valley, USA",
        country: "United States",
        category: "Farms",
    },

    // Arctic
    {
        title: "Northern Lights Igloo",
        description: "Glass igloo specially designed for viewing the Northern Lights.",
        image: "https://images.unsplash.com/photo-1518182170546-0766acfb077f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 12000,
        location: "Rovaniemi, Finland",
        country: "Finland",
        category: "Arctic",
    },
    {
        title: "Ice Hotel Experience",
        description: "Sleep in a room made entirely of ice and snow.",
        image: "https://images.unsplash.com/photo-1483304528321-0674f0040030?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 9000,
        location: "Jukkasjarvi, Sweden",
        country: "Sweden",
        category: "Arctic",
    },
    {
        title: "Cozy Arctic Cabin",
        description: "Warm cabin to retreat to after a day of arctic adventures.",
        image: "https://images.unsplash.com/photo-1517540451842-8c430e46241b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 3000,
        location: "Tromso, Norway",
        country: "Norway",
        category: "Arctic",
    },

    // Domes
    {
        title: "Geodesic Dome in Nature",
        description: "Immersive nature experience in a geodesic dome structure.",
        image: "https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 2500,
        location: "Patagonia, Chile",
        country: "Chile",
        category: "Domes",
    },
    {
        title: "Eco-Dome with Mountain View",
        description: "Sustainable dome stay offering comfort and spectacular mountain views.",
        image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 3500,
        location: "Alps, Switzerland",
        country: "Switzerland",
        category: "Domes",
    },
    {
        title: "Desert Glamping Dome",
        description: "Luxurious dome providing a unique desert living experience.",
        image: "https://images.unsplash.com/photo-1520637645707-cce1f6339cc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 4000,
        location: "Utah, USA",
        country: "United States",
        category: "Domes",
    },

    // Houseboats
    {
        title: "Amsterdam Canal Houseboat",
        description: "Stay on the water in a charming houseboat on Amsterdam's canals.",
        image: "https://images.unsplash.com/photo-1569350080887-219d3753eb09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 5000,
        location: "Amsterdam, Netherlands",
        country: "Netherlands",
        category: "Houseboats",
    },
    {
        title: "Kerala Backwater Houseboat",
        description: "Drift along the peaceful backwaters in a traditional houseboat.",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666c74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 6000,
        location: "Alleppey, India",
        country: "India",
        category: "Houseboats",
    },
    {
        title: "Floating Home in Seattle",
        description: "Modern floating home with great views of the water and city.",
        image: "https://images.unsplash.com/photo-1559827291-721a30065272?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        price: 7000,
        location: "Seattle, USA",
        country: "United States",
        category: "Houseboats",
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
        console.log("Data initialized with 30 new diverse listings");
    } catch (err) {
        console.error("Error seeding DB:", err);
    } finally {
        mongoose.disconnect();
    }
};

seedDB();
