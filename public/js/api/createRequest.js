// /**
//  * Основная функция для совершения запросов на сервер.
//  * */
// newFunction();
// function newFunction() {
//     const createRequest = ({ url, data, method = 'GET', callback }) => {
//         const xhr = new XMLHttpRequest();

//         // Открываем соединение
//         xhr.open(method, method === 'GET' ? `${url}?${serialize(data)}` : url);

//         // Устанавливаем тип ответа на JSON
//         xhr.responseType = 'json';

//         // Устанавливаем обработчик события загрузки
//         xhr.onload = () => {
//             if (xhr.status >= 200 && xhr.status < 300) {
//                 // Успешно получили ответ, вызываем колбэк с полученными данными
//                 callback(null, xhr.response);
//             } else {
//                 // Ошибка при выполнении запроса, передаем ошибку в колбэк
//                 callback(new Error(`Request failed with status ${xhr.status}`), null);
//             }
//         };

//         // Устанавливаем обработчик события ошибки
//         xhr.onerror = () => {
//             callback(new Error('Request failed'), null);
//         };

//         // Отправляем запрос на сервер
//         if (method === 'POST') {
//             xhr.setRequestHeader('Content-Type', 'application/json');
//             xhr.send(JSON.stringify(data));
//         } else {
//             xhr.send();
//         }
//     };

//     // Функция для сериализации данных в строку запроса для GET запросов
//     const serialize = (obj) => {
//         return Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
//     };

//      // POST запрос с передачей данных
//      createRequest({
//         url: 'http://192.168.135.234/user/current', // Указываем URL для получения текущего пользователя
//         callback: (err, response) => {
//             if (err) {
//                 console.error(err);
//             } else {
//                 console.log(response);
//             }
//         }
//     });


const createRequest = ({ url, data, method = 'GET', callback }) => {
    const xhr = new XMLHttpRequest(); // Создание нового объекта XMLHttpRequest
    const formData = new FormData(); // Создание объекта FormData для отправки данных в формате multipart/form-data

    if (method === "GET") {
        url += "?"; // Добавляем в URL знак вопроса для начала строки запроса
        for (let key in data) {
            url += `${key}=${data[key]}&`; // Добавляем параметры запроса к URL
        }
    } else {
        for (let key in data) {
            formData.append(key, data[key]); // Добавляем данные в объект FormData
        }
    }

    // Отправка запроса на сервер
    try {
        xhr.open(method, url);
    } catch (e) {
        callback(e); // Обрабатываем ошибку при отправке запроса
    }

    xhr.addEventListener("readystatechange", () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            callback(null, JSON.parse(xhr.response));
        }
    });
};


