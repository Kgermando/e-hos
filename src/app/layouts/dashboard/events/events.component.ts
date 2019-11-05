import { Component, OnInit } from '@angular/core';
import { FicheService } from '../../services/data/fiche.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  // tslint:disable-next-line: no-inferrable-types
  chartdata: boolean = false;

  ratingsCount = [];
  ratingData = [];
  totalCount = 0;
  actualRating;

  xAxisLabel = 'Tranche d\'âges';
  yAxisLabel = 'Categorie d\'âges';

  // Chart
  view: any[] = [500, 300];
  showLegend = true;

  colorScheme = {
    domain: ['#FFA001', '#24BFA5', '#A10A28', '#AAAAAA' ]
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
   this.ratingData = [];
   this.ratingsCount = [];
   this.totalCount = 0;

   entries.forEach(element => {
     if (this.ratingsCount[element.Age]) {
       this.ratingsCount[element.Age] += 1;
     } else {
       this.ratingsCount[element.Age] = 1;
     }
   });

   // tslint:disable-next-line: forin
   for (const key in this.ratingsCount) {
       const singleentry = {
         name: key + ' ans',
         value: this.ratingsCount[key]
       };
       this.ratingData.push(singleentry);
     }

   for (const key in this.ratingsCount) {
     if (key === '80') {
       this.totalCount += this.ratingsCount[key] * 1;
     } else if (key === '50') {
       this.totalCount += this.ratingsCount[key] * 1;
     } else if (key === '33') {
       this.totalCount += this.ratingsCount[key] * 1;
     } else if (key === '20') {
       this.totalCount += this.ratingsCount[key] * 1;
     } else if (key === '10') {
       this.totalCount += this.ratingsCount[key] * 1;
     } else if (key === '5') {
       this.totalCount += this.ratingsCount[key] * 1;
     } else {
       this.totalCount += this.ratingsCount[key];
}
   }
   this.actualRating = (this.totalCount / entries.length).toFixed(2);

 }


}
