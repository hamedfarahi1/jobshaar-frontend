
import { ModelBase } from '../base/model.base';
import { ICompany } from '../company/company.model';
import { IEmployer } from '../employer/employer.model';

export interface IJob extends ModelBase {
  employer?: IEmployer;
  universityTypeindex?: number;
  description: string;
  categoryTypeIndex: number;
  cooperationTypeIndex: number;
  requiredGenderTypeIndex: number;
  company?: ICompany
}
