const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError");
const {listingSchema,reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIn,isReviewAuthor, isOwner } = require("../middlewares.js");
const reviewController = require("../controllers/review.js");

const validateReview = (req,res,next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
     }
}

//post review route
router.post("/" ,validateReview,isLoggedIn, wrapAsync(reviewController.addReview));

//delete review route
router.delete("/:reviewId",isLoggedIn,isOwner,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;