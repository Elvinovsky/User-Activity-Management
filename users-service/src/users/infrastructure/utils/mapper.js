export class UsersMapper {
  constructor(user, users) {
    this._user = user;
    this._users = users;
  }

  one(user) {
    console.log(user);
    return {
      id: user.id,
      fullName: `${user.firstName} ${user.lastName}`,
      age: user.age,
      createdAt: user.createdAt,
    };
  }
  some(users) {
    return users.map((u) => {
      return {
        id: u.id,
        fullName: `${u.firstName} ${u.lastName}`,
        age: u.age,
        createdAt: u.createdAt,
      };
    });
  }
}

export function setActualData(history, actualData) {
  const activityHistory = history.data.items[0];

  if (activityHistory.actualData.changedAt === actualData.updatedAt) {
    return history;
  } else {
    // корректируем старые данные юзера с учетом пагинации
    activityHistory.oldData.push(activityHistory.actualData);
    activityHistory.oldData.pop();

    // задаем последние обновленные данные юзера.
    activityHistory.actualData.fullName = `${actualData.firstName} ${actualData.lastName}`;
    activityHistory.actualData.age = actualData.age;
    activityHistory.actualData.changedAt = actualData.updatedAt;
    return history;
  }
}
