import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemType } from '../model/item-type';

@Injectable({
  providedIn: 'root'
})
export class ItemTypeService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getData(): Observable<ItemType[]> {
    return this.http.get<ItemType[]>(`${this.baseUrl}/itemTypes`);
  }

  getDataById(id: number): Observable<ItemType> {
    return this.http.get<ItemType>(`${this.baseUrl}/itemTypes/${id}`);
  }

}
