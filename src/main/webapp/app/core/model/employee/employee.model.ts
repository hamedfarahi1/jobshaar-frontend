import { IPerson } from '../person/person.model';
import { IResume } from '../resume/resume.model';
import { IUser } from '../user/user.model';

export interface IEmployee extends IPerson {
  resume?: IResume
}

export class Employee implements IEmployee {
  constructor(
    public title?: string,
    public resume?: IResume,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public user?: IUser
  ) {
  }
}
