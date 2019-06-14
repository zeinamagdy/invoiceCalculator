import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
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
  constructor( private service: OrdersService,
    private activatedRoute: ActivatedRoute
  ) {
  }

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
    this.getCustomerOrders();
  }
  getCustomerOrders() {
    this.service.getCustomerOrders(this.customerId, this.startDate, this.endDate).subscribe(response => {
      this.orders = response;
      this.totalAmount = this.getTotalPrice();
      this.ordersCount = this.orders.length;
    });
  }
  getTotalPrice(): number {
    return this.orders.reduce((sum, i) => sum + Number(i.charge_customer.total_price), 0);
}

}
