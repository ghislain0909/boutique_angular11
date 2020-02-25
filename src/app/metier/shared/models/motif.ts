import { Justificatif } from './justificatif';

export class Motif {
    id: number;
    libelleMotif: string;
    justificatifs: Justificatif[];
    documents: any[];

    constructor() {}
}
