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
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { StatutComponent } from './fiches/statut/statut.component';
import { PatientFilterComponent } from './patients/patient-filter/patient-filter.component';
import { PatientsComponent } from './patients/patients.component';
import { StatutFilterComponent } from './fiches/statut/statut-filter/statut-filter.component';
import { StatutListComponent } from './fiches/list/statut-list/statut-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChatComponent } from './chat/chat/chat.component';
import { TimestampPipe } from './services/pipes/timestamp.pipe';
import { MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatInputModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressSpinnerModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SexeChartComponent } from './dashboard/sexe-chart/sexe-chart.component';
import { StatutChartComponent } from './dashboard/statut-chart/statut-chart.component';
import { NationChartComponent } from './dashboard/nation-chart/nation-chart.component';
import { EventsComponent } from './dashboard/events/events.component';
import { DepartementComponent } from './dashboard/departement/departement.component';
import { ExistComponent } from './fiches/exist/exist.component';
import { NgxNotificationComponent } from 'ngx-notification';


@NgModule({
  declarations: [LayoutsComponent,
                 AddComponent,
                 EditComponent,
                 ViewComponent,
                 ListComponent,
                 StatutComponent,
                 PatientFilterComponent,
                 PatientsComponent,
                 StatutFilterComponent,
                 StatutListComponent,
                 ChatComponent,
                 TimestampPipe,
                 DashboardComponent,
                 SexeChartComponent,
                 StatutChartComponent,
                 NationChartComponent,
                 EventsComponent,
                 DepartementComponent,
                 NgxNotificationComponent,
                 ExistComponent],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,

    NgxChartsModule,

    MatTabsModule,
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
    Ng2SmartTableModule,
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

    MatTableModule,
    LayoutModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatProgressBarModule,
    MatListModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatCheckboxModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class LayoutsModule { }
