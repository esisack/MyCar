import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Preference } from '../model/preference';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  getData(id: number): Observable<Preference> {
    return this.http.get<Preference>(`${this.baseUrl}/preferences/${id}`).pipe(
      catchError(this.handleError));

  } 

  create(preference: Preference): Observable<Object> {
    return this.http.post(`${this.baseUrl}/preferences`, preference).pipe(
      catchError(this.handleError));
  }

  update(preference: Preference): Observable<Preference> {
    return this.http.put<Preference>(`${this.baseUrl}/preferences`, preference).pipe(
      catchError(this.handleError));
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
  };
}


