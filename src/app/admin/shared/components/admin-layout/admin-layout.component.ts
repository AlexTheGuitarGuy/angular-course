import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.sass'],
})
export class AdminLayoutComponent {
  constructor(private router: Router, public auth: AuthService) {}

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/admin', 'login']);
  }
}
