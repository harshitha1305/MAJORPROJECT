const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError");
const {listingSchema,reviewSchema} = require("../schema.js");
const {isLoggedIn,isOwner} = require("../middlewares.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage})

const validateListing = (req,res,next) =>{
       let {error} = listingSchema.validate(req.body);
     if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
     }else{
        next();
     }
}

router
.route("/")
.get(wrapAsync(listingController.index))
.post(validateListing,
   upload.single('listing[image]'),
   isLoggedIn,
   wrapAsync(listingController.createListing));

// new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//edit route 
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

router.get("/category/:category",wrapAsync(listingController.categoryListings));

router.get("/search",wrapAsync(listingController.searchListings));

router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(validateListing,isOwner,
upload.single('listing[image]'),
isLoggedIn,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


module.exports = router;