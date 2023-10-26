import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: any = null;
  pageStatus: number = 101;

  constructor(private route : ActivatedRoute, private http : HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('productId');

      this.http.get("/assets/products.json")
      .pipe(
        catchError(error => {
          console.log("SERVER ERROR: " + error.status + " " + error.statusText);
          this.pageStatus = 500;
          return of();
        }))
      .subscribe(res => {
        let products: any[any] = res;

        setTimeout(() => {
          let found = false;
          for (const prod of products) {
            if (prod.id === productId) {
              this.product = prod;
              found = true;
              this.pageStatus = 200;
              break;
            }
          }
          if (!found) this.pageStatus = 404;
        }, 1200);
      })
    })
  }
}
