let clicks = 0;
const maxClicks = 1000;
let clickValue = 1;
let upgradeCost = 10;
let upgradeCostCoef = 1.1

function updatePelmenyaSize() {
    const screenSizeRatio = window.innerWidth / window.innerHeight;
    const sizeReductionFactor = screenSizeRatio > 1 ? 0.75 : 1;
    const sizeVw = (20 + (clicks / maxClicks) * 30) * sizeReductionFactor; 
    document.getElementById('pelmenya').style.width = `${sizeVw}vw`;
}

function updateUI() {
    document.getElementById('counter').innerText = `${Math.floor(clicks)}/${maxClicks}💲`;
    document.getElementById('current-price').innerText = `Прибыль клика - ${Math.floor(clickValue)}💲/клик`;
    document.getElementById('upgrade-cost').innerText = `Стоимость улучшения - ${Math.floor(upgradeCost)}💲`;
    updatePelmenyaSize();
}

let level = 1;

function checkLevelUp() {
    if (clicks >= maxClicks) {
        clicks = 0;
        const sound = document.getElementById('win-sound');
        sound.play();

        const fadeScreen = document.getElementById('fade-screen');
        fadeScreen.classList.add('show');

        setTimeout(() => {
            level += 1; 
            upgradeCost = 10; 
            clickValue = 1;
            upgradeCostCoef *= 1.3
            document.getElementById('level-badge').innerText = `Уровень ${level}`;
            updateUI();

            fadeScreen.classList.remove('show');
        }, 500);
    }
}

function clickPelmenya() {
    if (clicks <= maxClicks) {
        clicks += clickValue; 
        if (clicks > maxClicks) clicks = maxClicks;
        checkLevelUp();
        updateUI();
    }
    
}

function upgrade() {
    if (clicks >= upgradeCost) {
        clicks -= upgradeCost; 
        clickValue += 1.5; 
        upgradeCost *= upgradeCostCoef;
        const sound = document.getElementById('buy-sound');
        sound.play();
        updateUI();
    }
}



document.getElementById('info-btn').addEventListener('click', function() {
    document.getElementById('info-modal').classList.add('show');
});

window.onclick = function(event) {
    let modal = document.getElementById('info-modal');
    if (event.target == modal) {
        modal.classList.remove('show');
    }
}

function showSplashArt(event) {
    let splashArt = document.createElement('div');
    splashArt.className = 'splash-art';
    splashArt.style.position = 'absolute';
    splashArt.style.left = `${event.pageX}px`;
    splashArt.style.top = `${event.pageY}px`;
    document.body.appendChild(splashArt);

    setTimeout(() => {
        document.body.removeChild(splashArt);
    }, 500);
}

document.addEventListener('DOMContentLoaded', function() {
    const greetingText = document.getElementById('greeting-text');
    const instructionText = document.getElementById('instruction-text');
    const loadingScreen = document.getElementById('loading-screen');

    setTimeout(() => {
        greetingText.classList.add('visible');
    }, 500);

    setTimeout(() => {
        greetingText.classList.remove('visible');
    }, 2500);

    setTimeout(() => {
        instructionText.classList.add('visible');
    }, 3000);

    setTimeout(() => {
        instructionText.classList.remove('visible');
    }, 5500);

    setTimeout(() => {
        loadingScreen.style.opacity = 0;
        loadingScreen.addEventListener('transitionend', () => loadingScreen.remove());
    }, 6000); 

});

document.getElementById('pelmenya').addEventListener('click', showSplashArt);
document.getElementById('pelmenya').addEventListener('click', clickPelmenya);
document.getElementById('upgrade-btn').addEventListener('click', upgrade);
updateUI();