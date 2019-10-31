export interface Fiche {
    id?: string;
    FullName?: string;
    Age?: number;
    Sexe?: string;
    Poids?: number;
    Temperature?: string;
    TensionArteriel?: string;
    Nation?: string;
    Adress?: string;
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

