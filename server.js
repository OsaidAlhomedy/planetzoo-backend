require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const server = express();
server.use(cors());
server.use(express.json());
const axios = require("axios");
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL, {
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

const Checker = new mongoose.Schema({
  checkerData: Array,
});

const Review = new mongoose.Schema({
  reviewData: String,
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
  adoptedBy: { type: String, default: "anonymous" },
});

const User = new mongoose.Schema({
  name: String,
  email: String,
  country: String,
  role: { type: String, default: "user" },
  blogs: [Blogs],
});

const userModel = mongoose.model("user", User);
const blogModel = mongoose.model("blog", Blogs);
const checkerModel = mongoose.model("checker", Checker);
const animalModel = mongoose.model("givenAnimal", GivenAnimals);
const reviewModel = mongoose.model("review", Review);

seedFunction = () => {
  const userChecker = new checkerModel({
    checkerData: [
      "3M",
      "Acuvue (Johnson & Johnson)",
      "Aim (Church & Dwight)",
      "Air Wick (Reckitt Benckiser)",
      "Algenist",
      "Almay (Revlon)",
      "Always (Procter & Gamble)",
      "Ambi (Johnson & Johnson)",
      "American Beauty (Estee Lauder)",
      "Anna Sui",
      "Aqua di Parma",
      "Aquafresh (GlaxoSmithKline)",
      "Aramis (Estee Lauder)",
      "Arm & Hammer (Church & Dwight)",
      "Arrid (Church & Dwight)",
      "Atelier Cologne",
      "Aveeno (Johnson & Johnson)",
      "Bain de Soleil (Bayer)",
      "Balenciaga",
      "Band-Aid (Johnson & Johnson)",
      "Bausch + Lomb (Valeant Pharmaceuticals)",
      "Beiersdorf",
      "Benefit Cosmetics",
      "BENGAY (Johnson & Johnson)",
      "Bic Corporation",
      "Biotene (GlaxoSmithKline)",
      "Biotherm (L’Oreal)",
      "Blue Buffalo",
      "Bobbi Brown (Estee Lauder)",
      "Bounce (Procter & Gamble)",
      "Bounty (Procter & Gamble)",
      "Braun (Procter & Gamble)",
      "Breathe Right (GlaxoSmithKline)",
      "Burberry",
      "BVLGARI parfums",
      "Cacharel (L’Oreal)",
      "Calgon Water Softener (Reckitt Benckiser)",
      "Calvin Klein Cosmetics",
      "Caudalie USA",
      "Inc.",
      "Chapstick (Pfizer)",
      "Cheer (Procter & Gamble)",
      "Chloe",
      "Christina Aguilera Perfumes (Procter & Gamble)",
      "Church & Dwight (Arm & Hammer)",
      "Citre Shine (Henkel)",
      "Clairol (Coty)",
      "Clarins of Paris",
      "Clarisonic",
      "Clean & Clear (Johnson & Johnson)",
      "Clearasil (Reckitt Benckiser)",
      "Clinique (Estee Lauder)",
      "Clorox",
      "Close-up (Church & Dwight)",
      "Collistar",
      "Comet (Procter & Gamble)",
      "Command (3M)",
      "Condense Paris",
      "Coppertone (Bayer)",
      "Coty Inc.",
      "Crest (Procter & Gamble)",
      "Davidoff",
      "Dawn (Procter & Gamble)",
      "Dial (Henkel)",
      "Diesel",
      "Dior",
      "DOLCE & GABBANA (Coty)",
      "Donna Karan (Estee Lauder)",
      "Downy (Procter & Gamble)",
      "Dr. Brandt’s Skincare",
      "Dr. Jart",
      "Dr. Scholl’s (Bayer)",
      "Drano (S.C. Johnson)",
      "Dry Idea (Henkel)",
      "DTRT",
      "Dunhill Fragrances (Procter & Gamble)",
      "Durex (Reckitt Benckiser)",
      "Easy-Off (Reckitt Benckiser)",
      "Eisenberg Paris",
      "Elie Saab",
      "Elizabeth Arden",
      "ELLEgirl",
      "Era (Procter & Gamble)",
      "Erborian",
      "Escada Fragrances (Coty)",
      "Estée Lauder",
      "Ever Clean (Clorox)",
      "Fantastik (S.C. Johnson)",
      "Febreze (Procter & Gamble)",
      "Fendi",
      "Finish (Reckitt Benckiser)",
      "Fixodent (Procter & Gamble)",
      "For Beloved One",
      "Formula 409 (Clorox)",
      "Fresh Step (Clorox)",
      "Gain (Procter & Gamble)",
      "Gatineau (Revlon)",
      "Gillette Co.(Procter & Gamble)",
      "Giorgio Armani (L’Oreal)",
      "Givenchy Inc.",
      "Glad (Clorox)",
      "Glade (S.C. Johnson)",
      "GLAMGLOW",
      "Good Skin Labs (Estee Lauder)",
      "göt2b (Henkel)",
      "Grassroots (Estee Lauder)",
      "Green Works (Clorox)",
      "Gucci Fragrances (Coty)",
      "Guerlain",
      "Head & Shoulders (Procter & Gamble)",
      "Helena Rubinstein (L’Oreal)",
      "Hoyu",
      "Hugo Boss (Coty)",
      "Institut Esthederm",
      "Issey Miyake",
      "Ivory (Procter & Gamble)",
      "J.F. Lazartigue",
      "Jimmy Choo",
      "Jo Malone (Estee Lauder)",
      "Johnson & Johnson",
      "Johnson’s (Johnson & Johnson)",
      "Joy (Procter & Gamble)",
      "Jurlique Pure Skin Care",
      "Kaboom (Church & Dwight)",
      "Kao USA",
      "Kenzo Parfums",
      "Kerastase (L’Oreal)",
      "Kiehl’s (L’Oreal)",
      "Kose",
      "K.Y. (Johnson & Johnson)",
      "La Mer (Estee Lauder)",
      "Lab Series for Men (Estee Lauder)",
      "Lacoste Fragrances (Coty)",
      "Lancaster Beauty",
      "Lancôme (L’Oreal)",
      "Laneige",
      "Lanvin",
      "LaRoche Posay (L’Oreal)",
      "Leaders Cosmetics",
      "Liquid Plumr (Clorox)",
      "Listerine (Johnson & Johnson)",
      "L’Occitane",
      "L’Occitane",
      "Loewe",
      "L’Oreal USA",
      "Lubriderm (Johnson & Johnson)",
      "Lysol (Reckitt Benckiser)",
      "M.A.C. Cosmetics (Estee Lauder)",
      "Makeup Forever",
      "Marc Jacobs Fragrances",
      "Mary Kay",
      "Matrix (L’Oreal)",
      "Max Factor (Coty)",
      "Maybelline (L’Oreal)",
      "Mead",
      "Mediplorer",
      "Melaleuca",
      "Menard Cosmetics",
      "Mentadent (Church & Dwight)",
      "Merck",
      "Michael Kors (Estee Lauder)",
      "Missoni (Estee Lauder)",
      "Mitchum Deodorant (Revlon)",
      "miu miu",
      "Mizani (L’Oreal)",
      "Mont Blanc",
      "Mr. Clean (Procter & Gamble)",
      "My Trendy Kit",
      "Nair (Church & Dwight)",
      "Nars Cosmetics",
      "Natural Balance Pet Foods",
      "Inc.",
      "Natural Instincts (Coty)",
      "Nature’s Source (SC Johnson)",
      "Neutrogena (Johnson & Johnson)",
      "New Dana Perfumes",
      "Nexcare (3M)",
      "Nice ‘n Easy (Coty)",
      "Nina Ricci (Puig)",
      "Nioxin (Coty)",
      "Nivea (Beiersdorf)",
      "Nu Skin International",
      "Off (S.C.Johnson)",
      "OGX (Organix)",
      "Ojon (Estee Lauder)",
      "Olay (Procter & Gamble)",
      "Old English (Reckitt Benckiser)",
      "Old Spice (Procter & Gamble)",
      "Oomph! (Clorox)",
      "Orange Glo (Church & Dwight)",
      "Oriflame USA",
      "Origins (Estee Lauder)",
      "Osiao (Estee Lauder)",
      "Oust (SC Johnson)",
      "OxiClean (Church & Dwight)",
      "Paco Rabanne (Puig)",
      "Pampers (Procter & Gamble)",
      "Pantene (Procter & Gamble)",
      "Pearl Drops (Church & Dwight)",
      "Pepsodent (Church & Dwight)",
      "Peter Thomas Roth",
      "Physique (Procter & Gamble)",
      "Phyto",
      "Pine-Sol (Clorox)",
      "Piz Buin (Johnson & Johnson)",
      "Pledge (S.C. Johnson)",
      "POLA Cosmetics",
      "Polident (GlaxoSmithKline)",
      "Post-It (3M)",
      "Prada (Puig)",
      "Procter & Gamble",
      "Pronamel (GlaxoSmithKline)",
      "Puffs (Procter & Gamble)",
      "Pure Heal’s",
      "Purex (Dial)",
      "Purpose (Johnson & Johnson)",
      "Raid (S.C. Johnson)",
      "Ralph Lauren Fragrances (L’oreal)",
      "Reach (Johnson & Johnson)",
      "Reckitt Benckiser",
      "Redken (L’Oreal)",
      "Rembrandt (Johnson & Johnson)",
      "Renuzit (Dial)",
      "Resolve (Reckitt Benckiser)",
      "Revlon",
      "Rid-X (Reckitt Benckiser)",
      "Right Guard (Henkel)",
      "Roberto Cavalli",
      "ROC (Johnson & Johnson)",
      "Rogaine (Johnson & Johnson)",
      "Rossi & Rossa",
      "Safeguard (Procter & Gamble)",
      "Salvatore Ferragamo",
      "Savlon (Johnson & Johnson)",
      "S.C. Johnson",
      "Schwarzkopf (Henkel)",
      "Scoop Away (Clorox)",
      "Scope (Procter & Gamble)",
      "Scotch (3M)",
      "Scotch-Brite (3M)",
      "Scotchgard (3M)",
      "Scrub Free (Church & Dwight)",
      "Scrubbing Bubbles (S.C. Johnson)",
      "Sebastian International",
      "Sebastian Professional (Coty)",
      "Sensodyne (GlaxoSmithKline)",
      "Sephora Cosmetics",
      "Shiseido Cosmetics",
      "Shout (S.C. Johnson)",
      "Shower to Shower (Johnson & Johnson)",
      "Shu Uemura",
      "Shu Uemura(L’Oreal)",
      "Sinful Colors (Revlon)",
      "SK-II (Procter & Gamble)",
      "Skin ID (Johnson & Johnson)",
      "SkinVitals",
      "Soft Scrub (Dial)",
      "SoftSheen (L’Oreal)",
      "S.O.S. (Clorox)",
      "Spray ’N Wash (Reckitt Benckiser)",
      "Swiffer (Procter & Gamble)",
      "Talika",
      "The History of Whoo",
      "Thermacare (Pfizer)",
      "Thursday Plantation",
      "Tide (Procter & Gamble)",
      "Tilex (Clorox)",
      "Tom Ford (Estee Lauder)",
      "Tommy Hilfiger (Estee Lauder)",
      "Tone (Henkel)",
      "Trend (Henkel)",
      "Trojan (Church & Dwight)",
      "Valentino",
      "Veet (Reckitt Benckiser)",
      "VELD’S Skincare",
      "Venus (Procter & Gamble)",
      "Vera Wang",
      "Versace",
      "Vichy (L’Oreal)",
      "Vicks (Procter & Gamble)",
      "Victoria’s Secret (L Brands)",
      "Vidal Sassoon (Coty)",
      "Viktor & Rolf (L’Oreal)",
      "Visine (Johnson & Johnson)",
      "Walgreens",
      "Wei Beauty",
      "Wella (Coty)",
      "Windex (S.C. Johnson)",
      "Woolite (Reckitt Benckiser)",
      "Xtra (Church & Dwight)",
      "Yves Rocher USA",
      "Zegna",
      "Zirh",
      "Zout (Henkel)",
    ],
  });
  userChecker.save();
};

// seedFunction()

seedFunc2 = () => {
  const userReview = new reviewModel({
    reviewData: "awesome blogs keep it up",
  });
  userReview.save();
};

// seedFunc2()

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

// http://localhost:3010/getAnimalAdoption
server.get("/getAnimalAdoption", async (req, res) => {
  animalModel.find({}, (error, result) => {
    if (error) {
      res.status(404).send(`No Animals found , ${error}`);
    } else {
      res.status(200).send(result);
    }
  });
});

// http://localhost:3010/updateAnimal
server.put(`/updateAnimal/:id`, async (req, res) => {
  const id = req.params.id;
  console.log(req);
  const { petName, petType, petBreed, petAge, petDesc } = req.body;
  await animalModel.updateOne(
    { _id: id },
    {
      name: petName,
      type: petType,
      breed: petBreed,
      age: petAge,
      description: petDesc,
    }
  );
  animalModel.find({}, (error, result) => {
    if (error || result.length == 0) {
      res.status(404).send(`No animals found , ${error}`);
    } else {
      res.status(200).send(result);
    }
  });
});

// http://localhost:3010/updateAdoptedAnimal
server.put(`/updateAdoptedAnimal/:id`, async (req, res) => {
  const id = req.params.id;
  const { adoptName } = req.body;
  await animalModel.updateOne(
    { _id: id },
    {
      adoptionStatus: true,
      adoptedBy: adoptName,
    }
  );
  animalModel.find({}, (error, result) => {
    if (error || result.length == 0) {
      res.status(404).send(`No animals found , ${error}`);
    } else {
      res.status(200).send(result);
    }
  });
});

// http://localhost:3010/filterAnimal
server.get("/filterAnimal", async (req, res) => {
  const { petType, petAge, petStatus } = req.query;
  if (petType == "All") {
    animalModel.find(
      { age: petAge, adoptionStatus: petStatus },
      (error, result) => {
        if (error) {
          res.status(404).send(`No Animals found , ${error}`);
        } else {
          res.status(200).send(result);
        }
      }
    );
  } else if (petAge == "All") {
    animalModel.find(
      { type: petType, adoptionStatus: petStatus },
      (error, result) => {
        if (error) {
          res.status(404).send(`No Animals found , ${error}`);
        } else {
          res.status(200).send(result);
        }
      }
    );
  } else if (petStatus == "All") {
    animalModel.find({ type: petType, age: petAge }, (error, result) => {
      if (error) {
        res.status(404).send(`No Animals found , ${error}`);
      } else {
        res.status(200).send(result);
      }
    });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//http://localhost:3010/company
server.get("/company", async (req, res) => {
  checkerModel.find({}, (error, result) => {
    if (error || result.length === 0) {
      res.status(404).send(`No Companies found , ${error}`);
    } else {
      res.status(200).send(result);
    }
  });
});

//////////////////////////////////
// http://localhost:3010/reviews
server.get("/reviews", async (req, res) => {
  reviewModel.find({}, (error, result) => {
    if (error || result.length == 0) {
      res.status(404).send(`No blogs found , ${error}`);
    } else {
      res.status(200).send(result);
    }
  });
});

// http://localhost:3010/reviews
server.post(`/reviews`, async (req, res) => {
  const { reviewData } = req.body;
  console.log(reviewData);
  await reviewModel.insertMany({
    reviewData: reviewData,
  });
  reviewModel.find({}, (error, result) => {
    if (error || result.length == 0) {
      res.status(404).send(`No reviews found , ${error}`);
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
});

//http://localhost:3010/randomFact
server.get("/randomFact", async (req, res) => {
  await axios
    .get("http://api.fungenerators.com/fact/random?category=Animal", {
      headers: {
        "X-Fungenerators-Api-Secret": "pnaV0Bhrna2TgsFxuEDhjQeF",
        accept: "application/json",
      },
    })
    .then((result) => {
      const factData = {
        animal: result.data.contents.subcategory,
        fact: result.data.contents.fact,
      };
      res.status(200).send(factData);
    })
    .catch((err) => {
      res.status(404).send(`No facts found , ${error}`);
    });
});

server.listen(PORT, () => console.log(`listening on ${PORT}`));
