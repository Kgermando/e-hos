import { Component, OnInit } from '@angular/core';
import { FicheService } from '../../services/data/fiche.service';

@Component({
  selector: 'app-statut-chart',
  templateUrl: './statut-chart.component.html',
  styleUrls: ['./statut-chart.component.scss']
})
export class StatutChartComponent implements OnInit {

  // tslint:disable-next-line: no-inferrable-types
  chartdata: boolean = false;

  countryCount = [];
  countryData = [];

  // Chart
  view: any[] = [500, 300];
  showLegend = true;

  colorScheme = {
    domain: ['#24BFA5', '#A10A28', '#FFA001', '#AAAAAA' ]
  };
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor(private ficheService: FicheService) { }

  ngOnInit() {
    this.ficheService.getCollection$().subscribe((results) => {
      this.chartdata = true;
      this.processData(results);
    });
  }

  onSelect(event) {
    console.log(event);
  }

  processData(entries) {
    this.countryCount = [];
    this.countryData = [];

    entries.forEach(element => {
      if (this.countryCount[element.Statut]) {
        this.countryCount[element.Statut] += 1;
      } else {
        this.countryCount[element.Statut] = 1;
      }
    });
    // tslint:disable-next-line: forin
    for (const key in this.countryCount) {
        const singleentry = {
          name: key,
          value: this.countryCount[key]
        };
        this.countryData.push(singleentry);
      }
    }

}
