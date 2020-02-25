import { Motif } from './motif';
import { Devise } from './devise';
import { Justificatif } from './justificatif';
import { Intervenant } from './intervenant';

export class Operation {
    private code: string;
    private libelle: string;
    private motif: Motif;
    private idMotif: number;
    private montant: number;
    private devise: Devise;
    private idDevise: number;
    private documents: Justificatif[];
    private intervenants: Intervenant[];

    constructor() {}
}
