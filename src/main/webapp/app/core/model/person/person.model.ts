import { IUser, User } from '@app/core/model/user/user.model';
import { ModelBase } from '../base/model.base';

export interface IPerson extends ModelBase {
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  user?: User;
}

export class Person implements IPerson {
  constructor(
    public title?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public user?: IUser
  ) { }
}
