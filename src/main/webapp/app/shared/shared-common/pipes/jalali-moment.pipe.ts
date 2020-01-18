import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
	name: 'jalaliMoment'
})
export class JalaliMomentPipe implements PipeTransform {

	transform(value: string, format: string): string {
		if (value) {
			const momentDate = moment.from(value, 'en');
			return momentDate.format(format);
		} else {
			return '';
		}
	}

}
