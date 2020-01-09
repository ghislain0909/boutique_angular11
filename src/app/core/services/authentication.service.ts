import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/user';
import { HttpClient } from '@angular/common/http';

import { map, first, tap, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  public get currentUserValue(): User {
    console.log(this.currentUserSubject);
    return this.currentUserSubject.value;
  }

  public login(usernameOrEmail: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/auth/signin`, { usernameOrEmail, password })
    .pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  checkUsernameAvailability(username: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/user/checkUsernameAvailability?username=${username}`);
  }

  checkTelephoneAvailability(telephone: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/user/checkTelephoneAvailability?telephone=${telephone}`);
  }

  checkEmailAvailability(email: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/user/checkEmailAvailability?email=${email}`);
  }

  public register(user: User) {
    const userRequest = {
      name: user.name,
      email: user.email,
      password: user.password,
      username: user.username,
    };
    return this.http.post(`${environment.apiUrl}/api/auth/register`, userRequest);
  }

  public reset(data) {
    const resetRequest = {
      username: data.username,
      password: data.password,
    };
    return this.http.post(`${environment.apiUrl}/api/auth/reset`, data);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
