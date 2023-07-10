import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../shared/models/product.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://127.0.0.1:8000/api/auth';
  
    constructor(private http: HttpClient, private authService: AuthService) { }

    getAuthToken() {
      const token = this.authService.getToken();

      return token;
    }
  
    getProducts(id: number): Observable<Product[]> {
      const token = this.getAuthToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token.token}`);
      return this.http.get<Product[]>(`${this.apiUrl}/all/product/${id}`, { headers });
    }
  
    getProduct(id: number): Observable<Product> {
 
      const token = this.getAuthToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token.token}`);

      return this.http.get<Product>(`${this.apiUrl}/product/${token.id}/${id}`, { headers });
    }
  
    addProduct(product: Product): Observable<void> {

      const token = this.getAuthToken();

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token.token}`);

      return this.http.post<void>(`${this.apiUrl}/create/product/${token.id}`, product, { headers } );
    }
  
    updateProduct(product: Product): Observable<any> {
      var token = this.getAuthToken();

      return this.http.post<void>(`${this.apiUrl}/update/product/${token.id}/${product.id}`, product);
    }
  
    deleteProduct(id: number): Observable<void> {

      const token = this.getAuthToken();

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token.token}`);

      return this.http.delete<void>(`${this.apiUrl}/delete/product/${token.id}/${id}`, { headers });
    }
  }
