const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsyc.js");

const flash = require("connect-flash");
const { isloggedIn ,isOwner,validateListing} = require("../middleware.js");

//Index Route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  }),
);



//NEW ROUTE
router.get("/new", isloggedIn, (req, res) => {
  res.render("listings/new");
});

//Read : Show Route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
  .populate({
    path: "reviews",
    populate: {
      path: "author", // if your review has author
    },
  })
  .populate("owner");
    if (!listing) {
      req.flash("error", "Listing you requested does not exist!");
      return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing, reviews: listing.reviews });
  }),
);

//CREATE ROUTE
router.post(
  "/",
  isloggedIn,
  validateListing,
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New listings created!");
    res.redirect(`/listings`);
  }),
);

//EDIT ROUTE
router.get(
  "/:id/edit",
  isloggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", " Listing yoy requested does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/edit", { listing });
  }),
);

//UPDATE ROUTE
router.put(
  "/:id",
  isloggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing updated!");

    res.redirect("/listings");
  }),
);

//DELETE ROUTE
router.delete(
  "/:id",
  isloggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deleteLsiting = await Listing.findByIdAndDelete(id);
    console.log(deleteLsiting);
    req.flash("success", "Listings deleted!");
    res.redirect("/listings");
  }),
);

module.exports = router;
