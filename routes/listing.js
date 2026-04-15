const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsyc.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");



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
    const listing = await Listing.findById(id);

    if (!listing) {
      throw new ExpressError(404, "Listing Not Found");
    }

    // Remove dangling review references if review docs were deleted directly from DB.
    const validReviews = await Review.find({ _id: { $in: listing.reviews } });
    if (validReviews.length !== listing.reviews.length) {
      listing.reviews = validReviews.map((review) => review._id);
      await listing.save();
    }

    const reviews = validReviews;
    res.render("listings/show", { listing, reviews });
  }),
);

//CREATE ROUTE
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect(`/listings/${newListing._id}`);
  }),
);

//EDIT ROUTE
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
  }),
);

//UPDATE ROUTE
router.put(
  "/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    // if(!req.body.listing){
    //     throw new ExpressError(404,"send valid data for listings");
    // }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
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
    res.redirect("/listings");
  }),
);

module.exports = router;
