import { Component, OnInit } from '@angular/core';
import { Customer } from '../../interfaces/Customer';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { bootstrapApplication  } from '@angular/platform-browser';
import { ToastrModule, ToastrService, provideToastr } from 'ngx-toastr';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

@Component({
  selector: 'app-list-customers',
  standalone: true,
  imports: [CommonModule, ListCustomersComponent, RouterModule],
  providers: [
    {provide: ToastrService, useClass: ToastrService}
  ],
  templateUrl: './list-customers.component.html',
  styleUrl: './list-customers.component.css'
})
export class ListCustomersComponent implements OnInit {
  listCustomer: Customer[] = []

  constructor(private _customerService: CustomerService) {

  }

  ngOnInit() : void{
    this.getCustomers()
  }

  getCustomers(){
    this._customerService.getCustomers().subscribe((data: Customer[])=>{
      console.log(data)
      this.listCustomer = data;
    })
  }
  deleteCustomer(id:number){
    this._customerService.deleteCustomer(id).subscribe(data=>{
        this.getCustomers()        
        Toastify({
          text: "Cliente Eliminado",
          duration: 2000,
          className: "error",
          style: {
            // background: "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          }
        }).showToast();
    })
  }

}