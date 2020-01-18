import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RequestSpinnerService {
	private spinnerState = 0;
	public spinnerStateChanged = new Subject<boolean>();

	public changeSpinnerState(show: boolean): void {
		const prevState = this.spinnerState;
		if (show)
			this.spinnerState++;
		else if (this.spinnerState > 0) // never should be below zero
			this.spinnerState--;
		if (prevState === 0)
			this.spinnerStateChanged.next(true);
		else if (this.spinnerState === 0)
			this.spinnerStateChanged.next(false);
	}
}
