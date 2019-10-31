import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FicheService } from '../../services/data/fiche.service';
import { Subscription } from 'rxjs';
import { Fiche } from '../../services/models/fiche';

@Component({
  selector: 'app-statut',
  templateUrl: './statut.component.html',
  styleUrls: ['./statut.component.scss']
})
export class StatutComponent implements OnInit {

  fiche: Fiche[] = [];
  filteredFiche: any[] = [];
  statut;
  subscription: Subscription;


  constructor(private ficheService: FicheService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.populateFiche();
  }

  private populateFiche() {
    this.ficheService.getCollection$().pipe(switchMap(stat => {
      this.fiche = stat;
      return this.route.queryParamMap;
    }))
      .subscribe(params => {
        this.statut = params.get('statut');
        this.applyFilter();
      });
  }


  private applyFilter() {
    this.filteredFiche = (this.statut) ?
    this.fiche.filter(p => p.Statut === this.statut) :
    this.fiche;
  }

  view(id) {
    this.router.navigate(['/layouts/view', id]);
  }


}
