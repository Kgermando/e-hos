import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbRegisterComponent, NbAuthService, NB_AUTH_OPTIONS, getDeepFromObject } from '@nebular/auth';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

import { User } from 'firebase/app';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends NbRegisterComponent implements OnInit {

  user$: Observable<User>;
  errorMessage: string;
  validation = {};

  constructor(
    public nbAuth: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) public options: {},
    public cd: ChangeDetectorRef,
    public router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private authService: AuthService) {

      super(nbAuth, options, cd, router);

    // Get the auth state, then fetch the Firestore user document or return null
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
            // Logged in
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            // Logged out
            return of(null);
          }
        })
      );

      this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
      this.showMessages = this.getConfigValue('forms.register.showMessages');
      this.socialLinks = this.getConfigValue('forms.register.socialLinks');

      this.validation = this.getConfigValue('forms.validation');
    }

  ngOnInit() { }

  register(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.authService.register(this.user.email, this.user.password, this.user.fullName)
      .then(() => {
        this.submitted = false;
        this.messages = [];

        this.redirectToDashboard();
      })
      .catch((err) => {
        this.submitted = false;
        this.errors = [err];
      });
  }

    // Sign in with Google provider
  async signinWithGoogle() {
    await this.authService.googleSignin();
  }

  redirectToDashboard() {
    setTimeout(() => {
      this.router.navigate(['/layouts']);
    }, this.redirectDelay);
  }

  // getConfigValue(key: string): any {
  //   return getDeepFromObject(key, null);
  // }


}

