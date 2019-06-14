import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../customer';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  private static readonly DATE_FORMAT = 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'';
  customers: Customer[];
  selectedCustomer: Customer;
  selectedDate: any;
  startDate: any;
  endDate: any;
  customerId: any;
  rangeDates: any;

  constructor (
    private service: CustomerService,
    private datePipe: DatePipe,
    private route: Router
  ) { }

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.service.getAllCustomers()
      .subscribe(response => {
        this.customers = response;
      });
  }
  processed() {
    this.customerId = this.selectedCustomer.id;
    console.log('this.rangeDates', this.rangeDates);
    this.startDate = this.datePipe.transform(this.rangeDates[0], CustomerFormComponent.DATE_FORMAT);
    this.endDate = this.datePipe.transform(this.rangeDates[1], CustomerFormComponent.DATE_FORMAT);
    console.log('this.startDate', this.startDate);
    console.log('this.endDate', this.endDate);
    this.route.navigate(['calculator'],
      { queryParams:
        { customer: this.customerId, startDate: this.startDate, endDate: this.endDate }
      });
  }

}
