const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsyc.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const flash = require("connect-flash");

//Index Route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  }),
);

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errorMsg = error.details.map((el) => el.message);
    throw new ExpressError(400, errorMsg);
  } else {
    next();
  }
};

//NEW ROUTE
router.get("/new", (req, res) => {
  res.render("listings/new");
});

//Read : Show Route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
      req.flash("error", "Listing you requested does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing, reviews: listing.reviews });
  }),
);

//CREATE ROUTE
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New listings created!");
    res.redirect(`/listings`);
  }),
);

//EDIT ROUTE
router.get(
  "/:id/edit",
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
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deleteLsiting = await Listing.findByIdAndDelete(id);
    console.log(deleteLsiting);
    req.flash("success", "Listings deleted!");
    res.redirect("/listings");
  }),
);

module.exports = router;
