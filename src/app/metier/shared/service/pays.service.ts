import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaysService {

  constructor(private httpClient: HttpClient) { }

  public listerPays() {
    return this.httpClient.get<any>(`${environment.apiUrl}/api/pays`)
  }

  public createPays(paysData) {
    const paysRequest = {
      code: paysData.code,
      pays: paysData.pays,
      notation: paysData.notation
    };    
    return this.httpClient.post(`${environment.apiUrl}/api/pays`, paysRequest)
  }

  public deletePays(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/api/pays/${id}`);
  }

  public updatePays(paysData) {
    const paysRequest = {
      code: paysData.code,
      pays: paysData.pays,
      notation: paysData.notation
    };    
    return this.httpClient.post(`${environment.apiUrl}/api/pays/${paysData.id}`, paysRequest)
  }
}
