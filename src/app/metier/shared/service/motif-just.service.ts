import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MotifJustService {

  constructor(private httpClient: HttpClient) { }

  public createJustByMotif(data) {
    const request = {
      idMotif: data.idMotif,
      idJustificatif: data.idJustificatif,
      obligatoire: data.obligatoire,
      optionel: data.optionel
    };
    return this.httpClient.post(`${environment.apiUrl}/api/motif-just`, request);
  }

  public getAll() {
    return this.httpClient.get<any>(`${environment.apiUrl}/api/motif-just`)
  }

  public findByMotifAndObligatoire(idMotif: number, montant: number) {
    return this.httpClient.get<any>(`${environment.apiUrl}/api/motif-just/${idMotif}/${montant}`);
  }

  public update(data) {
    const request = {
      idMotif: data.idMotif,
      idJustificatif: data.idJustificatif,
      obligatoire: data.obligatoire,
      optionel: data.optionel
    };
    return this.httpClient.put(`${environment.apiUrl}/api/motif-just/${data.id}`, request);
  }

  public deleteById(id) {
    return this.httpClient.delete(`${environment.apiUrl}/api/motif-just/${id}`);
  }
}
