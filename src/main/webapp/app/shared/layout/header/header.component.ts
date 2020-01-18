import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServerProvider } from '@app/core/auth/auth-jwt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isOpen: boolean = false;
  @Output() toggle = new EventEmitter();

  constructor(
    private authService: AuthServerProvider,
    private router: Router,

  ) { }


  logout() {
    this.authService.logout().subscribe();
    this.router.navigate(['account', 'login']);
  }
  tog() {
    this.toggle.emit();
  }
}
