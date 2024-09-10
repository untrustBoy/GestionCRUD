import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../interfaces/Customer';

@Injectable({
  providedIn: 'any'
})
export class CustomerService {

  private api: string;

  constructor(private http: HttpClient) {
    this.api = 'http://localhost:5002';
  }

  getCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.api}/Customer`);
  }

  deleteCustomer(id:number): Observable<string>{
    return this.http.delete<string>(`${this.api}/Customer/${id}`);
  }

  saveCustomer(customer:Customer): Observable<Customer>{
    return this.http.post<Customer>(`${this.api}/Customer`, customer);
  }

  getCustomer(id: number): Observable<Customer>{
    return this.http.get<Customer>(`${this.api}/Customer/${id}`);
  }

  updateCustomer(customer:Customer):Observable<void>{
    return this.http.put<void>(`${this.api}/Customer`, customer);
  }
}
