import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAccountPage: boolean = true;
  constructor(router: Router) {
    router.events.subscribe(res => {
      if (res instanceof NavigationStart)
        this.isAccountPage = res.url.startsWith('/account')
    })
  }
}
