import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trim } from '../model/trim';

@Injectable({
  providedIn: 'root'
})
export class TrimService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getData(): Observable<Trim[]> {
    return this.http.get<Trim[]>(`${this.baseUrl}/trims`);
  }

  getDataById(id: number): Observable<Trim> {
    return this.http.get<Trim>(`${this.baseUrl}/trims/${id}`);
  }

  getDataByModel(id: number): Observable<Trim[]> {
    return this.http.get<Trim[]>(`${this.baseUrl}/trims/model/${id}`);
  }
  
}
