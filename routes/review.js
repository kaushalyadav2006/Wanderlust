const express = require("express");
// const router = express.Router();
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsyc.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const { isloggedIn, validateReview ,isReviewAuthor} = require("../middleware.js");

//REVIEWS
//post  Review route
router.post(
  "/",
  isloggedIn,
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
      throw new ExpressError(404, "Listing Not Found");
    }
    let newReview = new Review(req.body.review);
    newReview.name = req.user.username;
    newReview.author = req.user._id;
    console.log(newReview);

    listing.reviews.push(newReview._id);
    await newReview.save();
    await Listing.findByIdAndUpdate(req.params.id, {
      $addToSet: { reviews: newReview._id },
    });
    // console.log("new review saved");
    // res.send("new review saved");
    req.flash("success", "New review created!");

    res.redirect(`/listings/${listing._id}`);
  }),
);

//Delete Review route
router.delete(
  "/:reviewId",
  isloggedIn,
isReviewAuthor,
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      throw new ExpressError(404, "Listing Not Found");
    }

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
  }),
);

module.exports = router;
