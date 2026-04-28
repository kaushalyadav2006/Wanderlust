
# WanderLust

WanderLust is a full‑stack travel listing web app where users can create, browse, review, and manage travel destinations. It’s built with Node.js, Express, MongoDB (Mongoose), and EJS templates, with image uploads (Cloudinary) and map support (Mapbox).

## 🚀 Tech Stack

- **Node.js** (project configured for Node **22.22.2**)
- **Express.js**
- **MongoDB** + **Mongoose**
- **EJS** + **EJS-Mate**
- **Passport (Local)** (authentication)
- **Joi** (validation)
- **Cloudinary** + **Multer** (image upload + hosting)
- **Mapbox** (maps / geocoding token)
- **Bootstrap 5** (UI)

## ✨ Features

- **Auth**: signup, login, logout (Passport local)
- **Listings**: create, browse, edit, delete travel listings
- **Uploads**: listing image upload to Cloudinary
- **Reviews**: add/delete reviews for listings
- **Validation**: server-side validation with Joi
- **UX**: flash messages for success/error feedback
- **Errors**: centralized error handling + 404 page

## 📁 Project Structure (high level)

- `app.js` — main server entry
- `routes/` — `listing.js`, `review.js`, `user.js`
- `controllers/` — route handlers (listings/users/reviews)
- `models/` — Mongoose models
- `views/` — EJS templates (`views/listings/*`, `views/users/*`, layouts/includes)
- `public/` — static assets (CSS/JS/images)
- `middleware.js` — auth/ownership + validators
- `schema.js` — Joi schemas
- `cloudConfig.js` — Cloudinary + Multer storage setup
- `utils/` — helpers like `ExpressError`, `wrapAsync`

## 🛠️ Local Development

### Prerequisites

- **Node.js** (22.22.2 recommended)
- **MongoDB Atlas** connection string (or any MongoDB URI)
- A **Cloudinary** account (for uploads)
- A **Mapbox** token (for map features)

### Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root and add:

```bash
ATLASDB_URL="your_mongodb_connection_string"
SECRET="a_long_random_session_secret"

# Cloudinary
CLOUD_NAME="your_cloudinary_cloud_name"
CLOUD_API_KEY="your_cloudinary_api_key"
CLOUD_API_SECRET="your_cloudinary_api_secret"

# Mapbox (used by views via res.locals.mapToken)
MAP_TOKEN="your_mapbox_token"
```

3. Run the server:

```bash
node app.js
```

4. Open:
- `http://localhost:8080`

## 🌐 Main Routes

### Auth

- `GET /signup` — signup form
- `POST /signup` — create account
- `GET /login` — login form
- `POST /login` — login
- `GET /logout` — logout

### Listings

- `GET /listings` — all listings
- `GET /listings/new` — new listing form (auth required)
- `POST /listings` — create listing (auth required, image upload)
- `GET /listings/:id` — listing details
- `GET /listings/:id/edit` — edit listing form (owner only)
- `PUT /listings/:id` — update listing (owner only, optional image upload)
- `DELETE /listings/:id` — delete listing (owner only)

### Reviews

- `POST /listings/:id/reviews` — add review (auth required)
- `DELETE /listings/:id/reviews/:reviewId` — delete review (author only)

## 📸 Screenshots

Add screenshots/gifs here (homepage, listing page, map, create listing, auth flow).

## 📝 License

ISC

## 👤 Author

Kaushal Yadav
