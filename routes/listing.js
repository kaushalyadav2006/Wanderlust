const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsyc.js");

const flash = require("connect-flash");
const { isloggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

//Index Route
router.get("/", wrapAsync(listingController.index));

//NEW ROUTE
router.get("/new", isloggedIn, listingController.renderNewForm);

//Read : Show Route
router.get("/:id", wrapAsync(listingController.showListing));

//CREATE ROUTE
router.post(
  "/",
  isloggedIn,
  validateListing,
  wrapAsync(listingController.createNewListing),
);

//EDIT ROUTE
router.get(
  "/:id/edit",
  isloggedIn,
  isOwner,
  wrapAsync(listingController.editListing),
);

//UPDATE ROUTE
router.put(
  "/:id",
  isloggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing),
);

//DELETE ROUTE
router.delete(
  "/:id",
  isloggedIn,
  isOwner,
  wrapAsync(listingController.destoryListing),
);

module.exports = router;
