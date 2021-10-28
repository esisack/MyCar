import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/customer';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl = environment.baseUrl;
  public currentItem!: Item
  public currentCustomer!: Customer
  
  constructor(private http: HttpClient) { }
  
  getData(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/customers`);
  }
  
   getDataById(id: number): Observable<Customer> {
     return this.http.get<Customer>(`${this.baseUrl}/customers/${id}`);
   }
}
