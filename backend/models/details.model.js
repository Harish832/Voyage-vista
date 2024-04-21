const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    number: { type: String, required: true },
    email: { type: String, required: true },
    destination: { type: String, required: true },
    boardingPoint: { type: String, required: true },
    dateStart: { type: String, required: true },
    dateEnd: { type: String, required: true },
    adult: { type: String, required: true },
    child: { type: String, required: true },
    occasion: { type: String, required: true },
    hotelType: { type: String, required: true },
    travelMode: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const detail = mongoose.model("Detail", detailSchema);

module.exports = detail;
