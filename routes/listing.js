const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsyc.js");

const flash = require("connect-flash");
const { isloggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage }); //destination to save photo like a folder

//Index Route //CREATE ROUTE
router
  .route("/")
  .get(wrapAsync(listingController.index))

  .post(upload.single("listing[image]"), (req, res) => {
    res.send(req.file);
  });

//NEW ROUTE
router.get("/new", isloggedIn, listingController.renderNewForm);

//Read : Show Route //UPDATE ROUTE //DELETE ROUTE
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isloggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing),
  )
  .delete(isloggedIn, isOwner, wrapAsync(listingController.destoryListing));

//EDIT ROUTE
router.get(
  "/:id/edit",
  isloggedIn,
  isOwner,
  wrapAsync(listingController.editListing),
);

module.exports = router;
