import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Customer } from '../../interfaces/Customer';
import { ToastrModule } from 'ngx-toastr';
import { CustomerService } from '../../services/customer.service';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

@Component({
  selector: 'app-addedit-customers',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule,ToastrModule],
  templateUrl: './addedit-customers.component.html',
  styleUrl: './addedit-customers.component.css'
})
export class AddeditCustomersComponent implements OnInit {
  formCustomer: FormGroup;
  id:number;
  op: string = 'Agregar '
  
  constructor(private fb: FormBuilder, private _customerService: CustomerService, private router: Router, private aRouter: ActivatedRoute){
    this.formCustomer = this.fb.group({
      name:['', Validators.required],
    })

    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    if(this.id != 0){
      this.op = 'Editar '
      this.getCustomer(this.id);
    }
  }

  getCustomer(id: number){
    this._customerService.getCustomer(id).subscribe((data:Customer)=>{
      this.formCustomer.setValue({
        name: data.name
      })
    })
  }

  addCustomer(){
    const customer: Customer ={
      name: this.formCustomer.get('name')?.value
    }

    if(this.id !== 0){
      customer.customerId = this.id;
      this._customerService.updateCustomer(customer).subscribe(()=>{
        this.router.navigate(['/'])
      })
    }else{   
        this._customerService.saveCustomer(customer).subscribe(data=>{
          if(!data.customerId){
            Toastify({
              text: "Este Cliente ya existe",duration: 2000,className: "error",style: {background: "linear-gradient(to right, #F30E0E, #DA2E51)",}
            }).showToast();
        }else{
          this.router.navigate(['/'])
        }
      })
    }
  }
}
