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
  cartElements: any = [
    {
      "id": "34562",
      "title": "HP w100 ",
      "description": "480P 30 FPS Digital Webcam with Built-in Mic, Plug and Play Setup, Wide-Angle View for Video Calling on Skype, Zoom, Microsoft Teams and Other Apps (Black)",
      "price": 449,
      "category": "Webcams",
      "outOfStock": true,
      "photo": "/assets/products/1.jpg"
    },
    {
      "id": "34550",
      "title": "Bose Quietcomfort 45",
      "description": "Bluetooth Wireless Over Ear Headphones with Mic Noise Cancelling - Triple Black",
      "price": 20000,
      "category": "Headphones",
      "outOfStock": false,
      "photo": "/assets/products/14.jpg"
    },
    {
      "id": "34536",
      "title": "ASUS ROG Strix G15 (2022)",
      "description": "Ryzen 7 Octa Core AMD R7-6800H - (16 GB/512 GB SSD/Windows 11 Home/4 GB Graphics/NVIDIA GeForce RTX RTX 3050/144 Hz) G513RC-HN062W Gaming Laptop  (15.6 Inch, Volt Green, 2.10 Kg)",
      "price": 88000,
      "category": "Laptop",
      "outOfStock": false,
      "photo": "/assets/products/17.jpg"
    }
  ]

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

  timeoutID: any = null;
  selectProduct(event: MouseEvent, product: any) {
    const target = event.target as HTMLElement;
    if (['h5', 'p', 'button'].includes(target.tagName.toLowerCase())) return;
    
    if (this.timeoutID) clearTimeout(this.timeoutID);
    const cart = $(".interactive-cart");
    cart.addClass("shakeSlow");
    $(".floating-product-card").addClass("visible");
    this.heldDownComponent = product;
  }

  addToCart() {
    alert("Added to Cart!")
  }

  previousScrollPosition: number = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const cart = $(".interactive-cart");
    const cartImg = $(".interactive-cart .cart");
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

  @HostListener('window:mousemove', ['$event'])
  onMove(event: MouseEvent) {
    const float = $(".floating-product-card");
    let width = float.outerWidth();
    let height = float.outerHeight();
    
    float.css("--mouse-x", (event.clientX - (width ? width/2 : 0)) + 'px');
    float.css("--mouse-y", (event.clientY - (height ? height/2 : 0)) + 'px');
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.timeoutID = setTimeout(() => {
      this.heldDownComponent = null;
      const cart = $(".interactive-cart");
      cart.removeClass("shakeSlow");
    }, 300);
    $(".floating-product-card").removeClass("visible");
    
    const target = event.target as HTMLElement;
    if (this.heldDownComponent && target.closest('.interactive-cart')) {
      $(".floating-product-card").css("border-color", "green");
      setTimeout(() => {
        this.addToCart();
        $(".floating-product-card").css("border-color", "rgba(0, 0, 0, 0.5)");
      }, 200);
    }
    else {
      $(".floating-product-card").css("border-color", "red");
      setTimeout(() => {
        $(".floating-product-card").css("border-color", "rgba(0, 0, 0, 0.5)");
      }, 200);
    }
  }
}