import { Component, OnInit, PipeTransform } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Fiche } from '../services/models/fiche';
import { FicheService } from '../services/data/fiche.service';
import { DecimalPipe } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

const FICHES: Fiche[] = [];

function search(text: string, pipe: PipeTransform): Fiche[] {
  return FICHES.filter(fich => {
    const term = text.toLowerCase();
    return fich.FullName.toLowerCase().includes(term)
        || pipe.transform(fich.Age).includes(term)
        || pipe.transform(fich.Statut).includes(term)
        || pipe.transform(fich.Sexe).includes(term)
        || pipe.transform(fich.Temperature).includes(term);
  });
}

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  providers: [DecimalPipe]
})
export class PatientsComponent implements OnInit {

  // fiche: Fiche[] = [];
  // filteredFiche: any[] = [];

  user;
  Medecin;
  subscription: Subscription;

  fiche$: Observable<Fiche[]>;

  filter = new FormControl('');

  fiches;

  // tslint:disable-next-line: no-inferrable-types
  p: number = 1;


  constructor(private ficheService: FicheService,
              public authService: AuthService,
              private route: ActivatedRoute,
              pipe: DecimalPipe,
              private router: Router) {
                this.fiche$ = this.filter.valueChanges.pipe(
                  startWith(''),
                  map(text => search(text, pipe))
                );

               }

  ngOnInit() {
    this.populateFiche();
    this.getfiches();
    // this.auth();
  }

  getfiches() {
    this.ficheService.getCollection$().subscribe(res => {
      this.fiches = res;
    });
  }

  private populateFiche() {
    this.ficheService.getCollection$().subscribe(data => {
      this.Medecin = data;
    });
  }

  // Get User for Auth
  // private auth() {
  //   this.authService.user$.subscribe(user => {
  //     this.user = user.displayName;
  //   });
  // }

  // private populateFichee() {
  //   this.ficheService.getCollection$().pipe(switchMap(fich => {
  //     this.fiche = fich;
  //     return this.route.queryParamMap;
  //   }))
  //     .subscribe(params => {
  //       this.Medecin = params.get('Medecin');
  //       this.applyFilter();
  //     });
  // }


  // private applyFilter() {
  //   this.filteredFiche = (this.Medecin) ?
  //   this.fiche.filter(p => p.Medecin === this.Medecin) :
  //   this.fiche;
  // }


  view(id) {
    this.router.navigate(['/layouts/view', id]);
  }

  edit(id) {
    this.router.navigate(['/layouts/edit', id]);
  }

  delete(id) {
    const confirmation = confirm('Vous êtes sûr de vouloir supprimer cette Fiche ?');
    if (confirmation) {
      this.ficheService.remove(id).then(res => {
        console.log('Fiche successfully deleted');
      });
    }
  }

}
