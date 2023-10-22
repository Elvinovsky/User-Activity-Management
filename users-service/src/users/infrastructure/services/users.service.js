import { v4 as uuidv4 } from 'uuid';
import { User } from '../../models/user.js';

export class UsersService {
  constructor(mapper) {
    this._mapper = mapper;
  }

  async findUser(id) {
    return await User.findByPk(id);
  }

  async getUsers() {
    const users = await User.findAll();
    return this._mapper.some(users);
  }

  async create(firstName, age, lastName) {
    try {
      const id = uuidv4(); // Генерируем новый UUID
      const createdAt = new Date(); // Текущая дата создания

      const user = { id, firstName, lastName, age, createdAt };
      const newUser = await User.create(user);

      return this._mapper.one(newUser);
    } catch (error) {
      console.error(error);
      throw new Error('Ошибка при создании пользователя');
    }
  }

  async update(updateData) {
    try {
      const { id, firstName, lastName, age } = updateData;
      const [rowsUpdated] = await User.update(
        { firstName, lastName, age },
        { where: { id } },
      );

      return rowsUpdated === 1; // Обновление успешно, если обновлен один ряд
    } catch (error) {
      console.error(error);
      throw new Error('Ошибка при обновлении пользователя');
    }
  }
}
