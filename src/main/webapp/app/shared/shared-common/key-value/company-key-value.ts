import { KeyValue } from '@angular/common';
import { Observable, of } from 'rxjs';

export class CompanyKeyValue {
  getAll(): Observable<KeyValue<number, string>[]> {
    const array: KeyValue<number, string>[] = [
      {
        key: 0,
        value: 'برنامه نویسی'
      },
      {
        key: 1,
        value: 'طراحی'
      },
      {
        key: 2,
        value: 'تحلیل شغلی'
      },
      {
        key: 3,
        value: 'مکانیک'
      },
      {
        key: 4,
        value: 'راهداری'
      },
      {
        key: 5,
        value: 'زمین شناسی'
      },
      {
        key: 6,
        value: 'راهنمایی و رانندگی'
      }
    ];
    return of(array);
  }
}
