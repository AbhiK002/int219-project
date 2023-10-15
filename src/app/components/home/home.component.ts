import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  heldDownComponent: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('assets/products.json').subscribe((data: any) => {
      this.products = data;
    });
  }

  toggleCartPreview() {
    $(".cart-preview").toggleClass("enabled");
  }

  selectProduct(product: any) {
    this.heldDownComponent = product;
    console.log(this.heldDownComponent);
  }

  mouseUpCallback() {
    this.heldDownComponent = null;
  }

  maybeAddToCart(product: any) {
    // if coords inside cart, add to cart
    console.log("adding to cart");
    this.heldDownComponent = null;
  }

  clickProduct(product: any) {
    console.log("clicking");
    // redirect to the product page for the current product
  }

  isDragging: boolean = false;
  offsetX: number = 0;
  offsetY: number = 0;

  startDrag(event: MouseEvent): void {
    this.isDragging = true;
    this.offsetX = event.clientX;
    this.offsetY = event.clientY;
  }

  drag(event: MouseEvent): void {
    if (this.isDragging) {
      const newX = event.clientX - this.offsetX;
      const newY = event.clientY - this.offsetY;

      // Update the position of the draggable element
      const draggableElement = document.querySelector('.draggable') as HTMLElement;
      draggableElement.style.left = newX + 'px';
      draggableElement.style.top = newY + 'px';

      // Update the offset for the next drag event
      this.offsetX = event.clientX;
      this.offsetY = event.clientY;
    }
  }

  endDrag(): void {
    this.isDragging = false;
  }
}

