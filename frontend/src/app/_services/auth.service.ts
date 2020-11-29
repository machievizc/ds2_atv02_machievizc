import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authenticated = new EventEmitter<boolean>();
  public user = new EventEmitter<Object>();
  constructor() { }

  getToken() {
    let token = localStorage.getItem('token');
    return JSON.parse(token);
  }

  setToken(token: object) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  getUser() {
    let user = localStorage.getItem('user');
    return JSON.parse(user);
  }

  setUser(user: object) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    let token = this.getToken();
    return token ? true : false;
  }

  setAuthenticated(user: object) {
    this.user.emit(user);
    this.authenticated.emit(true);
  }

  logOut() {
    localStorage.clear();
    this.authenticated.emit(false);
  }
}
