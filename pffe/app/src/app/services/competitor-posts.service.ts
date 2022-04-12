import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from './configs';

export interface CompetitorPost {
  poste_date: Date;
  post_text: string;
  nb_jaime: number;
  nb_commantaire: number;
  nb_partage: number;
  post_link: string;
  type: string;
  nom_concurent: string;
}
export interface Likes {
  post_link: string;
  post_text: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class CompetitorPostsService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  getpostsliked() {
    return this.http.get<Likes[]>(
      `${API_ENDPOINT}/likeposts`,
      this.authService.getAuthHeaders()
    );
  }

  fetchPosts(
    nom_concurent: string,
    type: string,
    start_date: Date,
    end_date: Date
  ) {
    return this.http.get<CompetitorPost[]>(
      `${API_ENDPOINT}/comp/${type}/${start_date
        .toJSON()
        .slice(0, 10)}/${end_date.toJSON().slice(0, 10)}/${nom_concurent}`
    );
  }
  regarderPost(link: string) {
    console.log('hello service ', link);
    return this.http.post(
      `${API_ENDPOINT}/regarder`,
      {
        post_link: link,
      },
      this.authService.getAuthHeaders()
    );
  }

  deletePosts(id: string) {
    return this.http.delete(`${API_ENDPOINT}/deletePostlike/${id}`);
  }
}
