import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FicheService } from 'src/app/layouts/services/data/fiche.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngx-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Claire',
    },
    {
      value: 'dark',
      name: 'Sombre',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [
    {
      title: 'Profile',
      icon: 'person-outline',
      link: ['/layouts/medical'],
    },
    {
      title: 'Déconnexion',
      icon: 'unlock-outline',
      link: ['/auth/logout'],
    },
  ];

  // For search typeahead
  displayBar: boolean;
  searchTerm: string;
  startAt: BehaviorSubject<string | null> = new BehaviorSubject('');
  endAt: BehaviorSubject<string | null> = new BehaviorSubject('\uf8ff');
  fiche;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              public authService: AuthService,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private ficheService: FicheService ) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => this.user = users.lee);

    // this.authService.getUser().subscribe(users => {
    //   this.user = users;
    // })

    // Type Search typeahead
    this.ficheService.searchByTitle(this.startAt)
            .subscribe(fiche => this.fiche = fiche);
    this.displayBar = true;


    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }


   // Type Search typeahead
  search($event): void {
    const q = $event.target.value;
    if (q !== '') {
        this.startAt.next(q);
    } else {
        this.fiche = [];
    }
    this.displayBar = true;
  }

   // Type Search typeahead
  hideSuggestionBar(): void {
      this.displayBar = false;
  }

  view(id) {
    this.router.navigate(['/layouts/view', id]);
  }
}
