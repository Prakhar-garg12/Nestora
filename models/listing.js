const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
 },
    description: String,
    // image: {
    //    type: String,
    //    default:"https://images.unsplash.com/photo-1769114385488-3fa606ce45cb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOXx8fGVufDB8fHx8fA%3D%3D", 
    //    set: (v) => v === ""
    //     ? "https://images.unsplash.com/photo-1769114385488-3fa606ce45cb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOXx8fGVufDB8fHx8fA%3D%3D" 
    //     : v,
    // },
    image: {
  filename: String,
  url: {
    type: String,
    default: "https://images.unsplash.com/..."
  }
},

    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;