"use strict";
// Создаём объект класса UserForm
const userForm = new UserForm();
// Обработчик авторизации
userForm.loginFormCallback = (data) => {
	ApiConnector.login(data, (response) => {
		console.log('Ответ сервера при авторизации:', response);
		if(response.success) {
			location.reload();
		} else {
			userForm.setLoginErrorMessage(response.error);
		}
	});
};
// Обработчик регистрации
userForm.registerFormCallback = (data) => {
	ApiConnector.register(data, (response) => {
		console.log('Ответ сервера при регистрации:', response);
		if(response.success) {
			location.reload();
		} else {
			userForm.setRegisterErrorMessage(response.error);
		}
	});
};