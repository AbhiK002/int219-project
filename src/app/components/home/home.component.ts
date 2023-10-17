import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
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
    const cart = $(".interactive-cart");
    cart.addClass("shake");
    setTimeout(() => {
      cart.removeClass("shake");
    }, 400);
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

  addToCart() {
    console.log("added to cart");
  }

  previousScrollPosition: number = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const cart = $(".interactive-cart");
    const cartImg = $(".interactive-cart img");
    const currentScrollPosition = window.scrollY;
    const pixelsScrolled = Math.abs(currentScrollPosition - this.previousScrollPosition);

    let range = 10;
    let angleRange = 8;
    let intervalPX = 300;
    cartImg.css("transform", `translateX(${Math.abs(currentScrollPosition % (2*intervalPX) - intervalPX)/intervalPX * range - range/2}px)`);
    cartImg.css("rotate", `${Math.abs(currentScrollPosition % (2*intervalPX) - intervalPX)/intervalPX * angleRange - angleRange/2}deg`)

    if (currentScrollPosition > this.previousScrollPosition) {
      if (pixelsScrolled > 2) cart.css("rotate", "0deg");
      
    } 
    else if (currentScrollPosition < this.previousScrollPosition) {
      if (pixelsScrolled > 2) cart.css("rotate", "180deg");
    }

    this.previousScrollPosition = currentScrollPosition;
  }
}