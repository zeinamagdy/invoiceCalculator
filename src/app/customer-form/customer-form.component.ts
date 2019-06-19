import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import {  SharingDateService } from '../services/sharing-date.service';
import { Customer, CustomerJSON } from '../entites/customer';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

const DATE_FORMAT = 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'';
const CUSTOMERS_KEY = 'customers';
const SELECTED_ID_KEY = 'selected_customer';
const START_DATE_KEY = 'start_date';
const END_DATE_KEY = 'end_date';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
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
    private route: Router,
    private saveState: SharingDateService
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    const cachedData = this.saveState.get(CUSTOMERS_KEY);
    if (cachedData) {
      this.customers = cachedData.map((it: CustomerJSON) => Customer.fromJSON(it));
      this.selectedCustomer = this.customers.find(it => it.id === this.saveState.get(SELECTED_ID_KEY));
      const startDate = this.saveState.get(START_DATE_KEY);
      const endDate = this.saveState.get(END_DATE_KEY);
      if (startDate && endDate) {
        this.rangeDates = [new Date(startDate), new Date(endDate) ];
      }
    } else {
      this.service.getAllCustomers()
        .subscribe(response => {
          this.customers = response;
          this.saveState.set(CUSTOMERS_KEY, this.customers);
        });
    }
  }

  selectCustmer() {
    this.customerId = this.selectedCustomer.id;
    this.saveState.set(SELECTED_ID_KEY, this.customerId);
  }

  processed() {
    this.startDate = this.datePipe.transform(this.rangeDates[0], DATE_FORMAT);
    this.endDate = this.datePipe.transform(this.rangeDates[1], DATE_FORMAT);
    this.saveState.set(START_DATE_KEY, this.rangeDates[0]);
    this.saveState.set(END_DATE_KEY, this.rangeDates[1]);
    this.route.navigate(['calculator'],
      { queryParams:
        { customer: this.customerId, startDate: this.startDate, endDate: this.endDate }
      });
  }
  clearData() {
    this.saveState.cleanAll();
    location.reload();
  }
}
