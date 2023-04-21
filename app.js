import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import moment from "moment";

import { getHabbo, getFullHabbo, hotels } from "./utils/habboapi.js";

const PORT = process.env.PORT || 3005;
const app = express();
app.use(cors());
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.moment = moment;

app.get("/", function (req, res) {
  res.render("index", { hotels });
});

app.post("/habbo", async (req, res) => {
  const username = req.body.habbo;
  const hotel = req.body.hotel;

  let a, uniqueId, userData;
  a = await getHabbo(username, hotel);

  userData = await getFullHabbo(a.uniqueId);

  res.render("habbo", { userData });
});

/*

for use api

app.post("/", async (req, res) => {
  const username = req.body.username;
  let userData;
  console.log(req.body);
  try {
    userData = await getHabbo(username, "com.tr");
  } catch (error) {
    responseData(res, error.message, 400);
  }
  res.send(userData);
});
*/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
