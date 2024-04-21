const express = require("express");
const mongoose = require("mongoose");
const Detail = require("./models/details.model.js");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
const mailgen = require("mailgen");
app.use(cors());
app.use(express.json());
let config = {
  service: "gmail",
  auth: {
    user: "nithishadhithya04@gmail.com",
    pass: "fricvsgocduhgujh",
  },
};
let transporter = nodemailer.createTransport(config);

let mailGenerator = new mailgen({
  theme: "default",
  product: {
    name: "VOYAGE VISTA",
    link: "https://www.google.com/search?q=travel+spots&oq=travel+spots&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDU0MzhqMGo3qAIIsAIB&sourceid=chrome&ie=UTF-8",
  },
});
app.get("/api", async (req, res) => {
  try {
    const items = await Detail.find({});
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/api", async (req, res) => {
  try {
    const detail = await Detail.create(req.body);
    let response = {
      body: {
        name: " ",
        intro: "Booking Details",
        table: {
          data: [
            {
              "Customer Name": req.body.name,
              "Mobile Number": req.body.number,
              Email: req.body.email,
              Destination: req.body.destination,
              "Boarding Point": req.body.boardingPoint,
              "From Date": req.body.dateStart,
              "To Date": req.body.dateEnd,
              "Adult Count": req.body.adult,
              "Children Count": req.body.child,
              Occassion: req.body.occasion,
              "Hotel Type": req.body.hotelType,
              "Travel Mode": req.body.travelMode,
              Suggestion: req.body.message,
            },
          ],
        },
      },
      outro: "looking forward",
    };
    let mail = mailGenerator.generate(response);
    let message = {
      from: "nithishadhithya04@gmail.com",
      to: "nithishadhithya04@gmail.com",
      subject: "Booking Confirmation",
      html: mail,
    };
    transporter
      .sendMail(message)
      .then(() => {
        return res.status(201).json({
          msg: "Mail sent successfully!",
        });
      })
      .catch((error) => {
        console.error("Error sending mail:", error);
        return res.status(500).json({ error: "Error sending mail." });
      });
    // res.status(200).json(detail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
mongoose
  .connect(
    "mongodb+srv://harishankar:a2mNqvaUc0hCtbm1@backenddb.imusayj.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=backendDB"
  )
  .then(() => {
    console.log("Connected!");
    app.listen(3001, () => {
      console.log("server is running on port 3001");
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
