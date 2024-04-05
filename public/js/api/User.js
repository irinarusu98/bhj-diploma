// /**
//  * Класс User управляет авторизацией, выходом и
//  * регистрацией пользователя из приложения
//  * Имеет свойство URL, равное '/user'.
//  * */


// class User {
//   /**
//    * Устанавливает текущего пользователя в
//    * локальном хранилище.
//    * */
//   static URL = '/user';

//   static setCurrent(user) {
//     localStorage.setItem('currentUser', JSON.stringify(user));
//   }

//   /**
//    * Удаляет информацию об авторизованном
//    * пользователе из локального хранилища.
//    * */
//   static unsetCurrent() {
//     localStorage.removeItem('currentUser');
//   }

//   /**
//    * Возвращает текущего авторизованного пользователя
//    * из локального хранилища
//    * */
//   static current() {
//     return JSON.parse(localStorage.getItem('currentUser'));
//   }

//   /**
//    * Получает информацию о текущем
//    * авторизованном пользователе.
//    * */
//   static fetch(callback) {
//     createRequest({
//       url: this.URL,
//       callback: (err, response) => {
//         if (err) {
//           console.error('Failed to fetch user:', err);
//           callback(err, null);
//         } else {
//           this.setCurrent(response.user);
//           callback(null, response.user);
//         }
//       }
//     });
//   }

//   /**
//    * Производит попытку авторизации.
//    * После успешной авторизации необходимо
//    * сохранить пользователя через метод
//    * User.setCurrent.
//    * */
//   static login(data, callback) {
//     createRequest({
//       url: this.URL + '/login',
//       method: 'POST',
//       responseType: 'json',
//       data,
//       callback: (err, response) => {
//         if (response && response.user) {
//           this.setCurrent(response.user);
//         }
//         callback(err, response);
//       }
//     });
//   }

//   /**
//    * Производит попытку регистрации пользователя.
//    * После успешной авторизации необходимо
//    * сохранить пользователя через метод
//    * User.setCurrent.
//    * */
//   static register(data, callback) {
//     try {
//       const response = awaitRequest.post(`${this.URL}/register`, data);
//       if (response && response.user) {
//         this.setCurrent(response.user);
//       }
//       callback(null, response);
//     } catch (error) {
//       console.error('Registration failed:', error);
//       callback(error, null);
//     }
//   }

//   /**
//    * Производит выход из приложения. После успешного
//    * выхода необходимо вызвать метод User.unsetCurrent
//    * */
//   static logout(callback) {
//     try {
//       awaitRequest.post(`${this.URL}/logout`); // Производит выход из приложения
//       this.unsetCurrent();
//       callback(null);
//     } catch (error) {
//       console.error('Logout failed:', error);
//       callback(error);
//     }
//   }
// }


class User {
  static URL = 'http://192.168.135.234:8000//user';

  static setCurrent(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  static unsetCurrent() {
    localStorage.removeItem('currentUser');
  }

  static current() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  //  инф. о текущем авторизованном пользов.
  static fetch(callback) {
    createRequest({
      url: this.URL + '/current',
      callback: (err, response) => {
        if (err) {
          console.error('Failed to fetch user:', err);
          callback(err, null);
        } else {
          this.setCurrent(response.user);
          callback(null, response.user);
        }
      }
    });
  }

  //  авторизация
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  // регистрация пользователя
  static register(data, callback) {
    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  static logout(callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      callback: (err, response) => {
        if (!err && response && response.success) { // Проверяем успешный ответ
          this.unsetCurrent(); // Вызываем метод unsetCurrent
        }
        callback(err, response);
      }
    });
  }
}


