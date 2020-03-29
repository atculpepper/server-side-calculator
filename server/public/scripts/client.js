$(document).ready(init);

let calcHistory = [];
let newCalculation = {};

function init() {
  console.log("DOM is connected");
  $(".submit-equals-btn").on("click", submitInputForms);
}

function submitInputForms() {
  console.log("You clicked the = button");
}
