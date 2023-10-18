import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  currentlyViewing: number = 0;
  switchScreen(ind: number) {
    this.currentlyViewing = ind;
  }
}
