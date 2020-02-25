import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private httpClient: HttpClient, private toastrService: ToastrService) { }

  public saveOperation(operationData) {
    const operationRequest = {
      libelle: operationData.libelle,
      idMotif: operationData.idMotif,
      idMarchandise: operationData.idMarchandise,
      montant: operationData.montant,
      devise: operationData.idDevise.id,
      intervenants: operationData.intervenants,
      documents: operationData.documents
    }
    return this.httpClient.post(`${environment.apiUrl}/api/operations`, operationRequest);
  }

  public getOperations() {
    return this.httpClient.get<any>(`${environment.apiUrl}/api/operations/all`);
  }

}
