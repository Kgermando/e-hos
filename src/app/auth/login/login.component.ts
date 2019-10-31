import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent implements OnInit {

  errorMessage: string;

  constructor(
    public nbAuth: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) public options: {},
    public cd: ChangeDetectorRef,
    public router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private authService: AuthService) {

      super(nbAuth, options, cd, router);

     }

  ngOnInit() { }

  /* istanbul ignore next */
  async login(): Promise<any> {
    // AngularFire2 login here
    try {
      await this.authService.emailLogin(this.user.email, this.user.password, this.user.rememberMe);
      this.router.navigate(['/layouts/dashboard']);
    } catch (error) {
      await this.handleError(error);
      this.errorMessage = 'Failed to login this email with password!';
      console.log(this.errorMessage);
    }
  }

      // Sign in with Google provider
    async signinWithGoogle() {
        await this.authService.googleSignin();
      }

  // If error, console log and notify user
  private handleError(error: firebase.auth.Error) {
    console.error(error);
    // this.notify.update(error.message, 'error');
    const errorCode = error.code;
    const errorMessage = error.message;

    if (errorCode === 'auth/email-already-in-use') {
      console.error('There already exists an account with the given email address.');
    } else if (errorCode === 'auth/invalid-email') {
      console.error('The email address is not valid.');
    } else if (errorCode === 'auth/operation-not-allowed') {
      console.error('The email/password accounts are not enabled.');
    } else if (errorCode === 'auth/weak-password') {
      console.error('The password is not strong enough.');
    } else {
      console.error(errorMessage);
    }
    console.log(error);
  }
}
