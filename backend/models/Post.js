const mongoose = require("mongoose");
/*
Post Schema

NAME
    Post Schema

SYNOPSIS
    const postSchema = new mongoose.Schema({...});

DESCRIPTION
    This schema defines the structure for a Post document in the MongoDB database.
    It includes fields for caption, description, image details, ownership, timestamps, likes, comments,
    quantity, and price.

FIELDS
    caption - Short text describing the post (optional).

    description - Detailed text providing more information about the post (optional).

    image - Object containing image details.
        public_id - Identifier for the image in the image storage service (optional).
        url - URL to access the image (optional).

    owner - Reference to the User document who created the post (optional).

    updated - Date when the post was last updated (optional).

    createdAt - Date when the post was created (default: current date and time).

    likes - Array of User references who liked the post (optional).

    comments - Array of comments on the post.
        user - Reference to the User document who made the comment (optional).
        comment - The comment text (required).

    quantity - The number of items available in the post (required).
        Must be a non-negative number with a default value of 1.

    price - Price of the item in the post (required).
        Must be a non-negative number.

OPTIONS
    { strictPopulate: false } - Allows population of fields that are not strictly defined in the schema.

EXPORTS
    The schema is used to create the Post model, which is exported for use in other parts of the application.
*/


const postSchema = new mongoose.Schema({
  caption: String,
  description: String,

  image: {
    public_id: String,
    url: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updated: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [0, "Quantity cannot be negative"],
    default: 1
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"]
  },

}, { strictPopulate: false });

module.exports = mongoose.model("Post", postSchema);