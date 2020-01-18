import { ModelBase } from '../base/model.base';

export interface ILocation extends ModelBase {
  lat?: number;
  lng?: number;
}

export class Location implements ILocation {
  constructor(
    public lat?: number,
    public lng?: number
  ) {
  }
}
