$(document).ready(init);

let calcHistory = [];
let newCalculation = {};
let recentOperand = "+";

function init() {
  console.log("DOM is connected");
  $(".submit-equals-btn").on("click", clickAddCalc);
  $(".js-add").on("click", clickAdditionOperand);
  $(".js-subtract").on("click", clickSubtractionOperand);
  $(".js-divide").on("click", clickDivisionOperand);
  $(".js-multiply").on("click", clickMultiplicationOperand);

  getCalculations();
}

//calculator function
function calculateThis(newCalculation) {
  let firstNumber = parseFloat(newCalculation.firstNumber);
  let secondNumber = parseFloat(newCalculation.secondNumber);
  if (recentOperand === "+") {
    return firstNumber + secondNumber;
  }
  if (recentOperand === "-") {
    return firstNumber - secondNumber;
  }
  if (recentOperand === "*") {
    return firstNumber * secondNumber;
  }
  if (recentOperand === "/") {
    return firstNumber / secondNumber;
  }
}

//on click of = the below function submits the two input values (js-calc-input-one and js-calc-input-two) and stores them as values within newCalculation object
function clickAddCalc(event) {
  //save newCalculation to the server
  event.preventDefault();
  console.log("You clicked the = button");
  //update the newCalculation object
  const newCalculation = {
    //we have the form values and we still need operand and answer values
    firstNumber: $(".js-calc-input-one").val(),
    operand: recentOperand,
    secondNumber: $(".js-calc-input-two").val(),
    answer: calculateThis(newCalculation)
  };

  //save the newCalculation object to the server by passing it into the saveCalculation function
  saveCalculation(newCalculation);

  //clearing form fields
  $(".js-calc-input-one").val("");

  $(".js-calc-input-two").val("");
}

//functions that reassign the global variable recentOperand based on which button is clicked
function clickAdditionOperand(event) {
  event.preventDefault();
  recentOperand = "+";
  console.log(recentOperand);
}

function clickSubtractionOperand(event) {
  event.preventDefault();
  recentOperand = "-";
  console.log(recentOperand);
}

function clickMultiplicationOperand(event) {
  event.preventDefault();
  recentOperand = "*";
  console.log(recentOperand);
}

function clickDivisionOperand(event) {
  event.preventDefault();
  recentOperand = "/";
  console.log(recentOperand);
}

function getCalculations() {
  //AJAX request to server for calcHistory
  $.ajax({
    method: "GET",
    url: "/calcHistory"
  })
    .then(response => {
      render(response);
    })
    .catch(err => {
      console.log("error finding the old calculations");
    });
}

//AJAX save newCalculation to server
function saveCalculation(newCalculation) {
  $.ajax({
    method: "POST",
    url: "/calcHistory",
    data: newCalculation
  })
    .then(response => {
      console.log(response);
      getCalculations();
    })
    .catch(err => {
      console.log("error saving newCalculation");
    });
}

//render calcHistory to DOM

function render(calcHistory) {
  console.log("Render calcHistory");
  $(".div-calc-history").empty();
  for (let i = 0; i < calcHistory.length; i++) {
    const calculationObject = calcHistory[i];

    $(".div-calc-history").append(`
      <li>${calculationObject.firstNumber} ${calculationObject.operand} ${calculationObject.secondNumber} = ${calculationObject.answer} </li>
    `);
  }
}
