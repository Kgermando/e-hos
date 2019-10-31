import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';
import { UrgencesComponent } from './urgences/urgences.component';


const routes: Routes = [
  { path: 'layouts', loadChildren: () => import('../app/layouts/layouts.module').then(m => m.LayoutsModule),
      canActivate: [AuthGuard]},
  { path: 'auth', loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule)},


  { path: 'urgences', component: UrgencesComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  { path: '**', redirectTo: 'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
