import { Component } from '@angular/core';
import { UserService } from '../users/user.service';
import { User } from '../shared/models/user.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.css']
})
export class UserListComponent {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  getAuthToken() {
    const token = this.authService.getToken();

    return token;
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      users => this.users = users
    );
  }

  addUser() {
    this.router.navigate(['/users/add'], { state: {  isNewUser: true } });
  }

  editUser(id: number) {
    this.router.navigate(['/users/edit/', id]);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      success => {
        this.router.navigate(['/users']);
        window.location.reload();
      }

    );
  }
}
