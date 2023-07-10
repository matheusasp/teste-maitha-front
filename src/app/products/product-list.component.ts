import { Component } from '@angular/core';
import { ProductService } from '../products/product.service';
import { Product } from '../shared/models/product.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css']
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router,  private authService: AuthService) { }

  getAuthToken() {
    const token = this.authService.getToken();

    return token;
  }

  ngOnInit() {
    const token = this.getAuthToken();

    this.productService.getProducts(token.id).subscribe(

      products => this.products = products 

    );
  }

  addProduct() {
     this.router.navigate(['/products/add'], { state: {  isNewProduct: true } });
  }

  editProduct(id: Number) {
    this.router.navigate(['/products/edit/', id]);
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(
      success => {
        this.router.navigate(['/products']);
        window.location.reload();
      }

    );
  }
}
