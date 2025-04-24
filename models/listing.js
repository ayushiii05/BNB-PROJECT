const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
       // required: true,
    },

    description : String,

    image:{
        type: String,
    
       
    default: 
    "https://assets-news.housing.com/news/wp-content/uploads/2022/01/11172338/World%E2%80%99s-15-Most-Beautiful-Houses-That-Will-Leave-You-Awestruck-featured-shutterstock_1182743467-1200x700-compressed.jpg",
 
    set: (v) =>v  === ""
     ?  "https://assets-news.housing.com/news/wp-content/uploads/2022/01/11172338/World%E2%80%99s-15-Most-Beautiful-Houses-That-Will-Leave-You-Awestruck-featured-shutterstock_1182743467-1200x700-compressed.jpg"
     :v,
     },

    price : Number,
    location : String,

country : String,
reviews : [
    {
        type: Schema.Types.ObjectId,
        ref: "Review"
    },
],
/* owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
},*/
    
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;
