import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../shared/models/user.model';
import { Role } from '../shared/models/role.model';
import { MatDialog } from '@angular/material/dialog';
import { UnauthorizedDialogComponent } from '../shared/dialog/unauthorized-dialog.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: ''
  };

  roles: { id: number, name: string }[] = [];

  isNewUser: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isNewUser = history.state.isNewUser === true;

    if (!this.isNewUser) {
      const userId = this.route.snapshot.paramMap.get('id');

      if (userId) {
        const parsedUserId = parseInt(userId, 10);
        this.userService.getUser(parsedUserId).subscribe(
          (error) => {
            },
          user => {
            if(user.error) {
              this.openUnauthorizedDialog();
            }
            this.user = user
          }
        );
        this.userService.getRoles().subscribe((response: any) => {
          const roles = response.message;
          this.roles = roles.map((role: any) => ({ id: role.id, name: role.name }));
        });
        
      }
    } else {
      this.userService.getRoles().subscribe((response: any) => {
        const roles = response.message;
        this.roles = roles.map((role: any) => ({ id: role.id, name: role.name }));
      });
    }
  }

  saveUser() {
    if (this.isNewUser) {
      this.userService.addUser(this.user).subscribe(
        () => this.router.navigate(['/users'])
      );
    } else {
      this.userService.updateUser(this.user).subscribe(
        () => this.router.navigate(['/users'])
      );
    }
  }

  openUnauthorizedDialog() {
    this.router.navigate(['/users']);
    this.dialog.open(UnauthorizedDialogComponent, {
      width: '400px',
      data: { message: 'Você não possui a permissão necessária.' }
    });
  }
}
