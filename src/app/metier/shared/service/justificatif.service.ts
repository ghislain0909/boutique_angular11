import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Justificatif } from '../models/justificatif';

@Injectable({
  providedIn: 'root'
})
export class JustificatifService {

  constructor(private httpClient: HttpClient) { }

  public getAllJustificatifs() {
    return this.httpClient.get<any>(`${environment.apiUrl}/api/justificatifs`);
  }

  public getJustificatifById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/api/justificatifs/${id}`);
  }

  public createActivite(justificatifData) {
    const justificatifRequest = {
      code: justificatifData.code,
      libJustificatif: justificatifData.libJustificatif,
      statut: justificatifData.statut
    };
    return this.httpClient.post(`${environment.apiUrl}/api/justificatifs`, justificatifRequest);
  }

  public getByMotCle(motCle) {
    return this.httpClient.get<any>(`${environment.apiUrl}/api/justificatifs?mc=${motCle}`);
  }

  public updateJustificatif(justificatifData) {
    const justificatifRequest = {
      code: justificatifData.code,
      libJustificatif: justificatifData.libJustificatif,
      statut: justificatifData.statut,
    };
    return this.httpClient.put(`${environment.apiUrl}/api/justificatifs/${justificatifData.id}`, justificatifRequest);
  }

  public deleteJustificatif(idJustificatif: number) {
    return this.httpClient.delete(`${environment.apiUrl}/api/justificatifs/${idJustificatif}`);
  }
}
