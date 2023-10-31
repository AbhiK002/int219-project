import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css', './app-cart.component.css']
})
export class AppComponent {
  title = 'TechMart - Online Shopping';
  navBarVisible = false;

  toggleCartPreview() {
    $(".cart-preview").toggleClass("enabled");
  }

  toggleNavbar() {
    this.navBarVisible = !this.navBarVisible;
  }
}
