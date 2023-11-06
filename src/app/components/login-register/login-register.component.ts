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

  validateForm() {
    const emailField = $('#loginEmail').val()?.toLocaleString().trim();
    const passField = $('#loginPassword').val()?.toLocaleString().trim();
    const cPassField = $('#loginConfirmPassword').val()?.toLocaleString().trim();

    if (!emailField || emailField.length == 0) {
      alert("Please fill the Email first");
      return false;
    }
    if (!passField || passField.length == 0) {
      alert("Please fill the Password");
      return false;
    }
    if (this.isRegistering && (!cPassField || cPassField.length == 0)) {
      alert("Please confirmt the password");
      return false;
    }

    if (!emailField.match(/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/)) {
      alert("Invalid email");
      return false;
    }
    if (passField.length < 6) {
      alert("Password should contain at least 6 characters");
      return false;
    }
    if (this.isRegistering && cPassField !== passField) {
      alert("Confirm password doesn't match the entered password");
      return false;
    }

    return true;
  }

  login(): void {
    if (!this.validateForm()) return;
    alert("Logged In!");
    this.router.navigate(['/']);
  }

  register(): void {
    if (!this.validateForm()) return;
    alert("Registered!");
    this.router.navigate(['/']);
  }
}
