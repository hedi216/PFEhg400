import { Observable } from 'rxjs';
import { API_ENDPOINT } from './configs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Competitor {
  link_Site_web: string;
  Secteur: string;
  Siege_social: string;
  date_fondation: string;
  Specialisations: string;
  employes: string;
  nb_abonnee: string;
  nom_societe: string;
  link_logo: string;
  _id: any;
}

@Injectable({
  providedIn: 'root',
})
export class CompetitorService {
  constructor(private http: HttpClient) {}
  getcompetitors() {
    return this.http.get<Competitor[]>(`${API_ENDPOINT}/competit`);
  }
}
