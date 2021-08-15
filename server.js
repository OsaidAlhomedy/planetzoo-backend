require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const server = express();
server.use(cors());
server.use(express.json());
const axios = require("axios");
const PORT = process.env.PORT;

mongoose.connect(`${process.env.MONGO_URL}/users`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

////////////////////////////////////

const Blogs = new mongoose.Schema({
  title: String,
  headline: String,
  article: String,
});

const Animals = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  description: String,
});

const AdoptionAnimals = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  description: String,
  status: { type: Boolean, default: false },
});

const User = new mongoose.Schema({
  name: String,
  email: String,
  country: String,
  role: { type: String, default: "user" },
  blogs: [Blogs],
  givenUp: [Animals],
  adopted: [AdoptionAnimals],
});

const userModel = mongoose.model("user", User);

seedFunc = () => {
  const newUser1 = new userModel({
    name: "Osaid",
    email: "osaid720720@gmail.com",
    country: "JO",
    role: "admin",
    blogs : [{}]
  });
};

// http://localhost:3010/test
server.get("/test", (req, res) => {
  res.status(200).send("Hello from backend");
});

// http://localhost:3010/fact
server.get("/fact", async (req, res) => {
  const name = req.query.name;
  const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${name}`;
  await axios
    .get(url)
    .then((results) => {
      res.status(200).send(results.data.query.pages);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(`Internal Server Error , ${error}`);
    });
});

// http://localhost:3010/location
server.get("/location", async (req, res) => {
  const ip = req.query.ip;
  const url = `http://ip-api.com/json/${ip}`;
  await axios
    .get(url)
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(`Internal Server Error , ${error}`);
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// http://localhost:3010/user
server.get("/user", async (req, res) => {
  const name = req.query.name;
  const email = req.query.email;
  const country = req.query.country;
});

// http://localhost:3010/user
server.post("/user", async (req, res) => {
  const name = req.query.name;
  const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${name}`;
  await axios
    .get(url)
    .then((results) => {
      res.status(200).send(results.data.query.pages);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(`Internal Server Error , ${error}`);
    });
});

// http://localhost:3010/user
server.delete("/user", async (req, res) => {
  const name = req.query.name;
  const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${name}`;
  await axios
    .get(url)
    .then((results) => {
      res.status(200).send(results.data.query.pages);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(`Internal Server Error , ${error}`);
    });
});

// http://localhost:3010/user
server.put("/user", async (req, res) => {
  const name = req.query.name;
  const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${name}`;
  await axios
    .get(url)
    .then((results) => {
      res.status(200).send(results.data.query.pages);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(`Internal Server Error , ${error}`);
    });
});

server.listen(PORT, () => console.log(`listening on ${PORT}`));
