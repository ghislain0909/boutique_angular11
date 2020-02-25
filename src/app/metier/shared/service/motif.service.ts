import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Motif } from '../models/motif';

@Injectable({
  providedIn: 'root'
})
export class MotifService {

  constructor(private httpClient: HttpClient) { }

  getAllMotifs() {
    return this.httpClient.get<any>(`${environment.apiUrl}/api/motifs`);
  }

  getMotifById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/api/motifs/${id}`);
  }

  createActivite(motifData){
    const motifRequest = {
     libMotif: motifData.libMotif,
     documents:motifData.documents
    };
    return this.httpClient.post(`${environment.apiUrl}/api/motifs`, motifRequest);
  }

  getByMotCle(motCle) {
    return this.httpClient.get<any>(`${environment.apiUrl}/api/motifs?mc=${motCle}`);
  }

  updateMotif(justificatifData) {
    const justificatifRequest = {
      libJustificatif: justificatifData.libJustificatif,
    };
    return this.httpClient.put(`${environment.apiUrl}/api/justificatifs/${justificatifData.id}`, justificatifRequest);
  }

  deleteActivite(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/api/motifs/${id}`);
  }
}
