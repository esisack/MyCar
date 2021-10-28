import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Make } from '../model/make';

@Injectable({
  providedIn: 'root'
})
export class MakeService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getData(): Observable<Make[]> {
    return this.http.get<Make[]>(`${this.baseUrl}/makes`);
  }

  getDataById(id: number): Observable<Make> {
    return this.http.get<Make>(`${this.baseUrl}/makes/${id}`);
  }

}
