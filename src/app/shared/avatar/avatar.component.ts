import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Output() onFileSelect: EventEmitter<any> = new EventEmitter<any>();
  userId: string;

  constructor(private af: AngularFire) {
      this.af.auth.subscribe(auth => {
          this.userId = auth ? auth.uid : null;
      });
   }

  ngOnInit() {
  }

  handleUpload(event: any, input:any): void {
        this.onFileSelect.emit(input.files[0]);
  }
}
