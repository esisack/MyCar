import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../model/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

baseUrl = environment.baseUrl;

constructor(private http: HttpClient) { }

getDataByCustomer(id: number): Observable<Address[]> {
  return this.http.get<Address[]>(`${this.baseUrl}/address/customer/${id}`);
}

 getDataById(id: number): Observable<Address> {
   return this.http.get<Address>(`${this.baseUrl}/address/${id}`);
 }
}
