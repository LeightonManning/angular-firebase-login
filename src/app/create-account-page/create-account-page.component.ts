import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.css']
})
export class CreateAccountPageComponent {
  email: string ='';
  password: string ='';
  confirmPassword: string ='';
  error: string = '';

  errorMessageMap: { [x: string]: string; } = {
    'auth/email-already-in-use': 'An account with that email already exists',
    'auth/invalid-email': 'Please enter a valid email address',
    'auth/internal-error': 'Uh oh! Something went wrong. Please check your inputs and try again',
  };

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
  ){ }

  createAccount() {
    if (this.password !== this.confirmPassword) {
      this.error = 'The passwords you entered do not match'
    }

    this.auth.createUserWithEmailAndPassword(this.email, this.password)
    .then(() => this.router.navigateByUrl('/'))
    .catch(error => {
      for(let errorType of Object.keys(this.errorMessageMap)){
        if (error.message.includes(errorType)) {
          this.error = this.errorMessageMap[errorType];
          break;
        }
      }
    });
  }

}
