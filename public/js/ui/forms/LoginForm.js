/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (err, response) => {
      if (response && response.success) {
        App.setState('user-logged');
        const modal = this.element.closest('.modal');
        if (modal) {
          const modalInstance = Modal.getInstance(modal);
          if (modalInstance) {
            modalInstance.close();
          }
        }
        this.element.reset(); // Сброс формы после успешной авторизации
      }
    });
  }
}