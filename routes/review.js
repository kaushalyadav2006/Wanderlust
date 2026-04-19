const express = require("express");
// const router = express.Router();
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsyc.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const {isloggedIn, validateReview, isReviewAuthor,} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//POST  REVIEW ROUTE
router.post(
  "/",
  isloggedIn,
  validateReview,
  wrapAsync(reviewController.createReview));

//Delete Review route
router.delete(
  "/:reviewId",
  isloggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview),
);

module.exports = router;
