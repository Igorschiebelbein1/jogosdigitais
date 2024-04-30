const foxy = document.querySelector('.foxy');
const pizza = document.querySelector('.pizza');

const jump = () => {
    foxy.classList.add('jump');

    setTimeout(() => {

        foxy.classList.remove('jump');

    }, 500);
}

const loop = setInterval(() => {

    const pizzaPosition = pizza.offsetLeft;
    const foxyPosition = +window.getComputedStyle(foxy).bottom.replace('px', '');

    if (pizzaPosition <= 120 && pizzaPosition > 0 && foxyPosition < 80) {

        pizza.style.animation = 'none';
        pizza.style.left = `${pizzaPosition}px`;

        foxy.style.animation = 'none';
        foxy.style.bottom = `${foxyPosition}px`;

        foxy.src = 'kid.png';
        foxy.style.width = '150px';
        foxy.style.marginLeft = '50px';

        clearInterval(loop);
    }

}, 10);

document.addEventListener('keydown', jump);
