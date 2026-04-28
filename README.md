
# WanderLust 🧳🌍

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.x-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen)](https://mongoosejs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

WanderLust is a full-stack travel listing web app where users can create, browse, review, and manage travel destinations. Built with Node.js, Express, MongoDB, and EJS templates. Includes user authentication, image uploads, and interactive maps.


## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** & **Mongoose**
- **EJS** & **EJS-Mate**
- **Joi** (validation)
- **Cloudinary** (image hosting)
- **Mapbox GL JS** (interactive maps)
- **Bootstrap 5** (UI)


## ✨ Features

- User authentication (register/login/logout)
- Create, read, update, and delete travel listings
- Upload images for listings (Cloudinary)
- Interactive maps for each listing (Mapbox)
- Add and delete reviews for listings
- Server-side validation with Joi
- Flash messages for feedback
- Robust error handling with custom middleware


## 📁 Project Structure

- `app.js` — main server entry
- `routes/` — listing, review, and user routes
- `models/` — Mongoose models
- `views/` — EJS templates
- `public/` — static CSS/JS assets
- `schema.js` — Joi schemas
- `cloudConfig.js` — Cloudinary config
- `middleware.js` — custom middleware


## 🛠️ Local Development

1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/wanderlust.git
   cd wanderlust
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in your MongoDB, Cloudinary, and Mapbox credentials.
4. **Start MongoDB** (if not running):
   - `mongod` (or use MongoDB Atlas)
5. **Run the app:**
   ```bash
   node app.js
   ```
6. **Open in browser:**
   - [http://localhost:8080](http://localhost:8080)


## 🌐 Main Routes

- `GET /` — root route
- `GET /listings` — all listings
- `GET /listings/new` — create listing form
- `POST /listings` — create listing
- `GET /listings/:id` — listing details
- `GET /listings/:id/edit` — edit listing form
- `PUT /listings/:id` — update listing
- `DELETE /listings/:id` — delete listing
- `POST /listings/:id/reviews` — add review
- `DELETE /listings/:id/reviews/:reviewId` — delete review


## 📸 Screenshots

_Add screenshots of your app here!_

## 📝 License

MIT

---

## 👤 Author

**Kaushal Yadav**
