/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    sidebarToggle.addEventListener('click', () => {
      document.body.classList.toggle('sidebar-open');
      document.body.classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const loginButton = document.querySelector('.login-button');
    const registerButton = document.querySelector('.register-button');
    const logoutButton = document.querySelector('.logout-button');

    loginButton.addEventListener('click', () => {
      const loginModal = App.getModal('login');
      loginModal.open();
    });

    registerButton.addEventListener('click', () => {
      const registerModal = App.getModal('register');
      registerModal.open();
    });

    logoutButton.addEventListener('click', () => {
      User.logout((err, response) => {
        if (response && response.success) {
          App.setState('init');
        }
      });
    });
  }
}
