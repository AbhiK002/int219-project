import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root', // This defines the HTML element where the component will be rendered
  templateUrl: './app.component.html', // The HTML template for the component
  styleUrls: ['./app.component.css'] // The CSS styles for the component
})
export class AppComponent {
  title = 'Gismos - Online Shopping'; // A sample title for your application

  toggleCartPreview() {
    $(".cart-preview").toggleClass("enabled");
  }
}
