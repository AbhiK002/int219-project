import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  constructor(private http: HttpClient) {};
  products: any = [];
  orders: any = [0, 7, 14, 34];
  orderStatus: String[] = ["Arriving in 3 days", "Out for Delivery", "Arriving in 2 days", "Dispatched"];

  shuffleArray(array: Object[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  ngOnInit(): void {
    this.http.get("/assets/products.json").subscribe((res: any) => {
      let temp: any = res;
      for (let i=0; i<this.orders.length; i++) {
        this.orders[i] = temp[this.orders[i] % temp.length]
        this.orders[i].status = this.orderStatus[i];
      }

      this.shuffleArray(temp);
      for (let i=0; i<9; i++) {
        this.products.push(temp[i]);
      }
    })
  }
}
