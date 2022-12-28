const express = require('express');
const { Model } = require('sequelize');
const router = express();

const { Booking, Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check} = require("express-validator");
const {handleValidationErrors} = require('../../utils/validation')

// Get All Current User's Bookings
router.get('/current', requireAuth, async (req, res, next) => {
  const bookings = await Booking.findAll({
    where:{
      userId: req.user.id
    },
    include: {
      model: Spot,
      attributes:['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
      include:{
        model:SpotImage
      }
    }
  })

  if(bookings.length === 0){
    res.status = 404;
    return res.json({
      "message": "User has no bookings."
    })
  }
  const bookingsList = [];
  bookings.forEach(booking => {
    bookingsList.push(booking.toJSON());
  })
  bookingsList.forEach(booking => {
    booking.Spot.SpotImages.forEach(spotImage => {
      if(spotImage.preview)
      {
        booking.Spot.previewImage = spotImage.url;
      }
    })
    if(!booking.Spot.previewImage){
      booking.Spot.previewImage = "No PreviewImage"
    }
    delete booking.Spot.SpotImages;
  })
  res.json(
    {
    "Bookings":bookingsList
    }
  );
})

//Edit a Booking
const validateBooking = [
  check('startDate')
    .exists({ checkFalsy: true })
    .withMessage('StartDate is required'),
  check('endDate')
    .exists({ checkFalsy: true })
    .withMessage('StartDate is required'),
  handleValidationErrors
];
router.put('/:id', requireAuth, validateBooking, async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.id);
  console.log(booking);
  res.json("test");
})

module.exports = router;
