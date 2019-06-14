import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import {  SharingDateService } from '../services/sharing-date.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../order';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  customerId: any;
  startDate: any;
  endDate: any;
  orders: Order[];
  tableColumns: any[];
  totalAmount: number;
  ordersCount: number;
  cashedDate: Order[];
  constructor(
    private service: OrdersService,
    private activatedRoute: ActivatedRoute,
    private saveState: SharingDateService
  ) {}

  ngOnInit() {
    this.tableColumns = [
      { header: 'Name' },
      { header: 'Email' },
      { header: 'Order Items' },
      { header: 'Delivery' },
      { header: 'Total Price' },
      { header: 'Created Date' }
    ];
    this.activatedRoute.queryParams.subscribe(params => {
      this.customerId = params['customer'];
      this.startDate = params['startDate'];
      this.endDate = params['endDate'];
    });
    // const cashedData: Order[] = this.saveState.getUserSettings('orders');
    const cashedData = Object.assign(new Array<Order>(), this.saveState.getUserSettings('orders'));
    console.log('cashed', cashedData);
    if ( cashedData.length !== 0 ) {
      this.orders = cashedData;
      this.totalAmount = this.getTotalPrice();
      this.ordersCount = this.orders.length;
    } else {
      this.getCustomerOrders();
    }
    // this.saveState.getUserSettings('totalAmount');
    // this.saveState.getUserSettings('ordersCount');
  }
  getCustomerOrders() {
    this.service.getCustomerOrders(
      this.customerId,
      this.startDate,
      this.endDate).subscribe(response => {
      this.orders = response;
      this.saveState.setSettings('orders', this.orders);
      this.totalAmount = this.getTotalPrice();
      this.ordersCount = this.orders.length;
    });
  }

  getTotalPrice(): number {
    return this.orders.reduce(
      (sum, i) => sum + Number(i.charge_customer.total_price), 0);
  }
}
