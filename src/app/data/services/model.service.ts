import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Model } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getData(): Observable<Model[]> {
    return this.http.get<Model[]>(`${this.baseUrl}/models`);
  }

  getDataById(id: number): Observable<Model> {
    return this.http.get<Model>(`${this.baseUrl}/models/${id}`);
  }

  getDataByMake(id: number): Observable<Model[]> {
    console.log("nuevo id:" + id)
    return this.http.get<Model[]>(`${this.baseUrl}/models/make/${id}`);
  }
}
