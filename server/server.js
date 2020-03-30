const express = require("express");
const bodyParser = require("body-parser");
let calcHistory = [
  {
    firstNumber: "8",
    operation: "*",
    secondNumber: "4",
    answer: "32"
  },
  {
    firstNumber: "1",
    operation: "+",
    secondNumber: "1",
    answer: "2"
  }
];
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("server/public"));

app.get("/calculation", (req, res) => {
  res.send(calcHistory);
  console.log(calcHistory);
});

app.post("/calculation", (req, res) => {
  //this post route is using the data received and returning it cleaned up, converted from strings into numbers
  const newCalculation = {
    firstNumber: parseFloat(req.body.firstNumber),
    operation: req.body.recentOperation,
    secondNumber: parseFloat(req.body.secondNumber)
  };
  //calculate answer within the server side post

  if (newCalculation.recentOperation === "add") {
    newCalculation.answer = firstNumber + secondNumber;
  } else if (newCalculation.recentOperation === "subtract") {
    newCalculation.answer = firstNumber - secondNumber;
  } else if (newCalculation.recentOperation === "multiply") {
    newCalculation.answer = firstNumber * secondNumber;
  } else if (newCalculation.recentOperation === "divide") {
    newCalculation.answer = firstNumber / secondNumber;
  }
  console.log(newCalculation);

  console.log(newCalculation);
  res.send(200);

  calcHistory.push(newCalculation);

  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log(`Hey Anne, your server is listening on PORT: ${PORT}`);
});
