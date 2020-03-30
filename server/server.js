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
  //this post route is using the data received and returning it cleaned up, converted from strings into numbers
  const newCalculation = {
    firstNumber: parseFloat(req.body.firstNumber),
    operation: req.body.recentOperation,
    secondNumber: parseFloat(req.body.secondNumber)
  };
  //calculate answer within the server side post

  if (newCalculation.recentOperation === "add") {
    newCalculation.answer = firstNumber + secondNumber;
  }
  else if (newCalculation.recentOperation === "subtract") {
    newCalculation.answer = firstNumber - secondNumber;
  }
  else if (newCalculation.recentOperation === "multiply") {
    newCalculation.answer = firstNumber * secondNumber;
  }
  else if (newCalculation.recentOperation === "divide") {
    newCalculation.answer = firstNumber / secondNumber;
  }
  console.log(newCalculation);

}


  console.log(newCalculation);
  res.send(200);

  calcHistory.push(newCalculation);

  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log(`Hey Anne, your server is listening on PORT: ${PORT}`);
});
