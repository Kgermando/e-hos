import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, OnDestroy, AfterContentInit, AfterViewInit } from '@angular/core';
import { FicheService } from '../../services/data/fiche.service';
import { Fiche } from '../../services/models/fiche';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import * as jsPDF from 'jspdf';
import { DateFormatPipe } from '../../services/pipe/date-format.pipe';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private content: ElementRef,
              private ficheService: FicheService,
              public authService: AuthService) {}

  fiche: Fiche = {};

  downloadPDF() {
    console.log('Download here');
    const report = new jsPDF();

    const specialElementHeaders = {
      '#editor'(element , renderer) {
        return true;
      }
    };
    const content = this.content.nativeElement;
    report.fromHTML(content.innerHTML, 15, 15, {
      width: 150,
      elementHeaders: specialElementHeaders
    });
    report.save('Fiche.pdf');
  }

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;
    this.getDetails(id);
  }

  getDetails(id: string): void {
    this.ficheService.getOneFiche(id).subscribe(fi => {
      this.fiche = fi;
    });
  }


}
