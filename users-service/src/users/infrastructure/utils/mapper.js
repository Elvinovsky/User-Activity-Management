

export class UsersMapper {

    constructor ( user, users) {
        this._user = user;
        this._users = users;
    }

    one(user){
        console.log(user)
        return {
            id: user.id,
            fullName: `${user.firstName} ${user.lastName}`,
            age: user.age,
        }
       }
    some(users) {
        return users.map((users)=> {
                return {
                    id: users.id,
                    fullName: `${users.firstName} ${users.lastName}`,
                    age: users.age,
                };
            }
        )
    }
}
