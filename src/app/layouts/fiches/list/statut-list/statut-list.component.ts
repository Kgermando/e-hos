import { Component, OnInit, Input } from '@angular/core';
import { StatutService } from 'src/app/layouts/services/data/statut.service';

@Component({
  selector: 'app-statut-list',
  templateUrl: './statut-list.component.html',
  styleUrls: ['./statut-list.component.scss']
})
export class StatutListComponent implements OnInit {

  statut$;

  // tslint:disable-next-line: no-input-rename
  @Input('statut') statut;

  constructor(private statutService: StatutService) {
    this.statut$ = statutService.getCollection$();
  }

ngOnInit() {}


}
