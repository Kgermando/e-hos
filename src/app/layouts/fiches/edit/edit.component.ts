import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Fiche } from '../../services/models/fiche';
import { FicheService } from '../../services/data/fiche.service';
import { StatutService } from '../../services/data/statut.service';
import { ToasterConfig } from 'angular2-toaster';
import { NbGlobalPosition, NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  ficheFG: FormGroup;
  fiche: Fiche = {
    // id: '',
    // FullName: '',
    // Age: 0,
    // Sexe: '',
    // Poids: 0,
    // Temperature: '',
    // TensionArteriel: '',
    // Nation: '',
    // Adress: '',
    // Numero: '',
    Statut: '',
    // Medecin: '',
    // Departement: '',
    Consultation: '',
    ResultatExamen: '',
    ConseilMedecin: '',
    Autres: '',
    Prescription: '',
    Updated: new Date(),
    Created: null
  };

  updateFiche;
  statuts;

  nameFiche$;

  loading = false;

   // tslint:disable-next-line: no-inferrable-types
  // loading: boolean = false;
  // tslint:disable-next-line: no-inferrable-types
  errorMessage: string = '';
  // tslint:disable-next-line: no-inferrable-types
  success: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private statutServices: StatutService,
              private ficheService: FicheService,
              private toastrService: NbToastrService) {
    this.ficheFG = this.formBuilder.group({
      id: [''],
      // FullName: ['', Validators.required],
      // Age: [''],
      // Sexe: [''],
      // Poids: [''],
      // Temperature: [''],
      // TensionArteriel: [''],
      // Nation: [''],
      // Adress: [''],
      // Numero: [''],
      Statut: ['', Validators.required],
      // Medecin: [''],
      // Departement: [''],
      Consultation: [''],
      ResultatExamen: [''],
      ConseilMedecin: [''],
      Prescription: [''],
      Autres: [''],
    });
  }

  // Toast for confirmation
  config: ToasterConfig;

  index = 1;
  destroyByClick = true;
  duration = 8000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'success';

  title = 'Envoie Réussie!';
  content = `La fiche de consultation a été enregistrée avec succés!`;

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;
    this.getFiche(id);

    this.statutServices.getCollection$().subscribe(stat => {
      this.statuts = stat;
    });

    this.ficheService.getCollection$().subscribe(nameFiche => {
      this.nameFiche$ = nameFiche;
    });
  }

  setFicheData(value) {
    // this.updateFiche.FullName = value.FullName;
    // this.updateFiche.Age = value.Age;
    // this.updateFiche.Sexe = value.Sexe;
    // this.updateFiche.Poids = value.Poids;
    // this.updateFiche.Temperature = value.Temperature;
    // this.updateFiche.TensionArteriel = value.TensionArteriel;
    // this.updateFiche.Nation = value.Nation;
    // this.updateFiche.Adress = value.Adress;
    // this.updateFiche.Numero = value.Numero;
    this.updateFiche.Statut = value.Statut;
    // this.updateFiche.Medecin = value.Medecin;
    // this.updateFiche.Departement = value.Departement;
    this.updateFiche.Consultation = value.Consultation;
    this.updateFiche.ResultatExamen = value.ResultatExamen;
    this.updateFiche.ConseilMedecin = value.ConseilMedecin;
    this.updateFiche.Autres = value.Autres;
    this.updateFiche.Prescription = value.Prescription;
  }

  getFiche(id) {
      this.ficheService.getCollection$(ref => ref.where('id', '==' , id)).subscribe(fiches => {
        // this.loading = false;
        this.updateFiche = fiches[0];

        this.ficheFG.patchValue({
          // FullName: this.updateFiche.FullName,
          // Age: this.updateFiche.Age,
          // Sexe: this.updateFiche.Sexe,
          // Poids: this.updateFiche.Poids,
          // Temperature: this.updateFiche.Temperature,
          // TensionArteriel: this.updateFiche.FullName,
          // Nation: this.updateFiche.Nation,
          // Adress: this.updateFiche.Adress,
          // Numero: this.updateFiche.Numero,
          Statut: this.updateFiche.Statut,
          // Medecin: this.updateFiche.Medecin,
          // Departement: this.updateFiche.Departement,
          Consultation: this.updateFiche.Consultation,
          ResultatExamen: this.updateFiche.ResultatExamen,
          ConseilMedecin: this.updateFiche.ConseilMedecin,
          Autres: this.updateFiche.Autres,
          Prescription: this.updateFiche.Prescription,
        });

    }, err => {
      // this.loading = false;
      this.errorMessage = err;
    });
  }

  update() {
    if (this.ficheFG.valid) {
      // this.loading = true;
      this.setFicheData(this.ficheFG.value);

      this.ficheService.update(this.updateFiche).then(res => {
        this.router.navigateByUrl('/layouts/medical');
        // this.loading = false;
        console.log('Fiches Mis à jour!');
      }).then((res => {
        console.log(res);
        this.makeToast();
        console.log('Fiche Consultation enregistrée!');
      }));
    } else {
      this.markFormGroupTouched(this.ficheFG);
    }

  }

  FullNameValidate() {
    const control = this.ficheFG.get('FullName');
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  statutValidate() {
    const control = this.ficheFG.get('Statut');
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  markFormGroupTouched(formGroup: FormGroup) {
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    (<any> Object).values(formGroup.controls).forEach(control => {
      if (control.controls) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

   toggleLoadingAnimation() {
      this.loading = true;
      setTimeout(() => this.loading = false, 3000);
    }

    makeToast() {
      this.showToast(this.status, this.title, this.content);
    }

  private showToast(type: NbComponentStatus, title: string, body: string) {
      const config = {
        status: type,
        destroyByClick: this.destroyByClick,
        duration: this.duration,
        hasIcon: this.hasIcon,
        position: this.position,
        preventDuplicates: this.preventDuplicates,
      };
      const titleContent = title ? `. ${title}` : '';

      this.index += 1;
      this.toastrService.show(
        body,
        `${titleContent}`,
        config);
    }

}
