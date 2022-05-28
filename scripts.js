'use strict'

const select = document.querySelector('#cars');
const output = document.querySelector('.output');

select.addEventListener('change', () => {
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) {
            const data = JSON.parse(request.responseText);

            data.cars.forEach(item => {
                if (item.brand === select.value) {
                    output.innerHTML = 'Model: ' + item.model + '<br> Price: ' + item.price;
                }
            })
        }
    });

    request.open('GET', './cars.json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();
});