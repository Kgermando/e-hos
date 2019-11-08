import { Fiche } from './fiche';


export interface Exist {
    id: string;
    identite: Fiche;
    Numero?: string;
    Statut?: string;
    Medecin?: any; // Medecin devient user
    Departement?: string;
    Resceptioniste?: string;
    Consultation?: string;
    ResultatExamen?: string;
    ConseilMedecin?: string;
    Prescription?: string;
    Autres?: string;
    Created?: Date;
    Updated?: Date;
}
