import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

import { Message } from '../../models/message.model';
import { Profile } from '../../models/profile.model';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {
  tweets: FirebaseListObservable<any[]>;

  newMessage: Message = new Message();
  errorMessage: string;
  tweeted: boolean = false;

  private profile: Profile = new Profile();
  private userId: string;

  constructor(private af: AngularFire) {
        this.tweets = af.database.list('/tweets');
        this.af.auth.subscribe(auth => {
                if (auth) {
                  this.getAuthenticatedProfile(auth);
                  this.userId = auth.uid;


                } else {
                  this.userId = null;
                }
        });
  }

  getAuthenticatedProfile(auth: any) {
    if (auth) {
      this.profile.userId = auth.uid;
    this.profile.displayName = auth.auth.displayName;
    this.profile.photoUrl = auth.auth.photoURL;
    this.profile.email = auth.auth.email;
  } else {
    this.profile = new Profile();
  }

  }

  ngOnInit() {
  }

  sendTweet() {
    if (this.newMessage.tweet) {
    this.newMessage.dateCreated = firebase.database.ServerValue.TIMESTAMP;
    this.newMessage.userId = this.userId ? this.userId : 'anonymous';
    this.newMessage.user = this.profile;

    this.tweeted = true;
    this.tweets.push(this.newMessage).then((result) => {
        this.tweeted = false;
        this.newMessage = new Message();
        this.errorMessage = null;
    })
    .catch(error => {
      this.tweeted = false;
      this.errorMessage = error.message;
    });
    }
  }
}
