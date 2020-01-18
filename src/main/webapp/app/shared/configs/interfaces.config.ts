import { KeyValue } from '@angular/common';

export type QueryParam = StringIndexer & {
  page?: number;
  size?: number;
  sort?: string;
  filter?: KeyValue<string, string>[];
};
export type QueryParamRoute = StringIndexer & {
  page?: number;
  size?: number;
  sort?: string;
  filter?: string;
};

export interface StringIndexer {
  [key: string]: string;
}
