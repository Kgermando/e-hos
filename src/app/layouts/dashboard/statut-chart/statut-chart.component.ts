import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FicheService } from '../../services/data/fiche.service';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-statut-chart',
  templateUrl: './statut-chart.component.html',
  styleUrls: ['./statut-chart.component.scss']
})
export class StatutChartComponent implements OnInit, AfterViewInit, OnDestroy {

  data = [];
  statutData = [];

  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService, private ficheService: FicheService) {
  }

  ngOnInit() {
    this.ficheService.getCollection$().subscribe((results) => {
      this.processData(results);
    });
  }

  processData(entries) {
    this.data = [];
    this.statutData = [];

    entries.forEach(element => {
      if (this.data[element.Statut]) {
        this.data[element.Statut] += 1;
      } else {
        this.data[element.Statut] = 1;
      }
    });
    // tslint:disable-next-line: forin
    for (const key in this.data) {
        const singleentry = {
          name: key,
          value: this.data[key]
        };
        this.statutData.push(singleentry);
      }
    }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.statutData, // Data for legende
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Statut',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: this.statutData, // Data for pie
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }


}
