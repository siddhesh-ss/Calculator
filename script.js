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
    if(b == 0) return null;
    return a / b;
}

function operate(firstNumber, secondNumber, operator) {
    if(operator === '+') return add(Number(firstNumber), Number(secondNumber));
    else if(operator === '-') return subtract(Number(firstNumber), Number(secondNumber));
    else if(operator === '*') return multiply(Number(firstNumber), Number(secondNumber));
    else if(operator === '/') return divide(Number(firstNumber), Number(secondNumber));
}

const displayLimit = 12;

let display = document.getElementById("screenText");
let preview = document.getElementById("previewText");
const digits = document.querySelectorAll(".digit");
const signs = document.querySelectorAll(".operator");
const allClear = document.getElementById("allClear");
const clear = document.getElementById("clear");
const percent = document.getElementById("percent");

let firstNumber = "";
let secondNumber = "";
let operator = null;
let shouldResetDisplay = false;

function reset(msg) {
    display.textContent = `${msg}`;
    preview.textContent = "";
    firstNumber = "";
    secondNumber = "";
    operator = null;
    shouldResetDisplay = false;
}

function handleDigits(digit) {   //null operator then entering first number.
    let currentNumber = operator === null ? firstNumber : secondNumber;
    if(operator === null && shouldResetDisplay) {
        currentNumber = "";
        shouldResetDisplay = false;
    }
    if(currentNumber.length === displayLimit) return;
    if(digit === '.' && currentNumber.includes('.')) return;
    if(currentNumber === "0" && digit === '0') return;

    currentNumber += digit;
    display.textContent = currentNumber;

    if(operator === null) {
        firstNumber = currentNumber;
    } else {
        secondNumber = currentNumber;
    }
}

function handleOperator(sign) {
    if(firstNumber === "") return;
    if(secondNumber === "") {
        if(sign === '=') {
            shouldResetDisplay = true;
            preview.textContent = `${firstNumber} =`;
        } else {
            operator = sign;
            preview.textContent = `${firstNumber} ${operator}`;
        }
        return;
    }
    if(sign === '=') preview.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
    firstNumber = operate(firstNumber, secondNumber, operator);
    // if divide by 0!
    if(firstNumber === null) {
        reset("Cannot divide by zero");
        return;
    }

    if(sign === '=') {
        shouldResetDisplay = true;
        operator = null;
        secondNumber = "";
    } else {
        operator = sign;
        secondNumber = "";
    }

    let result = Number(firstNumber).toPrecision(10);
    if(result.includes('.')) {
        while(result.endsWith('0')) result = result.slice(0,-1);
        if(result.endsWith('.')) result = result.slice(0,-1);
    }
    display.textContent = result;
    if(sign !== '=') preview.textContent = `${result} ${operator}`;
}

function handleClear() {
    if(shouldResetDisplay) return;
    if(firstNumber === "") return;

    if(operator === null) {
        firstNumber = firstNumber.slice(0,-1);
        display.textContent = firstNumber;
    } else {
        if(secondNumber === "") return;
        secondNumber = secondNumber.slice(0,-1);
        display.textContent = secondNumber;
    }
}

function handlePercent() {
    if(operator === null) {
        if(firstNumber === "") return;
        firstNumber = String(Number(firstNumber)/100);
        display.textContent = firstNumber;
    } else {
        if(secondNumber === "") return;
        secondNumber = String(Number(secondNumber)/100);
        display.textContent = secondNumber;
    }
}

digits.forEach(digit => {
    digit.addEventListener("click" , (e) => handleDigits(e.target.id));
});

signs.forEach(sign => {
    sign.addEventListener("click" , (e) => handleOperator(e.target.id));
});

allClear.addEventListener("click" , () => reset(""));

clear.addEventListener("click", () => handleClear());

percent.addEventListener("click", () => handlePercent());

document.addEventListener("keydown" , (e) => {
    if("0123456789.".includes(e.key)) handleDigits(e.key);
    else if("+-/*=".includes(e.key)) handleOperator(e.key);
    else if(e.key === "%") handlePercent();
    else if(e.key === "Enter") handleOperator("=");
    else if(e.key === "Backspace") handleClear();
    else if(e.key === "Delete") reset("");
});