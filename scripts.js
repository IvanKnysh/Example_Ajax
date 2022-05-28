'use strict'

const sendForm = () => {
    const form = document.querySelector('form');
    const user = form.querySelector('[name=user]');
    const email = form.querySelector('[name=email]');
    const message = document.querySelector('.message');

    const messages = {
        'success': 'Данные успешно отправлены',
        'warning': 'Данные отправляются',
        'error': 'Ошибка отправки данных'
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
            message.classList.add('warning');
            message.textContent = messages.warning;

            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                message.classList.remove('warning');
                message.classList.add('success');
                message.textContent = messages.success;
            } else {
                message.classList.remove('warning');
                message.classList.add('error');
                message.textContent = messages.error;
            }
        });
        request.open('POST', './send.php');
        request.setRequestHeader('Content-type', 'application/json');

        const data = {};
        data.user = user.value;
        data.email = email.value;

        const body = JSON.stringify(data);

        request.send(body);
    });
}

sendForm();