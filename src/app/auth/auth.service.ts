import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private tokenKey : any;


  constructor(private http: HttpClient) { }

  setToken(token: string): void {
    const tokenObj = { token: token };
    const tokenString = JSON.stringify(tokenObj);
    localStorage.setItem(this.tokenKey, tokenString);
  }

  getToken() {
    const tokenString = localStorage.getItem(this.tokenKey);
    if (tokenString) {
      const tokenObj = JSON.parse(tokenString);
      const token = tokenObj.token;
      return token; 
    }
    return null;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  logout(): void {
     localStorage.clear();
  }

  public isAuthenticated(): boolean {

    const token = this.getToken();

    return !!token;
  }
}
