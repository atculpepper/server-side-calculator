$(document).ready(init);

let calcHistory = [];
let newCalculation = {};

function init() {
  console.log("DOM is connected");
  $(".submit-equals-btn").on("click", clickAddCalc);
  $(".js-add").on("click", clickAdditionOperand);
  $(".js-subtract").on("click", clickSubtractionOperand);
  $(".js-divide").on("click", clickDivisionOperand);
  $(".js-multiply").on("click", clickMultiplicationOperand);

  getCalculations();
}

function clickAdditionOperand(event) {
  event.preventDefault();
  console.log("You clicked +");
  newCalculation.operand = $(".js-add").val();
}

function clickSubtractionOperand(event) {
  event.preventDefault();
  console.log("You clicked -");
  newCalculation.operand = $(".js-subtract").val();
}

function clickMultiplicationOperand(event) {
  event.preventDefault();
  console.log("You clicked *");
  newCalculation.operand = $(".js-multiply").val();
}

function clickDivisionOperand(event) {
  event.preventDefault();
  console.log("You clicked /");
  newCalculation.operand = $(".js-divide").val();
}

function clickAddCalc(event) {
  //save newCalculation to the server
  event.preventDefault();
  console.log("You clicked the = button");
  //   const newCalculation = {
  //     //we have the form values and we still need operand and answer values
  //     firstNumber: $(".js-calc-input-one").val,
  //     operand: "",
  //     secondNumber: $(".js-calc-input-two").val,
  //     answer: ""
  //   };
  //   saveCalculation(newCalculation);

  //   //clearing form fields
  //   $(".js-calc-input-one").val("");

  //   $(".js-calc-input-two").val("");
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
      console.log("error");
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
      console.log("response");
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
    const newCalculation = calcHistory[i];

    $(".div-calc-history").append(`
      <li>${newCalculation.firstNumber} ${newCalculation.operand} ${newCalculation.secondNumber} = ${newCalculation.answer}</li>
    `);
  }
}
