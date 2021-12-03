import faker from 'faker/locale/pt_BR';
import { v4 as uuid } from 'uuid';
import { Client } from './users';

export interface Routes {
  users: Client[];
}

const routes = () => {
  const data: Routes = { users: [] };

  for (let i = 0; i < 200; i++) {
    data.users.push({
      id: uuid(),
      email: faker.internet.email(),
      name: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
    });
  }

  return data;
}

export default routes;