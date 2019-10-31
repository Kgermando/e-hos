import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    const user = await this.authService.getUser();
    // If it was falsey (e.g. 0, null, undefined, etc.), it will be false, otherwise, true.
    const loggedIn = !!user;
    if (!loggedIn) {
      console.log('access denied');
      this.router.navigate(['auth/login']);
    }
    return loggedIn; // returns true or false

  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return true;
    // return this.authService.isAuthenticated()
    // .pipe(
    //   tap(authenticated => {
    //     if (!authenticated) {
    //       // console.log('access denied')
    //       this.router.navigate(['auth/login']);
    //     }
    //   }),
    // ); // we just check the the value returned by isAuthenticated and simply redirect to the login page.
  }

}
