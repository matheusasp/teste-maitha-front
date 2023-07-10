import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.handleNavigationStart();
      }
    });
  }

  private handleNavigationStart() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }
}
