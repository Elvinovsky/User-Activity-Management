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
