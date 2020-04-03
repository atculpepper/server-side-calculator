const express = require("express"); //requiring in the express dependency
const bodyParser = require("body-parser"); //requiring in the body-parser dependency
let calcHistory = [
  //creating an array with calculation history, newCalculation objects will be pushed into this array
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

app.use(express.static("server/public")); //requiring in the static files in the server folder

app.get("/calculation", (req, res) => {
  res.send(calcHistory);
  console.log(calcHistory);
});

app.post("/calculation", (req, res) => {
  //this post route is using the data received and returning it cleaned up, converted from strings into numbers
  const newCalculation = {
    firstNumber: parseFloat(req.body.firstNumber),
    operation: req.body.operation,
    secondNumber: parseFloat(req.body.secondNumber)
  };
  //calculate answer within the server side post

  if (newCalculation.operation === "add") {
    newCalculation.answer = firstNumber + secondNumber;
  } else if (newCalculation.operation === "subtract") {
    newCalculation.answer = firstNumber - secondNumber;
  } else if (newCalculation.operation === "multiply") {
    newCalculation.answer = firstNumber * secondNumber;
  } else if (newCalculation.operation === "divide") {
    newCalculation.answer = firstNumber / secondNumber;
  }
  console.log(newCalculation);

  console.log(newCalculation);

  calcHistory.push(newCalculation);
  //only need one res.sendStatus, and it should be at the very end
  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log(`Hey Anne, your server is listening on PORT: ${PORT}`);
});
