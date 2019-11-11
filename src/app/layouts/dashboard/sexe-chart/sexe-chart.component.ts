import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FicheService } from '../../services/data/fiche.service';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-sexe-chart',
  templateUrl: './sexe-chart.component.html',
  styleUrls: ['./sexe-chart.component.scss']
})
export class SexeChartComponent implements OnInit, AfterViewInit, OnDestroy {

  data = [];
  sexeData = [];

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
    this.sexeData = [];

    entries.forEach(element => {
      if (this.data[element.Sexe]) {
        this.data[element.Sexe] += 1;
      } else {
        this.data[element.Sexe] = 1;
      }
    });
    // tslint:disable-next-line: forin
    for (const key in this.data) {
        const singleentry = {
          name: key,
          value: this.data[key]
        };
        this.sexeData.push(singleentry);
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
          data: this.sexeData, // Data for legende
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Sexe',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: this.sexeData, // Data for pie
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
