import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { MdDialog } from '@angular/material';
import { LoginComponent } from './users/login/login.component';
import { Profile } from './models/profile.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userId: string;
  profile: Profile = new Profile();

  constructor(private af: AngularFire, private dialog: MdDialog) {

    this.af.auth.subscribe(auth => {
        this.userId = auth ? auth.uid : null;

        if (this.profile && auth) {
          this.profile.userId = auth.uid;
          this.profile.displayName = auth.auth.displayName;
          this.profile.photoUrl = auth.auth.photoURL;
          this.profile.email = auth.auth.email;
        }
    });
  }

  login() {
    this.dialog.open(LoginComponent, {
      width: '500px'
      });
  }

  logout() {
    this.af.auth.logout();
  }
}
