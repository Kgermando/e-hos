import { Component, OnInit } from '@angular/core';
import { FicheService } from '../../services/data/fiche.service';
import { Fiche } from '../../services/models/fiche';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {


  constructor(private route: ActivatedRoute,
              private ficheService: FicheService,
              public authService: AuthService) { }

  public fiche: Fiche = {};

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
