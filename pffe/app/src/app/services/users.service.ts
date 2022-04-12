import { API_ENDPOINT } from './configs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

export interface User {
  fullName: string;
  position: string;
  email: string;
  phoneNumber: string;
  _id: any;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getOptions() {
    return {
      headers: {
        Authorization: 'Bearer ' + this.authService.authToken,
      },
    };
  }

  getUsers() {
    return this.http.get<User[]>(`${API_ENDPOINT}/users`, this.getOptions());
  }
  deleteUser(email: string) {
    return this.http.delete(
      `${API_ENDPOINT}/delete/${email}`,
      this.getOptions()
    );
  }
  fetchUser(email: string) {
    return this.http.get<User>(
      `${API_ENDPOINT}/users/${email}`,
      this.getOptions()
    );
  }
  updateUser(email: string, data: any) {
    return this.http.put<User>(
      `${API_ENDPOINT}/update/${email}`,
      data,
      this.getOptions()
    );
  }
  createUser(data: any) {
    return this.http.post<User>(
      `${API_ENDPOINT}/create`,
      data,
      this.getOptions()
    );
  }
  sentMail(email: string) {
    return this.http.post(
      `${API_ENDPOINT}/send-password-mail/${email}`,
      this.getOptions()
    );
  }
}
