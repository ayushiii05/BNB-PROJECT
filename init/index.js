  const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() =>  {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {

    await Listing.deleteMany({});
 // initData.data=  initData.data.map((obj)=>({...obj,owner:"67ea11b708e7b4c5574304d8",}));
  await Listing.insertMany(initData.data);

  console.log("data was initialized");
};

initDB(); 

/*const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlusts";

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

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        const transformedData = initData.data.map(listing => ({
            ...listing,
            image: listing.image.filename || listing.image
        }));
        await Listing.insertMany(transformedData);
        console.log("data was initialized");
    } catch (err) {
        console.log("Error during database initialization:", err);
    }
};

initDB();*/