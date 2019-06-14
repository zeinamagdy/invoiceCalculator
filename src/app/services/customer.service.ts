import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from '../customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = 'http://private-anon-3aa72837bb-byrd1.apiary-mock.com/customers';
  constructor(private http: HttpClient) { }
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get(this.url).pipe(
      map((data: any) => data.map((item: any) => new Customer(
       item.id,
       item.name,
       item.email
      ))),
    );

  }
}

