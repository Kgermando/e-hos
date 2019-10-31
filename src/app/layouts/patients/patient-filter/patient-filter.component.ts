import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-patient-filter',
  templateUrl: './patient-filter.component.html',
  styleUrls: ['./patient-filter.component.scss']
})
export class PatientFilterComponent implements OnInit {

  Medecin$;

  // tslint:disable-next-line: no-input-rename
  @Input('Medecin') Medecin;

  constructor(public authService: AuthService) {
    // this.user$ = this.authService.getUser();
  }

  ngOnInit() {
  }

}
