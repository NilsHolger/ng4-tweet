import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { MdDialogRef, MdDialog } from '@angular/material';
import { RegisterComponent } from '../register/register.component';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user: User = new User();
  errorMessage: string;

  constructor(private af: AngularFire,
    private dialogRef: MdDialogRef<LoginComponent>, private dialog: MdDialog) {
    this.af.auth.subscribe(auth => {
        if (auth) {
          this.dialogRef.close();
        }
    });
  }

  onLogin() {
    if (!this.user.email || !this.user.password) {
      this.errorMessage = 'Email and password are required!';
      return;
    }
    let credentials = {
      email: this.user.email,
      password: this.user.password
    };
    this.af.auth.login(credentials).catch(error => {
      this.errorMessage = error.message;
    });
  }

  register() {
      this.dialogRef.close();
      this.dialog.open(RegisterComponent, {
          width: '500px'
      });
  }

}
