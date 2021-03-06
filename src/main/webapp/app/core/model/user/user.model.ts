import { ModelBase } from '../base/model.base';

export interface IUser extends ModelBase {
  username?: string;
  password?: string;
  email?: string;
}

export class User implements IUser {
  constructor(
    public title?: string,
    public username?: string,
    public password?: string,
    public email?: string
  ) {

  }
}
