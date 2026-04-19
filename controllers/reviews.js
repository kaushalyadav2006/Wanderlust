const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
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
  req.flash("success", "New review created!");
  res.redirect(`/listings/${listing._id}`);
};



module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    throw new ExpressError(404, "Listing Not Found");
  }

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted!");
  res.redirect(`/listings/${id}`);
};
