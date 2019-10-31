import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent},
      { path: 'logout', component: LogoutComponent},



      { path: '', redirectTo: 'login', pathMatch: 'full'}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
