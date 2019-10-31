import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbUserModule,
  NbLayoutModule,
  NbIconModule,
  NbCardModule
} from '@nebular/theme';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, LogoutComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,

    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAuthModule,
    NbIconModule,
    NbCardModule,
    NbLayoutModule,
    NbUserModule,

    NbAuthModule,
  ]
})
export class AuthModule { }
