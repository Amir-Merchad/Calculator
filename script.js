let a = 0;
let b = 0;
let currentOperator = "";
let total = 0;
const screenText = document.querySelector('.screenText');
const calculation = document.querySelector('.calculation');

function checkForEntry() {
    if (screenText.textContent !== "" &&
        calculation.textContent !== "" &&
        !["+", "-", "*", "/"].some(op => screenText.textContent.includes(op))) {
        screenText.textContent = "";
        calculation.textContent = "";
        currentOperator = "";
    }
}

function appendToScreen(value) {
    checkForEntry();
    screenText.textContent += value;
}

function comma() {
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

    if (["+", "*", "/"].some(o => content.includes(o)) && currentOperator && op !== "-") {
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

    if (content === "") {
        showError("Nothing to calculate");
        return;
    }

    if (!["+", "*", "/"].some(op => content.includes(op)) &&
        (content.indexOf("-") === -1 ||
            (content.indexOf("-") === 0 && content.lastIndexOf("-") === 0))) {
        const result = cleanNumber(parseFloat(content));
        screenText.textContent = result;
        calculation.textContent = content + "=" + result;
        a = result;
        currentOperator = "";
        return;
    }

    const operators = ["+", "-", "*", "/"];
    let operatorIndex = -1;

    let startIndex = 0;
    if (content[0] === '-') startIndex = 1;

    for (let i = startIndex; i < content.length; i++) {
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

    // Fixed: Simply take the rest of the string for b
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

function reset() {
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

function calculate() {
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

    if (!isNaN(key)) {
        appendToScreen(key);
        animateKeyButton(key);
    }

    if (key === "." || key === ",") {
        comma();
        animateKeyButton(key);
    }

    if (["+", "-", "*", "/"].includes(key)) {
        handleOperator(key);
        animateKeyButton(key);
    }

    if (key === "Enter" || key === "=") {
        equal();
        animateKeyButton(key);
    }

    if (key === "Backspace") {
        Backspace();
        animateKeyButton(key);
    }

    if (key === "Escape") {
        reset();
        animateKeyButton(key);
    }
});

function animateKeyButton(key) {
    const normalizedKey = key.toLowerCase(); // Fix: Normalize all keys

    const keyClassMap = {
        "0": "zero",
        "1": "num-1",
        "2": "num-2",
        "3": "num-3",
        "4": "num-4",
        "5": "num-5",
        "6": "num-6",
        "7": "num-7",
        "8": "num-8",
        "9": "num-9",
        "+": "add",
        "-": "subs",
        "*": "mult",
        "/": "div",
        "=": "equal",
        "enter": "equal",
        "backspace": "delete",
        "escape": "reset",
        ".": "comma",
        ",": "comma"
    };

    const className = keyClassMap[normalizedKey];
    if (!className) return;

    const btn = document.querySelector(`.calc-button.${className}`);
    if (btn) {
        btn.classList.remove("animate");
        void btn.offsetWidth;
        btn.classList.add("animate");
        setTimeout(() => btn.classList.remove("animate"), 100);
    }
}