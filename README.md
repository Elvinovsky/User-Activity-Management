Понял, вот краткое описание с урлами и входными параметрами:

### Сервис Пользователей (users-service)

#### Создание пользователя

- **Метод:** POST
- **Путь:** `/users`
- **Описание:** Создание нового пользователя.
- **Входные параметры:** `age` (number), `firstName` (string), `lastName` (string).

#### Изменение пользователя

- **Метод:** PUT
- **Путь:** `/users/{userId}`
- **Описание:** Изменение существующего пользователя.
- **Входные параметры:** `userId` (uuid), `age` (number), `firstName` (string), `lastName` (string).

#### Получение списка пользователей

- **Метод:** GET
- **Путь:** `/users`
- **Описание:** Получение списка всех пользователей.

#### Получение истории действий с пользователями

- **Метод:** GET
- **Путь:** `/users/history`
- **Описание:** Получение истории действий с пользователями.

### Сервис Истории Действий с пользователями (action-stories-service)

#### Создание истории действия с пользователем

- **Метод:** POST
- **Путь:** `/history/create`
- **Описание:** Регистрация события создания или изменения пользователя.
- **Входные параметры:** `id` (uuid), `fullName` (string), `age` (number).

#### Получение истории всех действий с пользователями

- **Метод:** GET
- **Путь:** `/history`
- **Описание:** Получение истории всех действий с пользователями.

#### Получение истории действий с определенным пользователем

- **Метод:** GET
- **Путь:** `/history/{userId}`
- **Описание:** Получение истории действий с определенным пользователем.

#### Удаление данных тестирования

- **Метод:** DELETE
- **Путь:** `/history/testing/all-data`
- **Описание:** Удаление всех данных, используемых для тестирования.

### Пагинация и Фильтрация

Вы можете использовать параметры `pageNumber` и `pageSize` для управления пагинацией запросов:

- `pageNumber` (необязательный): Номер страницы результатов (по умолчанию 1).
- `pageSize` (необязательный): Количество элементов на странице (по умолчанию 10).

Примеры запросов с использованием параметров пагинации:

- **Получение списка пользователей на второй странице с 20 элементами на странице:** `/users?pageNumber=2&pageSize=20`
- **Получение истории действий с пользователями на первой странице с 5 элементами на странице:** `/users/history?pageNumber=1&pageSize=5`

#### Тестирование 
Перед запуском E2E-тестов убедитесь, 
что **сервис истории действий с пользователями (action-stories-service)** запущен.

- **Метод:** DELETE
- **Путь:** `/history/testing/all-data`
- **Описание:** Удаление всех данных, используемых для тестирования.

## Технологии и Библиотеки

- **Node.js** - Серверная среда выполнения JavaScript.
- **NestJS** - Фреймворк для создания масштабируемых и эффективных серверных приложений на Node.js.
- **Express** - Web-фреймворк для Node.js.
- **Sequelize** - Объектно-реляционное отображение (ORM) для работы с базой данных PostgreSQL.

## Установка и Запуск

1. Установите зависимости для каждого сервиса:

   ```
   cd users-service
   yarn install

   cd action-stories-service
   yarn install
   ```

2. Запустите каждый сервис:

   ```
   cd users-service
   yarn start

   cd action-stories-service
   yarn start
   ```

