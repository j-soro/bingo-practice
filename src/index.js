import _ from "lodash";

const raffleNumbers = _.shuffle(_.range(1, 91));
const playerNumbers = _.shuffle(_.range(1, 91)).slice(0, 15);
const cpuNumbers = _.shuffle(_.range(1, 91)).slice(0, 15);

// Populate a cardboard (element) with data
function renderNumbers(element, numbers) {
  const renderContainer = document.querySelector(element);
  numbers.forEach(number => {
    const div = document.createElement("div");
    div.classList.add("number");
    div.classList.add("number-" + number);
    div.textContent = number;
    renderContainer.appendChild(div);
  });
}

const updateCardboard = (number) => {
  _.pull(playerNumbers, number);
  _.pull(cpuNumbers, number);

  if (playerNumbers.length === 0 || cpuNumbers.length === 0) {
    const ball = document.querySelector(".ball");
    ball.textContent = ":D";
  }
};

function nextTurn() {
  const number = raffleNumbers.pop();
  const ball = document.querySelector(".ball");
  ball.textContent = number;
  toggleCrossed(number);
  updateCardboard(number);
  console.log(playerNumbers, cpuNumbers);
}

const button = document.querySelector("button");
button.addEventListener("click", nextTurn);

function toggleCrossed(number) {
  const elements = document.querySelectorAll(".number-" + number);
  elements.forEach(element => element.classList.add("crossed"));
}

renderNumbers(".player", playerNumbers);
renderNumbers(".cpu", cpuNumbers);
