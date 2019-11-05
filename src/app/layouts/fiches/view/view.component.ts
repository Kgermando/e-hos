import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, OnDestroy, AfterContentInit, AfterViewInit } from '@angular/core';
import { FicheService } from '../../services/data/fiche.service';
import { Fiche } from '../../services/models/fiche';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
// import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  @ViewChild('pdfcontent', {static: false}) pdfcontent: ElementRef;

  constructor(private route: ActivatedRoute,
              private ficheService: FicheService,
              public authService: AuthService) {}

  fiche: Fiche = {};

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;
    this.getDetails(id);
  }

  getDetails(id: string): void {
    this.ficheService.getOneFiche(id).subscribe(fi => {
      this.fiche = fi;
    });
  }

 public downloadpdf() {
    // Download html to PDF
    const doc = new jspdf();
    const content = this.pdfcontent.nativeElement;
    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      // Few necessary setting options
      const imgWidth = 250;
      const pageHeight = 320;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      // tslint:disable-next-line: no-shadowed-variable
      const doc = new jspdf('p', 'mm');
      let heightLeft = imgHeight;
      let position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      // Generated PDF
      doc.save('fiche' + '.pdf');
    });
  }


}
