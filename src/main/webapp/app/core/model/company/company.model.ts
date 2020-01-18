import { ModelBase } from '../base/model.base';

export interface ICompany extends ModelBase {
  title?: string;
  name?: string;
  categoryTypeIndex?: number;
  bio?: string;
  address?: string;
}

export class Company implements ICompany {
  constructor(
    public title?: string,
    public name?: string,
    public categoryTypeIndex?: number,
    public bio?: string,
    public address?: string
  ) {
  }

  public toString(): string {
    return this.title ? this.title : '';
  }
}
