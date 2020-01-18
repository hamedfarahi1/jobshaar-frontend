import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'abs'
})
export class AbsoluteNumberMomentPipe implements PipeTransform {

	transform(value: number): number {
		if (value) {
			return Math.abs(value);
		} else {
			return 0;
		}
	}

}
