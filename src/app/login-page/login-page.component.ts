import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  errorMessageMap: { [x: string]: string; } = {
    'auth/wrong-password': 'The password you entered is not correct',
    'auth/invalid-email': 'Please enter a valid email address',
    'auth/user-not-found': 'There is no account with that email',
    'auth/internal-error': 'Uh oh! Something went wrong. Please check your inputs and try again',
  };

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
  ){ }

  logIn(): void{
    this.auth.signInWithEmailAndPassword(this.email, this.password)
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
