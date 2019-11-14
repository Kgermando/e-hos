import { ChangeDetectionStrategy, Component, OnInit, PipeTransform } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { FicheService } from '../../services/data/fiche.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { Fiche } from '../../services/models/fiche';
import { ExcelService } from '../../services/data/excel.service';


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
  selector: 'app-fiche-unique',
  templateUrl: './fiche-unique.component.html',
  styleUrls: ['./fiche-unique.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe]
})
export class FicheUniqueComponent implements OnInit {

  fiche$: Observable<Fiche[]>;

  filter = new FormControl('');

  fiches;

  // tslint:disable-next-line: no-inferrable-types
  p: number = 1;

  constructor(private fichesServices: FicheService,
              private excelService: ExcelService,
              pipe: DecimalPipe,
              private router: Router) {

                this.fiche$ = this.filter.valueChanges.pipe(
                  startWith(''),
                  map(text => search(text, pipe))
                );

  }

  ngOnInit() {
    this.getfiches();
  }


  getfiches() {
    this.fichesServices.getCollection$().subscribe(res => {
      this.fiches = res;
    });
  }

  view(id) {
    this.router.navigate(['/layouts/view', id]);
  }

  edit(id) {
    this.router.navigate(['/layouts/edit', id]);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.fiches, 'sample');
  }

}
