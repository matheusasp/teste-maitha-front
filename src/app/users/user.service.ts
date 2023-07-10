import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';
import { AuthService } from '../auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Role } from '../shared/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api/auth';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAuthToken() {
    const token = this.authService.getToken();

    return token;
  }

  getUsers(): Observable<User[]> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token.token}`);
    
    return this.http.get<User[]>(`${this.apiUrl}/all/user/${token.id}`, { headers });
  }

  getUser(id: number): Observable<User> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token.token}`);

    return this.http.get<User>(`${this.apiUrl}/user/${token.id}/${id}`, { headers });
  }

  addUser(user: User): Observable<void> {
    const token = this.getAuthToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token.token}`);
   
    return this.http.post<void>(`${this.apiUrl}/create/user/${token.id}`, user, { headers } );
  }

  updateUser(user: User): Observable<void> {
    var token = this.getAuthToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token.token}`);

    return this.http.post<void>(`${this.apiUrl}/update/user/${token.id}/${user.id}`, user,  { headers } );
  }

  deleteUser(id: number): Observable<void> {

    const token = this.getAuthToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token.token}`);
  
    return this.http.delete<void>(`${this.apiUrl}/delete/user/${token.id}/${id}`, { headers });
  }

  getRoles(): Observable<Role[]> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token.token}`);

    return this.http.get<Role[]>(`${this.apiUrl}/roles/${token.id}`, { headers });
  }
}
