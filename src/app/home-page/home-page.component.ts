import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserInfo } from '../types';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  user: UserInfo | null = null;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private http: HttpClient,

  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe(firebaseUser => {
      if(firebaseUser){
      this.user = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        lastSignInTime: firebaseUser.metadata.lastSignInTime || '',
        fullName: '',
        bio: '',
      }
      this.http.get<{fullName: string, bio: string}>(`/api/users/${firebaseUser.uid}`)
      .subscribe(userInfo => {
        this.user!.fullName = userInfo.fullName;
        this.user!.bio = userInfo.bio;
      })
    }
    })
  }
 
  logOut(): void {
    this.auth.signOut()
      .then(()=> this.router.navigateByUrl('/login'));
  }

}
