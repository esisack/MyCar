import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { TokenStorageService } from './token-storage.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  public authenticate: boolean = false
  public rol!: string;
  public user!: string;
  public username!: string;
  public code!: string;

  baseUrl = environment.baseUrl;

  constructor(

    private http: HttpClient,
    private tokenService: TokenStorageService)
  { }

  logout() {
    this.authenticate = false
  }

  login(jwtRequest: any): Observable<any> {
    return this.http.post(this.baseUrl, jwtRequest, httpOptions);
  }

  refresh(): Observable<any> {
    let token = this.tokenService.getRefreshToken()
    return this.http.post<any>(`${this.baseUrl}/refresh`, {'token': token})
  }

  validateIdentity(code: string, state: string, redirectUri: string): Observable<any> {

    let params = new HttpParams();
    params = params.append('code', code);
    params = params.append('state', state);
    params = params.append('redirectUri', redirectUri);
    
    return this.http.get<any>(`${this.baseUrl}/identity`, {params}).pipe(
      map(data => data),
      catchError(err => throwError (err))
    )
  }

  register(userDto: any): Observable<any> {
    return this.http.post(this.baseUrl + '/register', userDto, httpOptions);
  }

  validateMail(username: any, code: null): Observable<any> {
    return this.http.post(this.baseUrl + '/checkMail', {'mail': username, 'code': code}, httpOptions);
  }

  changePassword(newPassword: any, mail: any): Observable<any> {
    return this.http.post(this.baseUrl + '/changePassword', {'password': newPassword, 'email': mail}, httpOptions);
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
