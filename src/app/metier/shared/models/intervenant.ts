import { Activite } from './activite';
import { Pays } from './pays';

export class Intervenant {
    categorie: string;
    name: string;
    r_name: boolean;
    banque: string;
    r_banque: boolean;
    activite: Activite;
    idActivite: number;
    idPays: number;
    pays: Pays;
    r_pays: number;

    constructor() {}
}
