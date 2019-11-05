import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FicheService } from '../../services/data/fiche.service';
import { Fiche } from '../../services/models/fiche';
import { StatutService } from '../../services/data/statut.service';
import { DepartementService } from '../../services/data/departement.service';
import { UsersService } from '../../services/data/users.service';
import { ToasterConfig } from 'angular2-toaster';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  nationalite: any = [
    'Afrique du Sud', 'Algérie', 'Angola', 'Bénin', 'Botswana', 'Burkina', 'Burundi', 'Cameroun', 'Cap-Vert',
    'République centrafricaine', 'Comores', 'Congo', 'République démocratique du Congo', 'Côte d\'Ivoire', 'Djibouti',
    'Égypte', 'Érythrée', 'Éthiopie', 'Gabon', 'Gambie', 'Ghana', 'Guinée', 'Guinée-Bissau', 'Guinée équatoriale',
    'Kenya', 'Lesotho', 'Libéria', 'Libye', 'Madagascar', 'Malawi', 'Mali', 'Maroc', 'Maurice', 'Mauritanie', 'Mozambique', 'Namibie',
    'Niger',  'Nigeria', 'Ouganda', 'Rwanda', 'Sao Tomé-et-Principe', 'Sénégal', 'Seychelles', 'Sierra Leone', 'Somalie', 'Soudan',
    'Sud-Soudan', 'Swaziland', 'Tanzanie', 'Tchad', 'Togo', 'Tunisie', 'Zambie', 'Zimbabwe',

    'Antigua-et-Barbuda', 'Argentine', 'Bahamas', 'Barbade', 'Belize', 'Bolivie', 'Brésil', 'Canada', 'Chili', 'Colombie',
    'Costa Rica', 'Cuba', 'République dominicaine', 'Dominique', 'Equateur', 'Etats-Unis', 'Grenade', 'Guatemala', 'Guyana',
    'Haïti', 'Honduras', 'Jamaïque', 'Mexique', 'Nicaragua', 'Panama', 'Paraguay', 'Pérou', 'Porto Rico', 'Saint-Christophe-et-Niévès',
    'Sainte-Lucie', 'Saint-Vincent-et-les Grenadines', 'Salvador', 'Suriname', 'Trinité-et-Tobago', 'Uruguay', 'Venezuela',

    'Afghanistan', 'Arabie saoudite', 'Bahreïn', 'Bangladesh', 'Bhoutan', 'Birmanie', 'Brunei', 'Cambodge', 'Chine', 'Corée du Nord',
    'Corée du Sud', 'Émirats arabes unis', 'Inde', 'Indonésie', 'Irak', 'Iran', 'Israël', 'Japon', 'Jordanie', 'Kazakhstan', 'Kirghizistan',
    'Koweït', 'Laos', 'Liban', 'Malaisie', 'Maldives', 'Mongolie', 'Népal', 'Oman', 'Ouzbékistan', 'Palestine', 'Pakistan', 'Philippines',
    'Qatar', 'Singapour', 'Sri Lanka', 'Syrie', 'Tadjikistan', 'Taïwan', 'Thaïlande', 'Timor oriental', 'Turkménistan', 'Turquie',
    'Viêt Nam', 'Yémen',

    'Allemagne', 'Albanie', 'Andorre', 'Arménie', 'Autriche', 'Azerbaïdjan', 'Belgique', 'Biélorussie', 'Bosnie-Herzégovine',
    'Bulgarie', 'Chypre', 'Croatie', 'Danemark', 'Espagne', 'Estonie', 'Finlande', 'France', 'Géorgie', 'Grèce', 'Hongrie', 'Irlande',
    'Islande', 'Italie', 'Lettonie', 'Liechtenstein', 'Lituanie', 'Luxembourg', 'République de Macédoine', 'Malte', 'Moldavie',
    'Monaco', 'Monténégro', 'Norvège', 'Pays-Bas', 'Pologne', 'Portugal', 'République tchèque', 'Roumanie', 'Royaume-Uni',
    'Russie', 'Saint-Marin', 'Serbie', 'Slovaquie', 'Slovénie', 'Suède', 'Suisse', 'Ukraine', 'Vatican',

    'Australie', 'Fidji', 'Kiribati', 'Marshall', 'Micronésie', 'Nauru', 'Nouvelle-Zélande', 'Palaos', 'Papouasie-Nouvelle-Guinée',
    'Salomon', 'Samoa', 'Tonga', 'Tuvalu', 'Vanuatu'
  ];

  ficheFG: FormGroup;
  fiche: Fiche = {
    id: '',
    FullName: '',
    Age: 0,
    Sexe: '',
    Poids: 0,
    Temperature: '',
    TensionArteriel: '',
    Nation: '',
    Adress: '',
    Numero: '',
    Statut: '',
    Medecin: '',
    Departement: '',
    Resceptioniste: '',
    Consultation: '',
    ResultatExamen: '',
    ConseilMedecin: '',
    Autres: '',
    Prescription: '',
    Updated: null,
    Created: null
  };

  // tslint:disable-next-line: no-inferrable-types
  loading: boolean = false;
  // tslint:disable-next-line: no-inferrable-types
  errorMessage: string = '';
  // tslint:disable-next-line: no-inferrable-types
  success: boolean = false;

  statuts;
  users;
  departement;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private db: AngularFirestore,
              private ficheService: FicheService,
              private statutServices: StatutService,
              private usersService: UsersService,
              private departementService: DepartementService,
              private toastrService: NbToastrService) {

    this.ficheFG = this.formBuilder.group({
      id: [''],
      FullName: ['', Validators.required],
      Age: [''],
      Sexe: [''],
      Poids: [''],
      Temperature: [''],
      TensionArteriel: [''],
      Nation: [''],
      Adress: [''],
      Numero: [''],
      Statut: ['', Validators.required],
      Medecin: [''],
      Departement: [''],
      Resceptioniste: [''],
      Consultation: [''],
      ResultatExamen: [''],
      ConseilMedecin: [''],
      Prescription: [''],
      Autres: [''],
    });
  }

  config: ToasterConfig;

  index = 1;
  destroyByClick = true;
  duration = 8000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'success';

  title = 'Envoie Réussie!';
  content = `La fiche a été enregistrée avec succés!`;

  ngOnInit() {
    this.statutServices.getCollection$().subscribe(stat => {
      this.statuts = stat;
    });

    this.usersService.getCollection$().subscribe(doc => {
      this.users = doc;
    });

    this.departementService.getCollection$().subscribe(dep => {
      this.departement = dep;
    });
  }

  save() {
    if (this.ficheFG.valid) {
      this.loading = true;
      this.fiche = this.ficheFG.value;
      this.fiche.id = this.db.createId();
      this.fiche.Created = new Date();
      this.fiche.Updated = new Date();
      this.ficheService.add(this.fiche).then(res => {
        // this.success = true;
        this.router.navigateByUrl('/layouts/list');
        this.loading = false;

      }).then((res => {
        console.log(res);
        this.success = true;
        this.makeToast();
        console.log('Fiche enregistrée !');
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

  medecinValidate() {
    const control = this.ficheFG.get('Medecin');
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
