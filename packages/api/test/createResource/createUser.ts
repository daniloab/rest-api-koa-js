import { IUser, UserModel, TenantModel } from '@fullstack-playground/modules';

import { DeepPartial } from '../../src/types';

import { getOrCreate } from './helpers';
import { createTenant } from './createTenant';

type CreateUserArgs = DeepPartial<IUser>;
export const createUser = async (args: CreateUserArgs = {}): Promise<IUser> => {
  let { email, tenant } = args;

  // TODO - migrate to getCounter
  // const n = getCounter('user');
  const n = (global.__COUNTERS__.user += 1);

  if (!email) {
    email = `user${n}@example.com`;
  }

  if (!tenant) {
    tenant = await getOrCreate(TenantModel, createTenant);
  }

  return new UserModel({
    name: `Normal user ${n}`,
    password: '123456',
    email,
    tenant,
  }).save();
};
