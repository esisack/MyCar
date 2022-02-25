import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const REFRESH_KEY = 'refresh-token';
const USER_KEY = 'auth-user';
const ENTITY_KEY = 'auth-entity';
const USER_BPM_KEY = 'auth-bpm';
const USER_GROUP_KEY = 'auth-group';
const ROLE_KEY = 'auth-role';
const AUTHORITIES = "authorities"

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    localStorage.clear();
  }

  public saveAccesRights(authorities: string[]): void {
    localStorage.removeItem(AUTHORITIES);
    localStorage.setItem(AUTHORITIES, JSON.stringify(authorities));
  }

  // public getAccessRights(): string[] {
  //   return JSON.parse(localStorage.getItem(AUTHORITIES));
  // }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    localStorage.removeItem(REFRESH_KEY);
    localStorage.setItem(REFRESH_KEY, token);
  }

  public getRefreshToken(): string  {
    var token = localStorage.getItem(REFRESH_KEY)
    return token === null ? "" : token
  }

  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): string {
    var user = localStorage.getItem(USER_KEY)
    return JSON.parse(user === null ? "" : user);
  }

  public saveEntity(entity: string): void {
    localStorage.removeItem(ENTITY_KEY);
    localStorage.setItem(ENTITY_KEY, JSON.stringify(entity));
  }

  public getEntity(): string {
    var entity = localStorage.getItem(ENTITY_KEY)
    return JSON.parse(entity === null ? "" : entity);
  }


  public saveUserGroup(group: string): void {
    localStorage.removeItem(USER_GROUP_KEY);
    localStorage.setItem(USER_GROUP_KEY, JSON.stringify(group));
  }

  public getUserGroup(): string {
    var userGroup = localStorage.getItem(USER_GROUP_KEY)
    return JSON.parse(userGroup === null ? "" : userGroup);
  }

  public saveRole(role: string): void {
    localStorage.removeItem(ROLE_KEY);
    localStorage.setItem(ROLE_KEY, JSON.stringify(role));
  }

  public getRole(): string {
    var role = localStorage.getItem(ROLE_KEY)
    return JSON.parse(role === null ? "" : role);
  }

}
