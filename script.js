const digits = document.querySelectorAll(".digit");
const signs = document.querySelectorAll(".operator");
let scree = document.getElementById("screenText");

let firstNumber = 0;
let secondNumber = 0;
let operator;
let isOperated = false;
let isDecimal = false;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if(b == 0) {
        alert("Can't divide by zero!");
        return NaN;
    }
    return a / b;
}

function operate(firstNumber, secondNumber, operator) {
    if(operator == '+') return add(firstNumber, secondNumber);
    else if(operator == '-') return subtract(firstNumber, secondNumber);
    else if(operator == '*') return multiply(firstNumber, secondNumber);
    else if(operator == '/') return divide(firstNumber, secondNumber);
}

digits.forEach(digit => {
    digit.addEventListener("click", (e) => {
        if(!isOperated) {
            firstNumber = firstNumber*10 + Number(e.target.id);
            scree.textContent = firstNumber;
        }
        else {
            secondNumber = secondNumber*10 + Number(e.target.id);
            scree.textContent = secondNumber;
        }
    });
});

signs.forEach(sign => {
    sign.addEventListener("click", (e) => {
        if(isOperated) {
            scree.textContent = operate(firstNumber, secondNumber, operator);
        }
        else {
            operator = `${e.target.id}`;
            isOperated = true;
        }
    });
});
