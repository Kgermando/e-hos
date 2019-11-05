import { Component, OnInit } from '@angular/core';
import { FicheService } from '../../services/data/fiche.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {

    // tslint:disable-next-line: no-inferrable-types
    chartdata: boolean = false;

    countryCount = [];
    countryData = [];

    // Chart
    view: any[] = [500, 300];
    showLegend = true;

    colorScheme = {
      domain: ['#DF4E4F', '#BD57F1', '#1D3F41', '#0667CA', '#333333']
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
        if (this.countryCount[element.Departement]) {
          this.countryCount[element.Departement] += 1;
        } else {
          this.countryCount[element.Departement] = 1;
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
