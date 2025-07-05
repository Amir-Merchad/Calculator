let a = 0;
let b = 0;
let currentOperator = "";
let total = 0;
const screenText = document.querySelector('.screenText');
const calculation = document.querySelector('.calculation');

function checkForEntry(){
    if (screenText.textContent !== "" &&
        calculation.textContent !== "" &&
        !["+", "-", "*", "/"].some(op => screenText.textContent.includes(op))) {
        screenText.textContent = "";
        calculation.textContent = "";
        currentOperator = "";
    }
}

function appendToScreen(value){
    checkForEntry();
    screenText.textContent += value;
}

function comma(){
    checkForEntry();
    const lastOpIndex = Math.max(
        screenText.textContent.lastIndexOf("+"),
        screenText.textContent.lastIndexOf("-"),
        screenText.textContent.lastIndexOf("*"),
        screenText.textContent.lastIndexOf("/")
    );
    const currentNumber = screenText.textContent.slice(lastOpIndex + 1);
    if (!currentNumber.includes(".")) {
        screenText.textContent += ".";
    }
}

function handleOperator(op) {
    const content = screenText.textContent;

    if (op === "-" && content === "") {
        screenText.textContent = "-";
        return;
    }

    if (currentOperator && content.endsWith(currentOperator)) {
        if (op === "-" && !content.endsWith("--")) {
            screenText.textContent += "-";
            return;
        } else {
            showError("Invalid operator sequence");
            return;
        }
    }

    if (["+", "*", "/"].some(o => content.includes(o)) && currentOperator) {
        showError("Only one operator allowed");
        return;
    }

    if (content === "-" || content === "") {
        showError("Enter a number first");
        return;
    }

    a = parseFloat(content);
    screenText.textContent += op;
    currentOperator = op;
}

function equal() {
    const content = screenText.textContent;

    if (!["+", "*", "/"].some(op => content.includes(op)) &&
        (content.indexOf("-") <= 0 || content.lastIndexOf("-") === 0)) {
        const result = cleanNumber(parseFloat(content));
        screenText.textContent = result;
        calculation.textContent = content + "=" + result;
        a = result;
        currentOperator = "";
        return;
    }

    const operators = ["+", "-", "*", "/"];
    let operatorIndex = -1;

    for (let i = 1; i < content.length; i++) {
        if (operators.includes(content[i])) {
            operatorIndex = i;
            break;
        }
    }

    if (operatorIndex <= 0 || operatorIndex === content.length - 1) {
        if (operators.some(op => content.includes(op))) {
            showError("Incomplete or invalid expression");
        }
        return;
    }

    currentOperator = content[operatorIndex];
    a = parseFloat(content.slice(0, operatorIndex));
    b = parseFloat(content.slice(operatorIndex + 1));

    if (isNaN(a) || isNaN(b)) {
        showError("Invalid calculation");
        return;
    }

    calculation.textContent = a + currentOperator + b + "=";
    calculate();
}

function Backspace() {
    const lastChar = screenText.textContent.slice(-1);
    screenText.textContent = screenText.textContent.slice(0, -1);

    if (["+", "-", "*", "/"].includes(lastChar)) {
        currentOperator = "";
    }

    if (screenText.textContent === "") {
        a = 0;
        b = 0;
        currentOperator = "";
    }
}

function reset(){
    a = 0;
    b = 0;
    calculation.textContent = "";
    screenText.textContent = "";
    currentOperator = "";
}

function cleanNumber(value) {
    const num = parseFloat(value);
    return Number.isInteger(num) ? num : +num.toFixed(4);
}

function calculate(){
    if (screenText.textContent.endsWith(currentOperator)) {
        showError("Incomplete expression");
        return;
    }

    switch (currentOperator) {
        case "+":
            total = a + b;
            break;
        case "-":
            total = a - b;
            break;
        case "*":
            total = a * b;
            break;
        case "/":
            if (b === 0) {
                showError("Cannot divide by zero");
                reset();
                return;
            }
            total = a / b;
            break;
        default:
            showError("Unknown operator");
            return;
    }

    total = cleanNumber(total);
    screenText.textContent = total;
    calculation.textContent += total;
    a = total;
    currentOperator = "";
}

function showError(message) {
    const popup = document.getElementById('errorPopup');
    const msg = document.getElementById('errorMessage');
    msg.textContent = message;
    popup.classList.add('show');

    setTimeout(() => {
        closeError();
    }, 5000);
}

function closeError() {
    const popup = document.getElementById('errorPopup');
    popup.classList.remove('show');
}

function setTheme(mode) {
    const header = document.querySelector('.header');
    const box = document.querySelector('.box');
    const footer = document.querySelector('.footer');
    const body = document.querySelector('.body');
    const lightButton = document.querySelector('.lightMode');
    const darkButton = document.querySelector('.darkMode');
    const screen = document.querySelector('.screen');

    header.classList.remove('header-light', 'header-dark');
    box.classList.remove('box-light', 'box-dark');
    footer.classList.remove('footer-light', 'footer-dark');
    body.classList.remove('body-light', 'body-dark');
    screen.classList.remove('screen-light', 'screen-dark');

    header.classList.add(`header-${mode}`);
    box.classList.add(`box-${mode}`);
    footer.classList.add(`footer-${mode}`);
    body.classList.add(`body-${mode}`);
    screen.classList.add(`screen-${mode}`);

    if (mode === 'light') {
        lightButton.style.background = "rgba(255, 255, 255, 0.5)";
        darkButton.style.background = "rgba(255, 255, 255, 0.1)";
    }
    if (mode === 'dark') {
        lightButton.style.background = "rgba(255, 255, 255, 0.1)";
        darkButton.style.background = "rgba(255, 255, 255, 0.5)";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTheme('light');
});

document.querySelectorAll('.calc-button').forEach(btn => {
    const animate = () => {
        btn.blur();
        btn.classList.remove('animate');
        void btn.offsetWidth;
        btn.classList.add('animate');
        setTimeout(() => btn.classList.remove('animate'), 100);
    };

    btn.addEventListener('mousedown', animate);
    btn.addEventListener('touchstart', animate);
});

window.onload = () => {
    const body = document.body;
    body.classList.add('body-light');
    document.querySelector('.header').classList.add('header-light');
    document.querySelector('.footer').classList.add('footer-light');
    document.querySelector('.box').classList.add('box-light');
    document.querySelector('.screen').classList.add('screen-light');
};

document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (
        !isNaN(key) || key === "." || key === "," ||
        ["+", "-", "*", "/", "Enter", "=", "Backspace", "Escape"].includes(key)
    ) {
        e.preventDefault();
    }

    if (!isNaN(key)) appendToScreen(key);
    if (key === "." || key === ",") comma();
    if (["+", "-", "*", "/"].includes(key)) handleOperator(key);
    if (key === "Enter" || key === "=") equal();
    if (key === "Backspace") Backspace();
    if (key === "Escape") reset();
});
