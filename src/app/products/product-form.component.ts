import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../products/product.service';
import { UnauthorizedDialogComponent } from '../shared/dialog/unauthorized-dialog.component';
import { Product } from '../shared/models/product.model';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0
  };

  isNewProduct: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isNewProduct = history.state.isNewProduct === true;

    if (!this.isNewProduct) {
      const productId = this.route.snapshot.paramMap.get('id');
      if (productId) {
        const parsedProductId = parseInt(productId, 10);
        this.productService.getProduct(parsedProductId).subscribe(
          (error) => {
          },
          product => {
            if(product.error) {
              this.openUnauthorizedDialog();
            }

            this.product = product
          }
        );
      }
    }
  }

  saveProduct() {
    if (this.isNewProduct) {

      this.productService.addProduct(this.product).subscribe(
        () => this.router.navigate(['/products'])
      );
    } else {

      this.productService.updateProduct(this.product).subscribe(
        () => this.router.navigate(['/products'])
      );
    }
  }

  openUnauthorizedDialog() {
    this.router.navigate(['/products']);
    this.dialog.open(UnauthorizedDialogComponent, {
      width: '400px',
      data: { message: 'Você não possui a permissão necessária.' }
    });
  }
}
