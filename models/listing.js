const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const User = require("./user.js");
const { required } = require("joi");

const listingSchema = new Schema({
  title: String,
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
  owner: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,  // likely needed
    },
    coordinates: {
      type: [Number],
      required: true,
    }
  },
  category: {
    type: String,
    enum: [
      "trending",
      "Room",
      "beach",
      "farm",
      "mountain",
      "apartment",
      "amazing pool",
      "arctic",
      "camping",
      "safari",
      "iconic cities"
    ],
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
