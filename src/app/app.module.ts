import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbLayoutModule,
         NbSidebarModule,
         NbDatepickerModule,
         NbMenuModule,
         NbWindowModule,
         NbToastrModule,
         NbDialogModule,
         NbSpinnerModule,
         NbAlertModule,
         NbInputModule,
         NbChatModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from './@theme/theme.module';
import { CoreModule } from './@core/core.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2CompleterModule } from 'ng2-completer';
import { NbAuthService, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { AuthService } from './auth/services/auth.service';
import { FicheService } from './layouts/services/data/fiche.service';
import { UrgencesComponent } from './urgences/urgences.component';
import { NgxEchartsModule } from 'ngx-echarts';
// Ngx-Charts
import { NgxChartsModule } from '@swimlane/ngx-charts';


const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    UrgencesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule,
    NgxChartsModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    // Enable Offline Data in AngularFirestore
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features

    // NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,

    ThemeModule.forRoot(),
    Ng2SmartTableModule,
    Ng2CompleterModule,

    NbInputModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbSpinnerModule,
    NbAlertModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          // email is an alias we've assigned to the strategy so that we can dynamically mention it later
          name: 'email', // strategy id key.
        }),
      ],
      forms: {
        login: {
          redirectDelay: 0, // delay before redirect after a successful login, while success message is shown to the user
          redirect: {
            success: '/profile/',
            failure: null, // stay on the same page
          }
        },
        register: formSetting,
        requestPassword: formSetting,
        resetPassword: formSetting,
        logout: {
          redirectDelay: 0,
        },
      },
    }),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
  ],
  providers: [NbAuthService, AuthService, FicheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
