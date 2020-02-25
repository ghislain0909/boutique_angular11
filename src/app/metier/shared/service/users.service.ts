import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/user';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }


  getUsers() : Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/api/users`);
  }

  getUserById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/api/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${environment.apiUrl}/api/users`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${environment.apiUrl}/api/users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.httpClient.delete<User>('/'+ id);
  }

  getRoles() {
    return this.httpClient.get(`${environment.apiUrl}/api/roles`);
  }
}
