const express = require("express");
const bodyParser = require("body-parser");
const calcHistory = require("./calcHistory");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("server/public"));

app.get("/calcHistory", (req, res) => {
  res.send(calcHistory);
  console.log(calcHistory);
});

app.post("/calcHistory", (req, res) => {
  const newCalculation = req.body;

  calcHistory.push(newCalculation);

  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log(`Hey Anne, your server is listening on PORT: ${PORT}`);
});
