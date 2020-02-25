import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviseService {

  constructor(private httpClient: HttpClient) { }

  public getDevises() {
    return this.httpClient.get<any>(`${environment.apiUrl}/api/devises`)
  }

  public createDevise(deviseData) {
    const deviseRequest = {
      code: deviseData.code,
      libelle: deviseData.libelle,
      contreValeur: deviseData.contreValeur
    };
    return this.httpClient.post(`${environment.apiUrl}/api/devises`, deviseRequest)
  }

  public updateDevise(deviseData) {
    const deviseRequest = {
      code: deviseData.code,
      libelle: deviseData.libelle,
      contreValeur: deviseData.contreValeur
    };
    return this.httpClient.put(`${environment.apiUrl}/api/devises/${deviseData.id}`, deviseRequest)
  }

  public deleteDevise(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/api/devises/${id}`);
  }

  public getDevise(id: number) {
    return this.httpClient.get<any>(`${environment.apiUrl}/api/devises/${id}`);
  }

}
