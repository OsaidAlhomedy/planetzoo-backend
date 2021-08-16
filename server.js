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
  img: String,
  article: String,
  writtenBy: { type: String, default: "admin" },
  approval: { type: Boolean, default: false },
});

const GivenAnimals = new mongoose.Schema({
  name: String,
  type: String,
  breed: String,
  age: String,
  img: String,
  description: String,
  givenBy: { type: String, default: "anonymous" },
  userEmail: String,
  adoptionStatus: { type: Boolean, default: false },
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
  givenUp: [GivenAnimals],
  adopted: [AdoptionAnimals],
});

const userModel = mongoose.model("user", User);
const blogModel = mongoose.model("blog", Blogs);
const animalModel = mongoose.model("givenAnimal", GivenAnimals);

// blogModel.insertMany({title:})

seedFunc = () => {
  const newUser1 = new userModel({
    name: "Osaid",
    email: "osaid720720@gmail.com",
    country: "JO",
    role: "admin",
  });

  const newBlog1 = new blogModel({
    title: "5 Animals That are Going to Extinct",
    headline: "Who is to blame?",
    img: "https://media.wsimag.com/attachments/655243ce2ec44c8423532995b99ae924a2593542/store/fill/1090/613/fa6c2fb27344be4ae7cb284272892425b16891b76475a854df929f80de03/It-will-occur-by-2026-a-projected-10-degree-Celsius-increase-in-global-temperatures.jpg",
    article: `Who is to blame if Earth is on the verge of the "sixth mass extinction"
        as many scientists believe? Why is there such a dramatic reduction in
        biodiversity, and how can we stop it? Humans are responsible for the
        majority of the problems that endangered animals face. Researchers
        warned in 2020 that more than 500 vertebrate species are on the verge of
        extinction in the next 20 years. Human behavior is driving this
        extinction disaster first and foremost. And here is a list of it :
        1-Saola: According to the IUCN, the greatest threat to the severely
        endangered saola, which was discovered only a few years ago in 1992, is
        hunting, with the mammal being particularly sensitive to dog hunting.
        Experts believe the “saola cannot be rescued without accelerated
        dismantling of poachers' snares and reduction of hunting with dogs in
        crucial regions of the Annamite forests,” according to the IUCN in 2009.
        2- Amur Leopard The Amur Leopard is a severely endangered species.
        Because of "severe habitat degradation and conflict with humans," the
        Amur leopard is considered "important." Conversion of land for farming
        is one of the main causes of habitat loss. The WWF points out that
        agriculture has an indirect impact on the leopard's fate. “The leopards'
        habitat is surrounded by agriculture and villages. 3-Black Rhino and
        Northern White Rhino Although poaching for rhino horns is widely
        acknowledged as the biggest threat to the Black rhino and other rhinos,
        Save the Rhino considers habitat loss to be “a substantial hazard to
        rhino populations.” 4- The Cross River Gorilla According to the IUCN Red
        List, the Cross River Gorilla is highly endangered and was formerly
        thought to be extinct. Along with hunting, habitat degradation is one of
        the dangers the great ape faces. The Cross River Gorilla is also in risk
        from animal agriculture. 5- Hawksbill sea turtle The fishing industry is
        one of the most serious threats to the endangered hawksbill sea turtle.
        Hawksbills, which are at risk of having their eggs harvested or being
        slaughtered for their meat or shells, are also endangered by farm
        run-off, which includes fertilizers.`,
  });
  const newBlog2 = new blogModel({
    title: "Interesting facts about animals that already Extinct",
    headline: "Climatic changes , are you ready ?",
    img: "https://cdn.britannica.com/08/117808-050-FEF7CE67/species-humans.jpg",
    article: `
        Natural events such as climatic change, as well as warming in sea
        levels, can trigger animal extinctions. Human action has been blamed in
        more recent times, however. The main cause of modern extinctions, along
        with pollution, the introduction of foreign species, and overfishing and
        hunting, is habitat destruction as farming land grows and forests are
        chopped down. However, here is a list of facts about animals that are
        already extinct: 1- Dodo The Dodo was a flightless bird that lived in
        Mauritius and was about one meter tall and weighed 10–18 kg. The only
        account of the Dodo's appearance that we have is through various
        pictures and textual tales from the 17th century, therefore its exact
        look is unknown. Because of the abundance of food supplies (seeds,
        roots, and fallen fruits) and the lack of predators, the bird is thought
        to have become flightless. The dodo was originally mentioned by Dutch
        sailors in 1598. Sailors and their tamed animals, as well as exotic
        species, hunted the bird to extinction. In 1662, the least commonly
        accepted sighting of a Dodo occurred. 2- Woolly Mammoth A large creature
        that is thought to be linked to the current elephant. About 3.5 million
        years ago, its ancestors left Africa and moved throughout northern
        Eurasia and North America. The monster stood over 4 meters tall and
        weighed over 6 tons. Their fur was thick, and their curved tusks might
        easily reach 5 meters in length! The Woolly Mammoth became extinct
        10,000 years ago as a result of human hunting and the disappearance of
        its habitat due to climate change. Around 1700BC, the last of the
        isolated woolly mammoth populations perished from Wrangel Island in the
        Arctic Ocean. 3- Sabre-toothed Cat They lived 55 million to 11,700 years
        ago and were known as Sabre-toothed Tigers or Sabre-toothed Lions.
        Sabre-tooth Cats were carnivores with elongated bladelike canine teeth
        that might reach 50cm in length in some species. They were said to be
        outstanding hunters and hunted animals such as sloths and mammoths
        because of their bear-like physique.`,
  });
  newBlog1.save();
  newBlog2.save();
};

// seedFunc();

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

// http://localhost:3010/blog
server.get("/blog", async (req, res) => {
  blogModel.find({}, (error, result) => {
    if (error || result.length == 0) {
      res.status(404).send(`No blogs found , ${error}`);
    } else {
      res.status(200).send(result);
    }
  });
});

// http://localhost:3010/Blog
server.post(`/blog`, async (req, res) => {
  const { title, headline, article, img } = req.body;
  blogModel.insertMany({
    title: title,
    headline: headline,
    article: article,
    img: img,
  });
  blogModel.find({}, (error, result) => {
    if (error || result.length == 0) {
      res.status(404).send(`No blogs found , ${error}`);
    } else {
      res.status(200).send(result);
    }
  });
});

// http://localhost:3010/addAnimal
server.post(`/addAnimal`, async (req, res) => {
  const {
    petName,
    petType,
    petBreed,
    petAge,
    petDesc,
    petImg,
    userName,
    userEmail,
  } = req.body;
  animalModel.insertMany({
    name: petName,
    type: petType,
    breed: petBreed,
    age: petAge,
    description: petDesc,
    img: petImg,
    givenBy: userName,
    userEmail: userEmail,
  });
  animalModel.find({}, (error, result) => {
    if (error || result.length == 0) {
      res.status(404).send(`No animals found , ${error}`);
    } else {
      res.status(200).send(result);
    }
  });
});

// http://localhost:3010/deleteAnimal
server.delete(`/deleteAnimal/:id`, async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await animalModel.deleteOne({ _id: id });
  res.status(200).send("animal deleted");
});

// http://localhost:3010/getAnimal
server.get("/getAnimal", async (req, res) => {
  const email = req.query.email;
  animalModel.find({ userEmail: email }, (error, result) => {
    if (error) {
      res.status(404).send(`No Animals found , ${error}`);
    } else {
      res.status(200).send(result);
    }
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
