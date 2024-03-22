/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (err, response) => {
      if (response && response.success) {
        App.setState('user-logged');
        const modal = this.element.closest('.modal');
        if (modal) {
          const modalInstance = Modal.getInstance(modal);
          if (modalInstance) {
            modalInstance.close();
          }
        }
        this.element.reset(); // Сброс формы после успешной регистрации
      }
    });
  }
}