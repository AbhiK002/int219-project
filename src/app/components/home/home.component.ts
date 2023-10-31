import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home-card.component.css']
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
      "photo": "/assets/products/1.jpg",
      "count": 1
    },
    {
      "id": "34550",
      "title": "Bose Quietcomfort 45",
      "description": "Bluetooth Wireless Over Ear Headphones with Mic Noise Cancelling - Triple Black",
      "price": 20000,
      "category": "Headphones",
      "outOfStock": false,
      "photo": "/assets/products/14.jpg",
      "count": 1
    },
    {
      "id": "34536",
      "title": "ASUS ROG Strix G15 (2022)",
      "description": "Ryzen 7 Octa Core AMD R7-6800H - (16 GB/512 GB SSD/Windows 11 Home/4 GB Graphics/NVIDIA GeForce RTX RTX 3050/144 Hz) G513RC-HN062W Gaming Laptop  (15.6 Inch, Volt Green, 2.10 Kg)",
      "price": 88000,
      "category": "Laptop",
      "outOfStock": false,
      "photo": "/assets/products/17.jpg",
      "count": 1
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

  addToCart(product: any) {
    if (this.cartElements.length < 20 && !this.cartElements.includes(product)) {
      product["count"] = 1;
      this.cartElements.push(product);
    }
    else {
      this.cartElements = this.cartElements.map((prod: any) => {
        if (prod.id == product.id) {
          prod.count += 1;
        }
        return prod;
      })
    }

  }

  previousScrollPosition: number = 0;
  running: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const cart = $(".interactive-cart");
    const cartImg = $(".interactive-cart .cart");
    const currentScrollPosition = window.scrollY;
    const pixelsScrolled = Math.abs(currentScrollPosition - this.previousScrollPosition);

    if (currentScrollPosition > this.previousScrollPosition) {
      if (pixelsScrolled > 2) {
        cart.css("rotate", "0deg");
        $(".cart .mini-item").css("rotate", "0deg");
        $(".cart .mini-item span").css("left", "0%");
        $(".cart .mini-item span").css("top", "0%");
      };
      
    } 
    else if (currentScrollPosition < this.previousScrollPosition) {
      if (pixelsScrolled > 2) {
        cart.css("rotate", "180deg");
        $(".cart .mini-item").css("rotate", "180deg");
        $(".cart .mini-item span").css("left", "80%");
        $(".cart .mini-item span").css("top", "70%");
      }
    }
    
    if (this.running) return;
    this.running = true;

    let range = 8;
    let angleRange = 5;
    let intervalPX = 500;
    cartImg.css("transform", `translateX(${Math.abs(currentScrollPosition % (2*intervalPX) - intervalPX)/intervalPX * range - range/2}px)`);
    cartImg.css("rotate", `${Math.abs(currentScrollPosition % (2*intervalPX) - intervalPX)/intervalPX * angleRange - angleRange/2}deg`)

    this.previousScrollPosition = currentScrollPosition;
    setTimeout(() => {
      this.running = false;
    }, 200);
  }

  @HostListener('window:mousemove', ['$event'])
  onMove(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const float = $(".floating-product-card");
    let width = float.outerWidth();
    let height = float.outerHeight();
    
    float.css("--mouse-x", (event.clientX - (width ? width/2 : 0)) + 'px');
    float.css("--mouse-y", (event.clientY - (height ? height/2 : 0)) + 'px');

    let touchingCart = target.closest('.interactive-cart');
    if (this.heldDownComponent && touchingCart) {
      $(".floating-product-card").css("border-color", "green");
    }
    else if (this.heldDownComponent && !touchingCart) {
      $(".floating-product-card").css("border-color", "rgba(0, 0, 0, 0.5)");
    }
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {    
    const target = event.target as HTMLElement;
    if (this.heldDownComponent && target.closest('.interactive-cart')) {
      this.addToCart(this.heldDownComponent);
    }
    else {
      $(".floating-product-card").css("border-color", "red");
    }

    this.timeoutID = setTimeout(() => {
      this.heldDownComponent = null;
      const cart = $(".interactive-cart");
      cart.removeClass("shakeSlow");
    }, 300);
    $(".floating-product-card").removeClass("visible");
  }
}