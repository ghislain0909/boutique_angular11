import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Marchandise } from '../models/marchandise';

@Injectable({
  providedIn: 'root'
})
export class MarchandiseService {

  constructor(private httpClient: HttpClient) { }

  public getMarchandises() {
    return this.httpClient.get<any>(`${environment.apiUrl}/api/marchandises`);
  }

  getMarchandiseById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/api/marchandises/${id}`);
  }

  createMarchandise(data: Marchandise){
    const request = {
     marchandise: data.marchandise,
    };
    return this.httpClient.post(`${environment.apiUrl}/api/marchandises`, request);
  }

  updateMarchandise(data){
    const request = {
     marchandise: data.marchandise,
    };
    return this.httpClient.post(`${environment.apiUrl}/api/marchandises/${data.id}`, request);
  }
  
  deleteMarchandise(id) {
    return this.httpClient.delete(`${environment.apiUrl}/api/marchandises/${id}`);
  }
}
