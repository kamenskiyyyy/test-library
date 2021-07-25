# Тестовое задание: "Сделать Backend для библиотеки на Node.JS"

## Основной функционал:
- Пользователь может купить абонемент и получить доступ к книгам.

## Ограничения:
- Одновременно пользователь не может взять более 5 книг
- Если у пользователя нет купленного абонемента то ему нельзя взять книгу
- Пользователь может иметь одновременно только 1 активный абонемент
- Каждая книга может быть выдана только 1 человеку в 1 момент времени (будем предполагать что существует только 1 экземпляр книги и пока один пользователь не вернул книгу другой не может ее взять)

## Роуты

### Для пользователей:
<table>
<tr>
<td align="center"><strong>Запрос</strong></th>
<td align="center"><strong>Роут</strong></th>
<td align="center"> <strong>Описание</strong></th>
</tr>

<tr>
<td align="center">GET</td>
<td align="center">/users</td>
<td>(Публичный) Показывает список всех пользователей</td>
</tr>

<tr>
<td align="center">POST</td>
<td align="center">/users/signup</td>
<td>Создание нового пользователя</td>
</tr>

<tr>
<td align="center">POST</td>
<td align="center">/users/signin</td>
<td>Авторизация зарегистрированного пользователя</td>
</tr>

<tr>
<td align="center">POST</td>
<td align="center">/signout</td>
<td>Удаляет JWT из куков пользователя</td>
</tr>

<tr>
<td align="center">GET</td>
<td align="center">/users/:id</td>
<td>(Публичный) Возвращает информацию о конкретном пользователе + список взятых книг</td>
</tr>

<tr>
<td align="center">PUT</td>
<td align="center">/users/:id</td>
<td>Обновляет информацию о пользователе</td>
</tr>

<tr>
<td align="center">DELETE</td>
<td align="center">/users/:id</td>
<td>Удаляет текущего пользователя</td>
</tr>

<tr>
<td align="center">GET</td>
<td align="center">/users/:id/buycard</td>
<td>Метод позволяет пользователю купить читательский билет. Если билет уже есть, то вылетит ошибка.</td>
</tr>

<tr>
<td align="center">PUT</td>
<td align="center">/users/:id/getBook/:idBook</td>
<td>Метод позволяет пользователю взять себе книгу по ее id. Нельзя брать больше пяти книг. Если пользователь уже взял эту книгу, то вылетит ошибка.</td>
</tr>

<tr>
<td align="center">PUT</td>
<td align="center">/users/:id/passBook/:idBook</td>
<td>Метод позволяет пользователю сдать книгу.</td>
</tr>

</table>

### Для книг:

<table>
<tr>
<td align="center"><strong>Запрос</strong></th>
<td align="center"><strong>Роут</strong></th>
<td align="center"> <strong>Описание</strong></th>
</tr>

<tr>
<td align="center">GET</td>
<td align="center">/books</td>
<td>(Публичный) Возвращает список всех книг</td>
</tr>

<tr>
<td align="center">GET</td>
<td align="center">/books/:id</td>
<td>(Публичный) Возвращает информацию о конкретной книге</td>
</tr>

<tr>
<td align="center">POST</td>
<td align="center">/books</td>
<td>Создание новой книги</td>
</tr>

<tr>
<td align="center">PUT</td>
<td align="center">/books/:id</td>
<td>Обновляет информацию о книге</td>
</tr>

<tr>
<td align="center">DELETE</td>
<td align="center">/books/:id</td>
<td>Метод удаляет книгу</td>
</tr>

</table>
