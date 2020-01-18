import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-main',
  templateUrl: './account-main.component.html',
  styleUrls: ['./account-main.component.scss']
})
export class AccountMainComponent implements OnInit {

  constructor(ngZone: NgZone) {
    window.onresize = () => {
      ngZone.run(() => this.winWidth = window.innerWidth);
    }
  }

  winWidth = 950;
  ngOnInit() {
    this.winWidth = window.innerWidth;
  }
}
