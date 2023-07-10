import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/users']);
    }
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      success => {
        if (success) {
          this.authService.setToken(success);
          this.router.navigate(['/products']);
        } else {
          this.loginFailed = true;
        }
      }
    );
  }
}
