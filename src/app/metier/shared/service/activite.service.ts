import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Activite } from '../models/activite';

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {

  constructor(private httpClient: HttpClient) { }

  getAllActivites() {
    return this.httpClient.get<any>(`${environment.apiUrl}/api/activites`);
  }

  getActiviteById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/api/activites/${id}`);
  }

  createActivite(activiteData) {
    const activiteRequest = {
      id: activiteData.idActivite,
      secteur :activiteData.secteur,
      libActivite: activiteData.libActivite,
    };
    if (activiteData.idActivite == null) {
      return this.httpClient.post(`${environment.apiUrl}/api/activites`, activiteRequest);
    } else {
      return this.httpClient.put(`${environment.apiUrl}/api/activites/${activiteData.idActivite}`, activiteRequest);
    }
  }

  getByMotCle(motCle) {
    return this.httpClient.get<any>(`${environment.apiUrl}/api/activites?mc=${motCle}`);
  }

  updateActivite(activiteData) {
    const activiteRequest = {
      libActivite: activiteData.libActivite,
      code :activiteData.code
    };
    return this.httpClient.put(`${environment.apiUrl}/api/activites/${activiteData.id}`, activiteRequest);
  }

  deleteActivite(idActivite: number) {
    return this.httpClient.delete(`${environment.apiUrl}/api/activites/${idActivite}`);
  }
}
