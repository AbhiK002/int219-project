import { Component } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  paymentOptions = ["Cash on Delivery", "UPI", "Gismos Wallet", "Pay Later", "Credit Card", "Debit Card", "Net Banking"]

  constructor(private router: Router) {}

  placeOrder() {
    var selectedOption = $("input[name='paymentOption']:checked").val();

    if (selectedOption) {
      let but = $(".btn.place-order-button");
      but.text("Placing...")
      but.removeClass("btn-primary");
      but.addClass("btn-warning");
      but.attr("disabled", "true");
      setTimeout(() => {
        but.removeClass("btn-warning");
        but.addClass("btn-success");
        but.text("Order Placed!");
        $(".cancel-order-button").text("Go to Orders");
        $(".cancel-order-button").on("click", ()=>{this.router.navigate(["/orders"])})
      }, 2000);

    } else {
      alert("Please select a payment option.");
    }
  }

  navigateToHome() {
    this.router.navigate(["/"]);
  }
}
