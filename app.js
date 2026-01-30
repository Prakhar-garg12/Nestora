const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override")

const MONGO_URL = 'mongodb://127.0.0.1:27017/Nestora';

main()
 .then(() =>{
    console.log("Connected to DB");
 })
 .catch((err)=>{
    console.log(err);
 })

async function main() {
    await mongoose.connect(MONGO_URL)
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"))

app.get("/", (req, res) => {
    res.send("HI, I am root");
});

// index route

app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings})
})

// create route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs")
})

//edit route
app.get("/listings/:id/edit", async (req, res) => {
     let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing})
})

// update Route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
     const listing = await Listing.findByIdAndUpdate(id, req.body.listing);
     res.redirect(`/listing/${id}`)
})

// show route
app.get("/listing/:id", async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{ listing })
})

// create route
app.post("/listings", async (req, res) => {
    let {title, description, image, price, country, location} = req.body;
    console.log(req.body);  

    const newListing = new Listing(req.body)
    await newListing.save();
    res.redirect("/listings");
    
})


// Delete route
app.delete("/listings/:id", async(req, res) => {
    let { id } = req.params;
   let deletedListing = await Listing.findByIdAndDelete(id)
   console.log(deletedListing)
   res.redirect("/listings");
})

// app.get("/testListing", async (req, res) =>{
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Goa",
//         country: "India"
//     });
//     await sampleListing.save();
//     console.log("sample was save");
//     res.send("Succesfully testing");
// })

app.listen(8080, () => {
    console.log("server is listening to port 8080")
})