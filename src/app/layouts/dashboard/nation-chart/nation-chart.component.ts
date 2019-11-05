import { Component, OnInit } from '@angular/core';
import { FicheService } from '../../services/data/fiche.service';

@Component({
  selector: 'app-nation-chart',
  templateUrl: './nation-chart.component.html',
  styleUrls: ['./nation-chart.component.scss']
})
export class NationChartComponent implements OnInit {

  // tslint:disable-next-line: no-inferrable-types
  chartdata: boolean = false;

  countryCount = [];
  countryData = [];

  // Chart
  view: any[] = [500, 300];
  showLegend = true;

  colorScheme = {
    domain: ['#012456', '#43A18E', '#0097FB', '#C7B42C', '#40235D', '#A10A28',
             '#084241', '#074105', '#BD9C24', '#B85E21', '#E91427', '#F8C89A']
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
      if (this.countryCount[element.Nation]) {
        this.countryCount[element.Nation] += 1;
      } else {
        this.countryCount[element.Nation] = 1;
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
