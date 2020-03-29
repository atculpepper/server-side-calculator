$(document).ready(init);

let calcHistory = [];
let newCalculation = {};

function init() {
  console.log("DOM is connected");
  $(".submit-equals-btn").on("click", submitInputForms);

  getCalculations();
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

function submitInputForms(event) {
  event.preventDefault();
  console.log("You clicked the = button");
}
