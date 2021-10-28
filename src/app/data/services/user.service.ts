import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;
  public mail!: string
  public phone!: number

  constructor(private http: HttpClient) { }


  
   getDataById(id: number): Observable<User> {
     return this.http.get<User>(`${this.baseUrl}/users/${id}`);
   }
}
