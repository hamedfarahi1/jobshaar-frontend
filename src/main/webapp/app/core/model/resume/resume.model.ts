import { ModelBase } from '../base/model.base';

export interface IResume extends ModelBase {
  url?: string;
}

export class Resume implements IResume {
  constructor(
    public url?: string
  ) { }
}
