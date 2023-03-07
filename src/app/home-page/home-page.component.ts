import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(
    private auth: AngularFireAuth,
    private router: Router,

  ) { }
 
  logOut(): void {
    this.auth.signOut()
      .then(()=> this.router.navigateByUrl('/login'));
  }

}
