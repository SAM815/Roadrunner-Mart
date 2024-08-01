const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary");

/*
createPost()

NAME
    createPost

SYNOPSIS
    createPost(req, res);

DESCRIPTION
    This function creates a new post with the provided data.
    It uploads the image to Cloudinary and saves the post information in the database.
    The post is associated with the user who created it.
    If successful, it sends a JSON response indicating the post was created.
    In case of an error, it sends a JSON response with the error message.

PARAMETERS
    req - The request object containing post data in the body.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response indicating the success or failure of the operation.
*/
exports.createPost = async (req, res) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "posts",
    });
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user._id,
      description: req.body.description,
      quantity: req.body.quantity,
      price: req.body.price,
    };

   

    const post = await Post.create(newPostData);

    const user = await User.findById(req.user._id);

    user.posts.unshift(post._id);
    console.log("Here");
 

    await user.save();
    res.status(201).json({
      success: true,
      message: "Post created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/*
deletePost()

NAME
    deletePost

SYNOPSIS
    deletePost(req, res);

DESCRIPTION
    This function deletes a post by its ID.
    It checks if the post exists and if the user is authorized to delete it.
    It removes the image from Cloudinary and deletes the post from the database.
    If successful, it sends a JSON response indicating the post was deleted.
    In case of an error, it sends a JSON response with the error message.

PARAMETERS
    req - The request object containing the post ID in the params.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response indicating the success or failure of the operation.
*/
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await cloudinary.v2.uploader.destroy(post.image.public_id);

    await post.deleteOne();

    const user = await User.findById(req.user._id);

    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index, 1);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/*
likeAndUnlikePost()

NAME
    likeAndUnlikePost

SYNOPSIS
    likeAndUnlikePost(req, res);

DESCRIPTION
    This function toggles the like status of a post.
    It checks if the post exists and if the user has already liked it.
    If the user has liked the post, it removes the like.
    If the user has not liked the post, it adds the like.
    If successful, it sends a JSON response indicating the post was liked or unliked.
    In case of an error, it sends a JSON response with the error message.

PARAMETERS
    req - The request object containing the post ID in the params.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response indicating the success or failure of the operation.
*/
exports.likeAndUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);

      post.likes.splice(index, 1);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Unliked",
      });
    } else {
      post.likes.push(req.user._id);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/*
getPostOfFollowing()

NAME
    getPostOfFollowing

SYNOPSIS
    getPostOfFollowing(req, res);

DESCRIPTION
    This function retrieves posts from users that the current user is following.
    It populates the owner, likes, and comments fields of the posts.
    It reverses the order of the posts so the most recent posts appear first.
    If successful, it sends a JSON response with the retrieved posts.
    In case of an error, it sends a JSON response with the error message.

PARAMETERS
    req - The request object containing user information.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response containing the posts from the followed users.
*/
exports.getPostOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    }).populate("owner likes comments.user").select('+description +quantity');

    res.status(200).json({
      success: true,
      posts: posts.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/*
updateCaption()

NAME
    updateCaption

SYNOPSIS
    updateCaption(req, res);

DESCRIPTION
    This function updates the caption, description, quantity, and price of a post.
    It checks if the post exists and if the user is authorized to update it.
    If successful, it sends a JSON response indicating the post was updated.
    In case of an error, it sends a JSON response with the error message.

PARAMETERS
    req - The request object containing the post ID in the params and updated data in the body.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response indicating the success or failure of the operation.
*/
exports.updateCaption = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    post.caption = req.body.caption;
    post.description = req.body.description;
    post.quantity = req.body.quantity;
    post.price = req.body.price;

    

    await post.save();
    res.status(200).json({
      success: true,
      message: "Post updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/*
commentOnPost()

NAME
    commentOnPost

SYNOPSIS
    commentOnPost(req, res);

DESCRIPTION
    This function allows users to comment on a post.
    It checks if the post exists and if the user has already commented.
    If the user has already commented, it updates the comment.
    If the user has not commented, it adds the comment.
    If successful, it sends a JSON response indicating the comment was added or updated.
    In case of an error, it sends a JSON response with the error message.

PARAMETERS
    req - The request object containing the post ID in the params and comment data in the body.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response indicating the success or failure of the operation.
*/
exports.commentOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    let commentIndex = -1;

    // Checking if comment already exists

    post.comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
        commentIndex = index;
      }
    });

    if (commentIndex !== -1) {
      post.comments[commentIndex].comment = req.body.comment;

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Comment Updated",
      });
    } else {
      post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
      });

      await post.save();
      return res.status(200).json({
        success: true,
        message: "Comment added",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Checking If owner wants to delete

    if (post.owner.toString() === req.user._id.toString()) {
      if (req.body.commentId === undefined) {
        return res.status(400).json({
          success: false,
          message: "Comment Id is required",
        });
      }

      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Selected Comment has deleted",
      });
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Your Comment has deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/*
getProductDetails()

NAME
    getProductDetails

SYNOPSIS
    getProductDetails(req, res, next);

DESCRIPTION
    This function retrieves the details of a specific post by its ID.
    It checks if the post exists in the database.
    If the post is found, it sends a JSON response with the post details.
    If the post is not found, it sends a JSON response indicating that the post was not found.

PARAMETERS
    req - The request object containing the post ID in the params.
    res - The response object used to send back the JSON response.
    next - The next middleware function to be called.

RETURNS
    A JSON response containing the post details or an error message if the post is not found.
*/
exports.getProductDetails = async(req, res, next) => {
 
  const post = await Post.findById(req.params.id);

  if(!post){
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }
  
  res.status(200).json({
      success:true,
      post
  })
}