import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import { AppComponent } from './app.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { environment } from '../environments/environment';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { AvatarComponent } from './shared/avatar/avatar.component';
import { TweetsComponent } from './messages/tweets/tweets.component';

const fbAuthConfig = {
	provider: AuthProviders.Google,
	method: AuthMethods.Password
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AvatarComponent,
    TweetsComponent
  ],
  entryComponents: [ LoginComponent, RegisterComponent ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, fbAuthConfig),
    HttpModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
