"use strict";
// Выход из личного кабинета
const logoutButton = new LogoutButton();
logoutButton.action = () => {
	ApiConnector.logout((response) => {
		if(response.success) {
			location.reload();
		}
	});
};
// Получение информации о пользователе
ApiConnector.current((response) => {
	if(response.success) {
		ProfileWidget.showProfile(response.data);
	}
});
// Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

function updateRates() {
	ApiConnector.getStocks((response) => {
		if(response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		}
	});
}
updateRates();
setInterval(updateRates, 60000);
// Операции с деньгами
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
	ApiConnector.addMoney(data, (response) => {
		if(response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Баланс пополнен');
		} else {
			moneyManager.setMessage(false, response.error);
		}
	});
};
moneyManager.conversionMoneyCallback = (data) => {
	ApiConnector.convertMoney(data, (response) => {
		if(response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Конвертация выполнена');
		} else {
			moneyManager.setMessage(false, response.error);
		}
	});
};
moneyManager.sendMoneyCallback = (data) => {
	ApiConnector.transferMoney(data, (response) => {
		if(response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Перевод выполнен');
		} else {
			moneyManager.setMessage(false, response.error);
		}
	});
};
// Работа с избранным
const favoritesWidget = new FavoritesWidget();
// 1. функция,обновляет данные в таблице
function fillFavoritesTable(data) {
	favoritesWidget.clearTable();
	favoritesWidget.fillTable(data);
	moneyManager.updateUsersList(data);
}
// 2. Делаем начальный запрос списка избранного
ApiConnector.getFavorites((response) => {
	if(response.success) {
		fillFavoritesTable(response.data);
	}
});
// 3. Запрос на сохранение нового пользователя в избранном
favoritesWidget.addUserCallback = (data) => {
	ApiConnector.addUserToFavorites(data, (response) => {
		if(response.success) {
			// Сервер вернул обновленный список в response.data
			fillFavoritesTable(response.data);
			favoritesWidget.setMessage(true, 'Пользователь добавлен');
		} else {
			favoritesWidget.setMessage(false, response.error);
		}
	});
};
// 4. Запрос на удаление пользователя из списка избраное
favoritesWidget.removeUserCallback = (data) => {
	ApiConnector.removeUserFromFavorites(data, (response) => {
		if(response.success) {
			// Сервер вернул обновленный список в response.data
			fillFavoritesTable(response.data);
			favoritesWidget.setMessage(true, 'Пользователь удалён');
		} else {
			favoritesWidget.setMessage(false, response.error);
		}
	});
};