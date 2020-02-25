import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { map, first, tap, shareReplay } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { User } from '@app/shared/user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private roles : Array<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    
   }

  public get currentUserValue(): User {
    console.log(this.currentUserSubject);
    return this.currentUserSubject.value;
  }

  public login(usernameOrEmail: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/auth/login`, { usernameOrEmail, password })
    .pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.roles = this.currentUserValue.roles;
      return user;
    }));
  }

  checkUsernameAvailability(username: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/users/checkUsernameAvailability?username=${username}`);
  }

  checkTelephoneAvailability(telephone: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/users/checkTelephoneAvailability?telephone=${telephone}`);
  }

  checkEmailAvailability(email: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/users/checkEmailAvailability?email=${email}`);
  }

  public register(user: User) {
    const userRequest = {
      name: user.name,
      email: user.email,
      password: user.password,
      telephone: user.telephone,
      username: user.username,
    };
    return this.http.post(`${environment.apiUrl}/api/auth/register`, userRequest);
  }

  public reset(data) {
    const resetRequest = {
      username: data.username,
      password: data.password,
    };
    return this.http.post(`${environment.apiUrl}/api/auth/reset`, resetRequest);
  }

  public updatePassword() {
    
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAdmin() {
    for (let r of this.currentUserValue.roles){
      if (r == "ROLE_ADMIN"){
        return true;
      }
    }
    return false;
  }

  isAgent() {
    for (let r of this.currentUserValue.roles){
      if (r == "ROLE_AGENT"){
        return true;
      }
    }
    return false;
  }

  isManager() {
    for (let r of this.currentUserValue.roles){
      if (r == "ROLE_MANAGER"){
        return true;
      }
    }
    return false;
  }

  isRoot() {
    for (let r of this.currentUserValue.roles){
      if (r == "ROLE_ROOT"){
        return true;
      }
    }
    return false;
  }



  hasAnyRole(roles: string[]) {
  
    for (const role of this.currentUserValue['roles']) {
      if (roles.includes(role)) {
        return true;
      }
    }
    return false;
  }
}
