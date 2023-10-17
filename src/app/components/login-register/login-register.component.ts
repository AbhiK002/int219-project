import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})

export class LoginRegisterComponent {
  isRegistering: boolean = false;

  constructor(private router: Router) {
    // constructor logic
  }  

  switchLoginRegister() {
    this.isRegistering = !this.isRegistering;
  }

  login(): void {
    alert("Logged In!");
    this.router.navigate(['/']);
  }

  register(): void {
    alert("Registered!");
    this.router.navigate(['/']);
  }
}
