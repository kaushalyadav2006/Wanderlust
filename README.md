# WanderLust

A Node.js + Express travel listing web app with EJS templates, MongoDB, and review features.

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- EJS + EJS-Mate
- Joi validation
- Method Override

## Features

- Create, read, update, and delete listings
- Add and delete reviews for listings
- Server-side validation with Joi
- Error handling with custom middleware

## Project Structure

- `app.js` - main server entry
- `routes/` - listing and review routes
- `models/` - Mongoose models
- `views/` - EJS templates
- `public/` - static CSS/JS assets
- `schema.js` - Joi schemas

## Local Setup

1. Install dependencies
   ```bash
   npm install
   ```
2. Ensure MongoDB is running locally on:
   - `mongodb://127.0.0.1:27017/wanderlust`
3. Start the app
   ```bash
   node app.js
   ```
4. Open in browser:
   - `http://localhost:8080`

## Main Routes

- `GET /` - root route
- `GET /listings` - all listings
- `GET /listings/new` - create listing form
- `POST /listings` - create listing
- `GET /listings/:id` - listing details
- `GET /listings/:id/edit` - edit listing form
- `PUT /listings/:id` - update listing
- `DELETE /listings/:id` - delete listing
- `POST /listings/:id/reviews` - add review
- `DELETE /listings/:id/reviews/:reviewId` - delete review

## Author

Kaushal yadav
