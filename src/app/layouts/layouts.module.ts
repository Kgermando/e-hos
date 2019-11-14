import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbSpinnerModule,
  NbAlertModule,
  NbInputModule,
  NbCalendarKitModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbChatModule,
  NbProgressBarModule,
  NbAccordionModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule,
  NbBadgeModule,
} from '@nebular/theme';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutsComponent } from './layouts.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbMenuModule } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './fiches/add/add.component';
import { EditComponent } from './fiches/edit/edit.component';
import { ViewComponent } from './fiches/view/view.component';
import { ListComponent } from './fiches/list/list.component';
import { PatientsComponent } from './patients/patients.component';
// import { MatTabsModule } from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChatComponent } from './chat/chat/chat.component';
import {
  MatButtonModule,
  MatIconModule,
 } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './dashboard/dashboard.component';

// Charts
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
// import { ChartModule } from 'angular2-chartjs';

import {NgxPaginationModule} from 'ngx-pagination';

import { SexeChartComponent } from './dashboard/sexe-chart/sexe-chart.component';
import { StatutChartComponent } from './dashboard/statut-chart/statut-chart.component';
import { NationChartComponent } from './dashboard/nation-chart/nation-chart.component';
import { EventsComponent } from './dashboard/events/events.component';
import { DepartementComponent } from './dashboard/departement/departement.component';
import { ExistComponent } from './fiches/exist/exist.component';
import { DateFormatPipe } from './services/pipe/date-format.pipe';
import { FicheUniqueComponent } from './medecine-interne/fiche-unique/fiche-unique.component';
import { LaboComponent } from './fiches/labo/labo.component';


@NgModule({
  declarations: [LayoutsComponent,
                 AddComponent,
                 EditComponent,
                 ViewComponent,
                 ListComponent,
                 PatientsComponent,
                 ChatComponent,
                 DashboardComponent,
                 SexeChartComponent,
                 StatutChartComponent,
                 NationChartComponent,
                 EventsComponent,
                 DepartementComponent,
                 ExistComponent,
                DateFormatPipe,
                FicheUniqueComponent,
                LaboComponent],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,

    NgxChartsModule,
    NgxEchartsModule,
    // ChartModule,


    ThemeModule,
    NbMenuModule,

    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbSpinnerModule,
    NbAlertModule,
    NbCalendarKitModule,
    NbCalendarModule,
    NbCalendarRangeModule,
    NbChatModule,
    NbProgressBarModule,
    NbTabsetModule,
    NbAccordionModule,
    NbListModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbBadgeModule,

    MatIconModule,
    MatButtonModule,
    LayoutModule
  ]
})
export class LayoutsModule { }
