import { Pipe, PipeTransform } from '@angular/core';
import { JobKeyValue } from '../key-value/job-key-value';

@Pipe({
  name: 'JobEnum'
})
export class JobEnumPipe implements PipeTransform {

  constructor(
    private jobKeyValue: JobKeyValue
  ) {
  }
  // tslint:disable-next-line:no-any
  transform(value: any, name: string): string {
    const args = this.jobKeyValue.get(name);
    const keyValue = args.find(arg => arg.key.toString() === value.toString());
    if (keyValue)
      return keyValue.value;
    return '';
  }
}
