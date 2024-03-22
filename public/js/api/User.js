/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static URL = '/user';

  static setCurrent(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('currentUser');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    try {
      const response = awaitRequest.get(this.URL);
      this.setCurrent(response.user);
      callback(null, response.user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      callback(error, null);
    }
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    try {
      const response = awaitRequest.post(`${this.URL}/register`, data);
      if (response && response.user) {
        this.setCurrent(response.user);
      }
      callback(null, response);
    } catch (error) {
      console.error('Registration failed:', error);
      callback(error, null);
    }
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    try {
      awaitRequest.post(`${this.URL}/logout`); // Производит выход из приложения
      this.unsetCurrent();
      callback(null);
    } catch (error) {
      console.error('Logout failed:', error);
      callback(error);
    }
  }
}
