import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private url = 'https://private-anon-746dcdc59d-byrd1.apiary-mock.com/orders/';
  constructor( private http: HttpClient ) { }
  getCustomerOrders(
    customerId: number,
    startDate: Date,
    endDate: Date): Observable<Order[]> {
    return this.http.get(this.url + customerId + '?start_date=' + startDate + '&end_date=' + endDate)
    .pipe(
      map((data: any) =>
        data.map((t: any) =>
          new Order(
            t.id,
            t.recipient,
            t.delivery,
            t.charge_customer,
            t.created_at,
            t.items
          )
        )
      ),
    );
  }
}
