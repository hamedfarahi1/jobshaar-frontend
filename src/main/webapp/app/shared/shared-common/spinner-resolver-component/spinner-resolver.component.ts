import { ChangeDetectorRef, Component } from '@angular/core';
import { RequestSpinnerService } from '@app/core/service/spinner-service/request-spinner.service';

@Component({
  selector: 'bmmt-loading',
  templateUrl: './spinner-resolver.component.html',
  styleUrls: ['./spinner-resolver.component.scss']
})
export class SpinnerResloverComponent {
  public showLoader: boolean = false;
  constructor(protected spinnerService: RequestSpinnerService, private cdr: ChangeDetectorRef,
  ) {
    this.spinnerService.spinnerStateChanged.subscribe(
      (showSpinner: boolean) => {
        this.showLoader = showSpinner;
        this.cdr.detectChanges();
      }
    );
  }

}
