import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

baseUrl = environment.baseUrl;
public currentItem!: Item

constructor(private http: HttpClient) { }

getData(): Observable<Item[]> {
  return this.http.get<Item[]>(`${this.baseUrl}/items`);
}

 getDataById(id: number): Observable<Item> {
   return this.http.get<Item>(`${this.baseUrl}/items/${id}`);
 }

}
