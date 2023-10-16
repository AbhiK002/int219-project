import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})

export class LoginRegisterComponent {
  login(): void {
    console.log("Logged In!");
    
  }

  register(): void {
    console.log("Registered!");
    
  }
}
