import { IPerson } from '../person/person.model';
import { IResume } from '../resume/resume.model';
import { IUser } from '../user/user.model';

export interface IJobSeeker extends IPerson {
  universityTypeIndex?: number;
  resume?: IResume;
}

export class JobSeeker implements IJobSeeker {
  constructor(
    public title?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public user?: IUser,
    public universityTypeIndex?: number
  ) {

  }
}
