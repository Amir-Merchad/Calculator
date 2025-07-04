let a = 1.2;
let b = 1.2;
let currentOperator = "";
let total = 1.2;
const screenText = document.querySelector('.screenText');
const calculation = document.querySelector('.calculation');

function one(){
    screenText.textContent = screenText.textContent + "1";
}

function two(){
    screenText.textContent = screenText.textContent + "2";
}

function three(){
    screenText.textContent = screenText.textContent + "3";
}

function four() {
    screenText.textContent = screenText.textContent + "4";
}

function five() {
    screenText.textContent = screenText.textContent + "5";
}

function six() {
    screenText.textContent = screenText.textContent + "6";
}

function seven() {
    screenText.textContent = screenText.textContent + "7";
}

function eight() {
    screenText.textContent = screenText.textContent + "8";
}

function nine() {
    screenText.textContent = screenText.textContent + "9";
}

function zero() {
    screenText.textContent = screenText.textContent + "0";
}

function comma() {
    screenText.textContent = screenText.textContent + ".";
}

function plus(){
    if (screenText.textContent.includes("+") || screenText.textContent.includes("-") || screenText.textContent.includes("*") || screenText.textContent.includes("/")) {
        calculate()
    } else {
        a = screenText.textContent;
        screenText.textContent = screenText.textContent + "+"
        currentOperator = "+"
    }
}

function minus(){
    if (screenText.textContent.includes("+") || screenText.textContent.includes("-") || screenText.textContent.includes("*") || screenText.textContent.includes("/")) {
        calculate()
    } else {
        a = screenText.textContent;
        screenText.textContent = screenText.textContent + "-"
        currentOperator = "-"
    }
}

function multiply(){
    if (screenText.textContent.includes("+") || screenText.textContent.includes("-") || screenText.textContent.includes("*") || screenText.textContent.includes("/")) {
        calculate()
    } else {
        a = screenText.textContent;
        screenText.textContent = screenText.textContent + "*"
        currentOperator = "*"
    }
}

function divide(){
    if (screenText.textContent.includes("+") || screenText.textContent.includes("-") || screenText.textContent.includes("*") || screenText.textContent.includes("/")) {
        calculate()
    } else {
        a = screenText.textContent;
        screenText.textContent = screenText.textContent + "/"
        currentOperator = "/"
    }
}

function Backspace() {
    screenText.textContent = screenText.textContent.slice(0, -1);
}

function reset(){
    a = 0
    b = 0
    calculation.textContent = ""
    screenText.textContent = ""
}

function cleanNumber(value) {
    const num = parseFloat(value);
    return Number.isInteger(num) ? num : parseFloat(num.toFixed(2));
}

function calculate(){
    if (currentOperator === "+") {
        b = screenText.textContent.slice(screenText.textContent.indexOf("+") + 1);
        a = parseFloat(a)
        b = parseFloat(b)
        total = a + b;
        calculation.textContent = screenText.textContent;
    } else if (currentOperator === "-") {
        b = screenText.textContent.slice(screenText.textContent.indexOf("-") + 1);
        a = parseFloat(a)
        b = parseFloat(b)
        total = a - b;
        calculation.textContent = screenText.textContent;
    } else if (currentOperator === "*") {
        b = screenText.textContent.slice(screenText.textContent.indexOf("*") + 1);
        a = parseFloat(a)
        b = parseFloat(b)
        total = a * b;
        calculation.textContent = screenText.textContent;
    } else if (currentOperator === "/") {
        b = screenText.textContent.slice(screenText.textContent.indexOf("/") + 1);
        a = parseFloat(a)
        b = parseFloat(b)
        total = a / b;
        calculation.textContent = screenText.textContent;
    }
    total = cleanNumber(total);
    screenText.textContent = total;
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
        darkButton.style.background = "rgba(255, 255, 255, 0.5)"
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTheme('light');
});

window.onload = () => {
    const body = document.body;
    body.classList.add('body-light');
    document.querySelector('.header').classList.add('header-light');
    document.querySelector('.footer').classList.add('footer-light');
    document.querySelector('.box').classList.add('box-light');
    document.querySelector('.screen').classList.add('screen-light');
};