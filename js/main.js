const dir = '../assets/img/portfolio';

subdir = ['3dm', 'ml', 'rb', 'td'];

portfolio = document.querySelector('.wrapper');

subdir.forEach(element => {
    let divEl = document.createElement('div');
    divEl.id = element;
    portfolio.appendChild(divEl);
});