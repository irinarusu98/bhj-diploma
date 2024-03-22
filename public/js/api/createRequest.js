/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = ({ url, data, method = 'GET', callback }) => {
    const xhr = new XMLHttpRequest();

    // Открываем соединение
    xhr.open(method, method === 'GET' ? `${url}?${serialize(data)}` : url);

    // Устанавливаем тип ответа на JSON
    xhr.responseType = 'json';

    // Устанавливаем обработчик события загрузки
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Успешно получили ответ, вызываем колбэк с полученными данными
            callback(null, xhr.response);
        } else {
            // Ошибка при выполнении запроса, передаем ошибку в колбэк
            callback(new Error(`Request failed with status ${xhr.status}`), null);
        }
    };

    // Устанавливаем обработчик события ошибки
    xhr.onerror = () => {
        callback(new Error('Request failed'), null);
    };

    // Отправляем запрос на сервер
    if (method === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
};

// Функция для сериализации данных в строку запроса для GET запросов
const serialize = (obj) => {
    return Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
};

// Примеры использования функции createRequest:

// GET запрос без параметров
createRequest({
    url: 'https://example.com',
    callback: (err, response) => {
        if (err) {
            console.error(err);
        } else {
            console.log(response);
        }
    }
});

// POST запрос с передачей данных
createRequest({
    url: 'https://example.com',
    method: 'POST',
    data: {
        email: 'ivan@example.com',
        password: '123456'
    },
    callback: (err, response) => {
        if (err) {
            console.error(err);
        } else {
            console.log(response);
        }
    }
});
