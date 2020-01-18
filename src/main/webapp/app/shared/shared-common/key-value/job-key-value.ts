import { KeyValue } from '@angular/common';
import { Observable, of } from 'rxjs';

const genderArray: KeyValue<number, string>[] = [
  {
    key: 0,
    value: 'خانم'
  },
  {
    key: 1,
    value: 'آقا'
  },
  {
    key: 2,
    value: 'مهم نیست'
  }
];

const categoryArray: KeyValue<number, string>[] = [
  {
    key: 0,
    value: 'وب و برنامه نویسی'
  },
  {
    key: 1,
    value: 'مدیریت شبکه'
  },
  {
    key: 2,
    value: 'اپراتور'
  },
  {
    key: 3,
    value: 'اوووفی'
  }
];

const cooperationTypesArray: KeyValue<number, string>[] = [
  {
    key: 0,
    value: 'پاره وقت'
  },
  {
    key: 1,
    value: 'تمام وقت'
  },
  {
    key: 2,
    value: 'دورکاری'
  },
  {
    key: 3,
    value: 'کارآموزی'
  }
];
export class JobKeyValue {
  getCategoryTypes(): Observable<KeyValue<number, string>[]> {
    return of(categoryArray);
  }
  getCooperationTypes(): Observable<KeyValue<number, string>[]> {
    return of(cooperationTypesArray);
  }
  getRequiredGenders(): Observable<KeyValue<number, string>[]> {
    return of(genderArray);
  }

  get(name: string): KeyValue<number, string>[] {
    if (name === 'requiredGenders')
      return genderArray;
    if (name === 'cooperationTypes')
      return cooperationTypesArray;
    if (name === 'categoryTypes')
      return categoryArray;
    throw 'not exist';
  }
}
