import { Component, OnInit } from '@angular/core';
import { FicheService } from '../../services/data/fiche.service';

@Component({
  selector: 'app-sexe-chart',
  templateUrl: './sexe-chart.component.html',
  styleUrls: ['./sexe-chart.component.scss']
})
export class SexeChartComponent implements OnInit {

  // tslint:disable-next-line: no-inferrable-types
  chartdata: boolean = false;

  countryCount = [];
  countryData = [];

  // Chart
  view: any[] = [500, 300];
  showLegend = true;

  colorScheme = {
    domain: ['#012456', '#E91427', '#C7B42C', '#A10A28']
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
      if (this.countryCount[element.Sexe]) {
        this.countryCount[element.Sexe] += 1;
      } else {
        this.countryCount[element.Sexe] = 1;
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
