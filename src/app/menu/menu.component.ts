import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
  })
  export class MenuComponent {
    constructor(private authService: AuthService, private router: Router) { }
  
    logout() {
      this.authService.logout();

      this.router.navigate(['/login']);
    }
  }
