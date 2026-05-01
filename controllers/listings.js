const Listing = require("../models/listing");
const mongoose = require("mongoose");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

async function geocodeBestMatch({ location, country }) {
  const loc = (location || "").trim();
  const ctry = (country || "").trim();

  // Try both orders because some inputs resolve better as "Country, City"
  // (example: "Fiji, Nadi") than "City, Country".
  const queries = [
    [loc, ctry].filter(Boolean).join(", "),
    [ctry, loc].filter(Boolean).join(", "),
    loc,
  ].filter(Boolean);

  for (const query of queries) {
    const response = await geocodingClient
      .forwardGeocode({ query, limit: 5 })
      .send();
    const features = response?.body?.features || [];
    if (!features.length) continue;

    if (!ctry) return features[0];

    const ctryLower = ctry.toLowerCase();
    const matched =
      features.find((f) =>
        (f.place_name || "").toLowerCase().includes(ctryLower),
      ) || features[0];

    return matched;
  }
  return null;
}

// module.exports.index = async (req, res) => {
//   const allListings = await Listing.find({});
//   res.render("listings/index", { allListings });
// };

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    req.flash("error", "Invalid listing link.");
    return res.redirect("/listings");
  }

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author", // if your review has author
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested does not exist or was removed.");
    return res.redirect("/listings");
  }
  // console.log(listing); // for showing the listing data
  res.render("listings/show.ejs", { listing, reviews: listing.reviews });
};

module.exports.createNewListing = async (req, res, next) => {
  const rawLocation = (req.body.listing?.location || "").trim();
  const rawCountry = (req.body.listing?.country || "").trim();

  let url = req.file.path;
  let filename = req.file.filename;
  console.log(url, "..", filename);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  const feature = await geocodeBestMatch({
    location: rawLocation,
    country: rawCountry,
  });
  if (!feature?.geometry?.coordinates) {
    req.flash(
      "error",
      "Could not find that location on the map. Please enter a more specific location (e.g. City, State, Country).",
    );
    return res.redirect("/listings/new");
  }

  newListing.geometry = feature.geometry; // from mapbox
  let savedListing = await newListing.save();

  console.log(savedListing);
  req.flash("success", "New listings created!");
  res.redirect(`/listings`);
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", " Listing yoy requested does not exist!");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");

  // Fetch distinct categories from the database
  const categories = await Listing.distinct("category");
  res.render("listings/edit.ejs", { listing, originalImageUrl, categories });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested does not exist or was removed.");
    return res.redirect("/listings");
  }
  const nextLocation = (req.body.listing?.location || "").trim();
  const nextCountry = (req.body.listing?.country || "").trim();
  const prevLocation = (listing.location || "").trim();
  const prevCountry = (listing.country || "").trim();

  listing.set({ ...req.body.listing, location: nextLocation, country: nextCountry });

  // If location changed, update geometry for Mapbox
  const didLocationChange =
    (nextLocation && nextLocation !== prevLocation) ||
    (nextCountry && nextCountry !== prevCountry);

  if (nextLocation && didLocationChange) {
    const feature = await geocodeBestMatch({
      location: nextLocation,
      country: nextCountry,
    });
    if (!feature?.geometry?.coordinates) {
      req.flash(
        "error",
        "Could not find that updated location on the map. Please enter a more specific location.",
      );
      return res.redirect(`/listings/${id}/edit`);
    }
    listing.geometry = feature.geometry;
  }

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
  }

  await listing.save();
  req.flash("success", "Listing updated!");

  // res.redirect("/listings");
  res.redirect(`/listings/${id}`);
};

module.exports.destoryListing = async (req, res) => {
  let { id } = req.params;
  let deleteLsiting = await Listing.findByIdAndDelete(id);
  console.log(deleteLsiting);
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};


module.exports.index = async (req, res) => {
  const q = (req.query.q || "").trim();

  let filter = {};
  if (q) {
    const regex = new RegExp(q, "i");
    filter = {
      $or: [{ title: regex }, { location: regex }, { country: regex }],
    };
  }
  const allListings = await Listing.find(filter);

  if (q && allListings.length === 0) {
    req.flash(
      "error",
      "No listings found for this location. Try a different search.",
    );
    return res.redirect("/listings");
  }
  res.render("listings/index.ejs", { allListings, q });
};


module.exports.index = async (req, res) => {
  const q = (req.query.q || "").trim();
  const { category } = req.query;
  let filter = {};
  if (q) {
    const regex = new RegExp(q, "i");
    filter.$or = [{ title: regex }, { location: regex }, { country: regex }];
  }
  if (category) {
    filter.category = category;
  }
  const allListings = await Listing.find(filter);

  if (q && allListings.length === 0) {
    req.flash(
      "error",
      "No listings found for this location. Try a different search."
    );
    return res.redirect("/listings");
  }
  res.render("listings/index.ejs", { allListings, q, category });
};