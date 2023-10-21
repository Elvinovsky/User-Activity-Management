import { v4 as uuidv4 } from 'uuid';
import { User } from '../../models/user.js';

export class UsersService {
    constructor(mapper) {
        this._mapper = mapper
    }

    async create(firstName, age, lastName) {
        try {
            const userBuild = {
                id: uuidv4(),
                firstName: firstName,
                lastName: lastName,
                age: age,
            };

           const newUser = await User.create(userBuild);
           //await this._sender.sendUserCreatedEvent(newUser.id)
            return this._mapper.one(newUser);
        } catch (error) {
            console.error(error);
            throw new Error('Ошибка при создании пользователя');
        }
    }

    async getUsers() {
        const users = await User.findAll();
        return this._mapper.some(users)
    }

    async update(updateData) {

        try {

            const resultUpdate = await User.update({ firstName: updateData.firstName, lastName: updateData.lastName, age: updateData.age },
                 {where:{id: updateData.id}});

            if(resultUpdate[0] !== 1) return false

            //await this._sender.sendUserUpdateEvent(id)
            return true
        } catch (error) {
            console.error(error);
            throw new Error('Ошибка при обновлении пользователя');
        }
    }
}