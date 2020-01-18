import { HttpParams } from '@angular/common/http';
import { QueryParam } from '@app/shared/configs/interfaces.config';

export const createRequestOption = (req?: QueryParam): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(key => {
      if (key !== 'sort' && key !== 'filter') {
        options = options.set(key, req[key]);
      }
    });
    if (req.sort) {
      options = options.append('sort', req.sort);
    }
    if (req.filter) {
      req.filter.forEach(item => {
        options = options.append(item.key, item.value);
      });
    }
  }
  return options;
};
