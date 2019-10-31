import { Component, OnInit, Input } from '@angular/core';
import { StatutService } from 'src/app/layouts/services/data/statut.service';

@Component({
  selector: 'app-statut-filter',
  templateUrl: './statut-filter.component.html',
  styleUrls: ['./statut-filter.component.scss']
})
export class StatutFilterComponent implements OnInit {

  statut$;

  // tslint:disable-next-line: no-input-rename
  @Input('statut') statut;

  constructor(statutService: StatutService) {
    this.statut$ = statutService.getCollection$();

  }

  ngOnInit() {
  }

}
