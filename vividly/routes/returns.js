const moment = require("moment");
const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  if (!req.body.customerId)
    return res.status(400).send("customerId not provided");
  if (!req.body.movieId) return res.status(400).send("movieId not provided");
  const rental = Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId
  });
  if (!rental) return res.status(404).send("Rental not found");
  if (rental.dateReturned)
    return res.status(400).send("Return already processed");
  rental.dateReturned = new Date();
  rental.rentalFee =
    moment().diff(rental.dateOut, "days") * rental.movie.dailyRentalRate;
  await rental.save();
  await Movie.update(
    { _id: rental.movie._id },
    {
      $inc: { numberInStock: 1 }
    }
  );

  return res.status(200).send(rental);
  // res.status(401).send("Unauthorized");
});

module.exports = router;
