let a = 1.2;
let b = 1.2;
let currentOperator = "";
let total = 1.2;
const screenText = document.querySelector('.screenText');
const calculation = document.querySelector('.calculation');

function checkForEntry(){
    if (((screenText.textContent !== "") && (calculation.textContent !== "") && !(screenText.textContent.includes("+") || (screenText.textContent.includes("-") && parseFloat(screenText.textContent) > 0) || screenText.textContent.includes("*") || screenText.textContent.includes("/")))) {
        screenText.textContent = ""
    }
}

function one(){
    checkForEntry();
    screenText.textContent = screenText.textContent + "1";
}

function two(){
    checkForEntry();
    screenText.textContent = screenText.textContent + "2";
}

function three(){
    checkForEntry();
    screenText.textContent = screenText.textContent + "3";
}

function four() {
    checkForEntry();
    screenText.textContent = screenText.textContent + "4";
}

function five() {
    checkForEntry();
    screenText.textContent = screenText.textContent + "5";
}

function six() {
    checkForEntry();
    screenText.textContent = screenText.textContent + "6";
}

function seven() {
    checkForEntry();
    screenText.textContent = screenText.textContent + "7";
}

function eight() {
    checkForEntry();
    screenText.textContent = screenText.textContent + "8";
}

function nine() {
    checkForEntry();
    screenText.textContent = screenText.textContent + "9";
}

function zero() {
    checkForEntry();
    screenText.textContent = screenText.textContent + "0";
}

function comma() {
    checkForEntry();
    screenText.textContent = screenText.textContent + ".";
}

function checkForOperator(){
    if (screenText.textContent.includes("+") || (screenText.textContent.includes("-") && parseFloat(screenText.textContent) > 0) || screenText.textContent.includes("*") || screenText.textContent.includes("/")) {
        calculate()
        calculation.textContent = a + currentOperator + b
        currentOperator = ""
    }
}

function plus(){
    checkForOperator();
    a = screenText.textContent;
    screenText.textContent = screenText.textContent + "+"
    currentOperator = "+"
}

function minus(){
    checkForOperator();
    a = screenText.textContent;
    screenText.textContent = screenText.textContent + "-"
    currentOperator = "-"
}

function multiply(){
    checkForOperator();
    a = screenText.textContent;
    screenText.textContent = screenText.textContent + "*"
    currentOperator = "*"
}

function equal(){
    calculation.textContent = screenText.textContent
    calculate()
}

function divide(){
    checkForOperator();
    a = screenText.textContent;
    screenText.textContent = screenText.textContent + "/"
    currentOperator = "/"
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
    } else if (currentOperator === "-") {
        b = screenText.textContent.slice(screenText.textContent.indexOf("-") + 1);
        a = parseFloat(a)
        b = parseFloat(b)
        total = a - b;
    } else if (currentOperator === "*") {
        b = screenText.textContent.slice(screenText.textContent.indexOf("*") + 1);
        a = parseFloat(a)
        b = parseFloat(b)
        total = a * b;
    } else if (currentOperator === "/") {
        b = screenText.textContent.slice(screenText.textContent.indexOf("/") + 1);
        a = parseFloat(a)
        b = parseFloat(b)
        total = a / b;
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