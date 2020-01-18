import { ICompany } from '../company/company.model';
import { IJob } from '../job/job.model';
import { IPerson } from '../person/person.model';
import { IUser } from '../user/user.model';

export interface IEmployer extends IPerson {
  jobs?: IJob[];
  company?: ICompany;
}

export class Employer implements IEmployer {
  constructor(
    public title?: string,
    public jobs?: IJob[],
    public company?: ICompany,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public user?: IUser
  ) {
  }
}
