import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsComponent } from './layouts.component';
import { AddComponent } from './fiches/add/add.component';
import { EditComponent } from './fiches/edit/edit.component';
import { ViewComponent } from './fiches/view/view.component';
import { ListComponent } from './fiches/list/list.component';
import { PatientsComponent } from './patients/patients.component';
import { ChatComponent } from './chat/chat/chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FicheUniqueComponent } from './medecine-interne/fiche-unique/fiche-unique.component';

const routes: Routes = [
  { path: '', component: LayoutsComponent, children: [
    { path: 'add', component: AddComponent },
    { path: 'edit/:id', component: EditComponent },
    { path: 'view/:id', component: ViewComponent },
    { path: 'list', component: ListComponent },
    { path: 'medical', component: PatientsComponent },
    { path: 'chat', component: ChatComponent},
    { path: 'welcome', component: DashboardComponent },
    { path: 'fiche-unique', component: FicheUniqueComponent},


    { path: '', redirectTo: 'welcome', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
