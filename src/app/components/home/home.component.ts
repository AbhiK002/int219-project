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
  productsCopy: any[] = [];
  heldDownComponent: any = null;

  constructor(private http: HttpClient) {}

  sortingModes: any = [
    { value: "featured", name: "Featured", func: null },
    { value: "price-asc", name: "Price (Low to High)", func: (a: any, b: any) => a.price - b.price },
    { value: "price-desc", name: "Price (High to Low)", func: (a: any, b: any) => b.price - a.price },
    { value: "name-asc", name: "Name (A-Z)", func: (a: any, b: any) => a.title.localeCompare(b.title) },
    { value: "name-desc", name: "Name (Z-A)", func: (a: any, b: any) => b.title.localeCompare(a.title) }
  ]
  shuffleArray(array: Object[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }
  sortingMode: number = 0;
  ngOnInit() {
    this.http.get('assets/products.json').subscribe((data: any) => {
      this.products = data;
      this.productsCopy = [...this.products];
      this.shuffleArray(this.productsCopy);
    });
  }
  sortTheProducts(event: any) {
    this.sortingMode = event.target.value;
    this.productsCopy = [...this.products];

    if (this.sortingModes[this.sortingMode].value != "featured") this.productsCopy.sort(this.sortingModes[this.sortingMode].func);
    else this.shuffleArray(this.productsCopy);
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