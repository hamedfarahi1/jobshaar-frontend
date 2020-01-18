import { ModelBase } from '../base/model.base';
import { IJobSeeker } from '../job-seeker/job-seeker.model';

export interface IResume extends ModelBase {
  jobSeeker?: IJobSeeker;
  file?: File;
}

export class Resume implements IResume {
  constructor(
    public jobSeeker?: IJobSeeker,
    public file?: File
  ) { }
}
