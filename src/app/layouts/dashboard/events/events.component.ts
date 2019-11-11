import { Component, OnInit, OnDestroy } from '@angular/core';
import { FicheService } from '../../services/data/fiche.service';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line: no-inferrable-types
  // chartdata: boolean = false;
  results = [];
  resultsData = [];

  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  xAxisLabel = 'Tranche d\'âges';
  yAxisLabel = 'Categorie d\'âges';
  colorScheme: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService, private ficheService: FicheService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });
  }

  ngOnInit() {
    this.ficheService.getCollection$().subscribe((results) => {
      // this.chartdata = true;
      this.processData(results);
    });
  }

  processData(entries) {
    this.results = [];
    this.resultsData = [];

    entries.forEach(element => {
      if (this.results[element.Age]) {
        this.results[element.Age] += 1;
      } else {
        this.results[element.Age] = 1;
      }
    });
    // tslint:disable-next-line: forin
    for (const key in this.results) {
        const singleentry = {
          name: key,
          value: this.results[key]
        };
        this.resultsData.push(singleentry);
      }
    }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
