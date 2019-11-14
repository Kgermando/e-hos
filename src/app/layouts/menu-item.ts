import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'TABLEAU DE BORD',
    icon: 'home-outline',
    link: '/layouts/welcome',
    home: true,
  },
  {
    title: 'NOUVELLE FICHE',
    link: '/layouts/add',
    icon: 'edit-2-outline',
  },
  {
    title: 'LISTES DES FICHES',
    icon: 'list-outline',
    link: '/layouts/list'
  },

  {
    title: 'SERVICES',
    group: true,
  },
  {
    title: 'MEDECINE INTERNE',
    icon: 'activity-outline',
    link: '/layouts/fiche-unique',
    // children: [
    //   {
    //     title: 'DIABETOLOGIE',
    //     link: '',
    //   },
    //   {
    //     title: 'ENDOCRINOLOGIE',
    //     link: '',
    //   },
    //   {
    //     title: 'NEPHROLOGIE',
    //     link: '',
    //   },
    //   {
    //     title: 'CARDIOLOGIE',
    //     link: '',
    //   },
    //   {
    //     title: 'RHUMATOLOGIE',
    //     link: '',
    //   },
    //   {
    //     title: 'HEMATOLOGIE',
    //     link: '',
    //   },
    //   {
    //     title: 'PNEUMOLOGIE',
    //     link: '',
    //   },
    //   {
    //     title: 'GASTOENTEROLOGIE',
    //     link: '',
    //   },
    // ],
  },
  {
    title: 'PEDIATRIE',
    icon: 'person-outline',
    link: '',
    // children: [
    //   {
    //     title: 'CROISSENCE & DEVELOPPEMENT',
    //     link: '',
    //   },
    //   {
    //     title: 'NUTRITION',
    //     link: '',
    //   },
    //   {
    //     title: 'URGENCE PEDIATRIQUE',
    //     link: '',
    //   },
    //   {
    //     title: 'CARDIO PEDIATRIQUE',
    //     link: '',
    //   },
    //   {
    //     title: 'PNEUMO PEDIATRIQUE',
    //     link: '',
    //   },
    //   {
    //     title: 'CASTRO ENTRELOGIE',
    //     link: '',
    //   },
    //   {
    //     title: 'PATHOLOGIE INFECTUESE',
    //     link: '',
    //   },
    //   {
    //     title: 'NEUPHRO PEDIATRIQUE',
    //     link: '',
    //   },
    //   {
    //     title: 'NEONATOLOGIE',
    //     link: '',
    //   },
    //   {
    //     title: 'URO PEDIATRIQUE',
    //     link: '',
    //   },

    // ],
  },
  {
    title: 'CHIRURGIE',
    icon: 'car-outline',
    // children: [
    //   {
    //     title: 'CHIRURGIE GENERALE',
    //     link: '',
    //   },
    //   {
    //     title: 'ORTHOPEDIE',
    //     link: '',
    //   },
    //   {
    //     title: 'TRAUMATOLOGIE',
    //     link: '',
    //   },
    //   {
    //     title: 'CHIRURGIE CARDIO VASCULAIRE',
    //     link: '',
    //   },
    //   {
    //     title: 'CHURIRGIE PEDIATRIQUE',
    //     link: '',
    //   },
    //   {
    //     title: 'NEURO CHIRURGIE',
    //     link: '',
    //   },
    //   {
    //     title: 'CHIRURGUE THORACIQUE',
    //     link: '',
    //   },
    //   {
    //     title: 'STOMATOLOGIE',
    //     link: '',
    //   },
    //   {
    //     title: 'UROLOGIE',
    //     link: '',
    //   },
    //   {
    //     title: 'CHIRURGIE MAXILILOFACIALE',
    //     link: '',
    //   }
    // ],
  },

  {
    title: 'GYNECO OBSTETRIQUE',
    icon: 'thermometer-plus-outline',
    // children: [
    //   {
    //     title: 'GYNECOLOGIE',
    //     link: '',
    //   },
    //   {
    //     title: 'OBSTETRIQUE',
    //     link: '',
    //   },
    // ],
  },

  {
    title: 'NEURO PSYCHIATRIE',
    icon: 'smartphone-outline',
    // children: [
    //   {
    //     title: 'NEUROLOGIE',
    //     link: '',
    //   },
    //   {
    //     title: 'PSYCHIATRIE',
    //     link: '',
    //   },
    // ],
  },
];
