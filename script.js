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