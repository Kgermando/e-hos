import { Component, OnInit, Input } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Fiche } from '../services/models/fiche';
import { FicheService } from '../services/data/fiche.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  // fiche: Fiche[] = [];
  // filteredFiche: any[] = [];

  user;
  Medecin;
  subscription: Subscription;


  constructor(private ficheService: FicheService,
              public authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.populateFiche();
    // this.auth();
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
