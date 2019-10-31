import { Fiche } from './../../services/models/fiche';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { FicheService } from '../../services/data/fiche.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'FullName', 'Age', 'Sexe', 'Temperature', 'Poids', 'Statut', 'Created', 'detail'];
  dataSource;

  fiches: Fiche[] = null;

  getDataSubscription: Subscription;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private afs: AngularFirestore,
              private fichesServices: FicheService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    this.getfiches();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getfiches() {
    this.getDataSubscription = this.fichesServices.getCollection$().subscribe(res => {
      this.fiches = res;
      this.dataSource = new MatTableDataSource<Fiche>(this.fiches);
      this.dataSource.paginator = this.paginator;
      // tslint:disable-next-line: no-unused-expression
      this.getDataSubscription.unsubscribe;
    });
  }


  view(id) {
    this.router.navigate(['/layouts/view', id]);
  }

  edit(id) {
    this.router.navigate(['/layouts/edit', id]);
  }

}
