import { Component } from '@angular/core';
import * as $ from 'jquery';

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

  globNotifs = true;
  globNotifs2 = true;
  toggleGlob() {
    this.globNotifs = !this.globNotifs;
  }
  toggleGlob2() {
    this.globNotifs2 = !this.globNotifs2;
  }
  resetChecks() {
    $(".preference-item .check").prop("checked", false);
  }
}
