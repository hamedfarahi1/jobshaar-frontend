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
    value: 'Backend Developer'
  },
  {
    key: 1,
    value: 'Frontend Developer'
  },
  {
    key: 2,
    value: 'برنامه نویس موبایل'
  },
  {
    key: 3,
    value: 'UI/UX'
  },
  {
    key: 4,
    value: 'Test Development'
  },
  {
    key: 5,
    value: 'Devops'
  },
  {
    key: 6,
    value: 'برنامه نویس'
  },
  {
    key: 7,
    value: 'مدیریت پروزه'
  },
  {
    key: 8,
    value: 'CTO'
  },
  {
    key: 9,
    value: 'Industry'
  },
  {
    key: 10,
    value: 'طراحی'
  },
  {
    key: 11,
    value: 'تولید محتوا'
  },
  {
    key: 12,
    value: 'کسب و کار'
  },
  {
    key: 13,
    value: 'مالی'
  },
  {
    key: 14,
    value: 'آموزش'
  },
  {
    key: 15,
    value: 'معماری'
  },
  {
    key: 16,
    value: 'مکانیک'
  },
  {
    key: 17,
    value: 'صنایع'
  },
  {
    key: 18,
    value: 'روانشناسی'
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
    value: 'کارآموزی'
  },
  {
    key: 3,
    value: 'دورکاری'
  }
];

const companyCategoryTypes: KeyValue<number, string>[] = [
  {
    key: 0,
    value: 'IT'
  },
  {
    key: 1,
    value: 'Industry'
  },
  {
    key: 2,
    value: 'طراحی'
  },
  {
    key: 3,
    value: 'Content'
  },
  {
    key: 4,
    value: 'کسب و کار'
  },
  {
    key: 5,
    value: 'Financial'
  },
  {
    key: 6,
    value: 'آموزش'
  },
  {
    key: 7,
    value: 'معماری'
  },
  {
    key: 8,
    value: 'مکانیک'
  },
  {
    key: 9,
    value: 'ساخت و ساز'
  },
  {
    key: 10,
    value: 'روانشناسی'
  }
]
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

  getژompanyCategoryTypes(): Observable<KeyValue<number, string>[]> {
    return of(companyCategoryTypes);
  }

  get(name: string): KeyValue<number, string>[] {
    if (name === 'requiredGenders')
      return genderArray;
    if (name === 'cooperationTypes')
      return cooperationTypesArray;
    if (name === 'categoryTypes')
      return categoryArray;
    if (name === 'companyCategoryTypes')
      return companyCategoryTypes;
    throw 'not exist';
  }
}
