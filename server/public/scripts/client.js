$(document).ready(init);

let calcHistory = [];
let newCalculation = {};
let recentOperation = "";

function init() {
  console.log("DOM is connected");
  $(".submit-equals-btn").on("click", clickAddCalc);
  $(".js-add").on("click", clickAdditionOperation);
  $(".js-subtract").on("click", clickSubtractionOperation);
  $(".js-divide").on("click", clickDivisionOperation);
  $(".js-multiply").on("click", clickMultiplicationOperation);

  getCalculations();
}

//on click of = the below function submits the two input values (js-calc-input-one and js-calc-input-two) and stores them as values within newCalculation object
function clickAddCalc(event) {
  //need to save this newCalculation to the server
  event.preventDefault();
  console.log("You clicked the = button");
  //update the newCalculation object
  const newCalculation = {
    //we have the form values and we still need operation and answer values
    firstNumber: $(".js-calc-input-one").val(),
    operation: recentOperation,
    secondNumber: $(".js-calc-input-two").val()
    //answer: calculateThis() --> I might want calculations to happen server side after the data on the object is passed over to the server
  };

  //save the newCalculation object to the server by passing it into the saveCalculation function
  saveCalculation(newCalculation);

  //clearing form fields
  $(".js-calc-input-one").val("");

  $(".js-calc-input-two").val("");
}

//AJAX save newCalculation to server
function saveCalculation(newCalculation) {
  $.ajax({
    method: "POST",
    url: "/calculation",
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

function getCalculations() {
  //AJAX request to server for calcHistory
  $.ajax({
    method: "GET",
    url: "/calculation"
  })
    .then(response => {
      render(response);
    })
    .catch(err => {
      console.log("error finding the old calculations");
    });
}

//functions that reassign the global variable recentOperation based on which button is clicked
function clickAdditionOperation(event) {
  event.preventDefault();
  recentOperation = "add";
  console.log(recentOperation);
}

function clickSubtractionOperation(event) {
  event.preventDefault();
  recentOperation = "subtract";
  console.log(recentOperation);
}

function clickMultiplicationOperation(event) {
  event.preventDefault();
  recentOperation = "multiply";
  console.log(recentOperation);
}

function clickDivisionOperation(event) {
  event.preventDefault();
  recentOperation = "divide";
  console.log(recentOperation);
}

//render calcHistory to DOM

function render(calcHistory) {
  console.log("Render calcHistory");
  $(".div-calc-history").empty();
  for (let i = 0; i < calcHistory.length; i++) {
    const calculationObject = calcHistory[i];

    $(".div-calc-history").append(`
      <li>${calculationObject.firstNumber} ${calculationObject.operation} ${calculationObject.secondNumber} = ${calculationObject.answer} </li>
    `);
  }
}
