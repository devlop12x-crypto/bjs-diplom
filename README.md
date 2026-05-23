# 💰 Netcoin Exchange

Дипломный проект курса «Основы JavaScript». Биржа внутренней валюты — **Неткоин**. Пользователи могут регистрироваться, входить в систему, покупать валюту и переводить её другим участникам.

![License](https://img.shields.io/badge/license-MIT-lightgrey) ![Stack](https://img.shields.io/badge/stack-JavaScript%20%7C%20Node.js%20%7C%20Express-yellow)

---

## Функциональность

- **Регистрация и авторизация** — создание аккаунта, вход и выход из системы
- **Покупка валюты** — пополнение баланса Неткоинов
- **Переводы** — отправка валюты другим пользователям по логину
- **Личный кабинет** — просмотр баланса и истории операций

---

## Архитектура

Проект разделён на два слоя: **API** (связь с сервером) и **UI** (работа с DOM).

```
public/js/
├── api/
│   ├── createRequest.js       # XHR-обёртка для запросов к серверу
│   ├── Entity.js              # Базовый класс для всех сущностей
│   ├── User.js                # Регистрация, авторизация, выход
│   ├── Account.js             # Управление счетами
│   └── Transaction.js         # Доходы и расходы
├── ui/
│   ├── forms/
│   │   ├── AsyncForm.js           # Базовый класс форм с async-отправкой
│   │   ├── LoginForm.js           # Форма входа
│   │   ├── RegisterForm.js        # Форма регистрации
│   │   ├── CreateAccountForm.js   # Форма создания счёта
│   │   └── CreateTransactionForm.js
│   ├── widgets/
│   │   ├── AccountsWidget.js      # Список счетов
│   │   ├── TransactionsWidget.js  # Транзакции
│   │   └── UserWidget.js          # Информация о пользователе
│   ├── pages/
│   │   └── TransactionPage.js     # Страница счёта
│   ├── Modal.js                   # Модальные окна
│   └── Sidebar.js                 # Боковая панель
└── App.js                         # Точка входа, управление состоянием
```

Связь между слоями — через `App.setState()`: смена состояния перерисовывает нужные виджеты и открывает/закрывает модальные окна.

---

## Стек

- **Vanilla JavaScript** — без фреймворков, чистый DOM API
- **XHR** — асинхронные запросы к серверу
- **Node.js + Express** — backend (готовый, входит в репозиторий)
- **Cookie Session** — авторизация на основе сессий

---

## Установка и запуск

```bash
git clone https://github.com/devlop12x-crypto/bjs-diplom.git
cd bjs-diplom
npm install
npm start
```

Откроется на `http://localhost:8000`

---

## Автор

[devlop12x-crypto](https://github.com/devlop12x-crypto)
