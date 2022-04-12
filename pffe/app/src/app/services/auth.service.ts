import { API_ENDPOINT } from './configs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthUser {
  fullName: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  user: AuthUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user?: AuthUser;
  public authToken?: string;

  constructor(private http: HttpClient, private router: Router) {
    this.setAuthDataFromLocalStorage();
    if (this.isAuthenticated) {
      if (this.isAdmin) {
        this.router.navigate(['administrator']);
      } else if (this.isUer) {
        this.router.navigate(['dashboard']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  getAuthHeaders() {
    return {
      headers: {
        Authorization: 'Bearer ' + this.authToken,
      },
    };
  }

  saveUser(loginResponse: LoginResponse) {
    localStorage.setItem('user', JSON.stringify(loginResponse));
    this.user = loginResponse.user;
    this.authToken = loginResponse.access_token;
  }

  setAuthDataFromLocalStorage() {
    const dataJsonAsString = localStorage.getItem('user');
    if (dataJsonAsString) {
      const data: LoginResponse = JSON.parse(dataJsonAsString);
      this.user = data.user;
      this.authToken = data.access_token;
    }
  }

  get isAuthenticated(): boolean {
    return !!this.user;
  }

  get isAdmin(): boolean | undefined {
    return this.user && this.user.role == 'a';
  }

  get isUer(): boolean | undefined {
    return this.user && this.user.role == 'u';
  }

  logout() {
    delete localStorage['user'];
    this.user = undefined;
    this.authToken = undefined;
    this.router.navigate(['/']);
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${API_ENDPOINT}/login`, {
        email,
        password,
      })
      .subscribe(
        (data: LoginResponse) => {
          this.saveUser(data);
          if (data.user.role == 'a') {
            this.router.navigate(['administrator']);
          } else {
            this.router.navigate(['dashboard']);
          }
        },
        (error) => {
          alert('Password or email incorrect');
        }
      );
  }
}
