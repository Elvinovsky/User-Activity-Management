import { UsersService } from './services/users.service.js';
import {UsersMapper} from "./utils/mapper.js";



const mapper = new UsersMapper()
const service = new UsersService(mapper)

export default service
