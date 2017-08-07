import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { MdDialogRef, MdDialog } from '@angular/material';
import * as firebase from 'firebase';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errorMessage: string;
  user: User = new User();
  profileFile: any;
  userId: string;

  constructor(private af: AngularFire, private dialogRef: MdDialogRef<RegisterComponent>) {
      this.af.auth.subscribe(auth => {
          if (auth) {
            this.dialogRef.close();
            this.userId = auth.uid;

            let userData = this.user;
            delete userData.password;
            userData.dateCreated = firebase.database.ServerValue.TIMESTAMP;
            this.createUserWithObject(userData, auth);
      }
  });
}

  ngOnInit() {
  }

  onRegister() {
    if (!this.user.firstName || !this.user.lastName || !this.user.email || !this.user.password
       || !this.profileFile || !this.validateEmail(this.user.email)) {
      this.errorMessage = 'All fields and a valid email are required!';
      return;
    }
    let credentials = {
      email: this.user.email,
      password: this.user.password
    };
    this.af.auth.createUser(credentials);
  }

  validateEmail(email: string) {
  const regPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regPattern.test(email);
}

  onSelectProfilePicture(inputFile) {
      this.profileFile = inputFile;
  }

  createUserWithObject(data: User, auth: any) {
    let file = this.profileFile;
    let userId = auth.uid;
    const user = this.af.database.object('/users/' + userId);

    if (file) {
      const storageRef = firebase.storage().ref('/profiles').child(userId).child(file.name);
      storageRef.put(file).then(snapshot => {
        data.avatar = snapshot.downloadURL;
        user.set(data);

        //update profile
        let profileData = {
          displayName: data.firstName + ' ' + data.lastName,
          photoURL: data.avatar
        };
        auth.auth.updateProfile(profileData).then( () => {
            console.info('auth profile data has been updated');
        })
        .catch(err => {
            console.error('error updating profile ', err);
        });

      })
      .catch(err => {
        console.error('error uploading profile image ', err);
      });

    } else {
      user.set(data);
    }
  }
}
