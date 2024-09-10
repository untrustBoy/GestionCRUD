import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Post } from '../../interfaces/Post';
import { ToastrModule } from 'ngx-toastr';
import { CustomerService } from '../../services/customer.service';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { PostService } from '../../services/post.service';
import { Customer } from '../../interfaces/Customer';

@Component({
  selector: 'app-addedit-post',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule,ToastrModule],
  templateUrl: './addedit-post.component.html',
  styleUrl: './addedit-post.component.css'
})
export class AddeditPostComponent {
  formPost: FormGroup;
  id:number;
  op: string = 'Agregar '
  listCustomer: Customer[] = []
  
  constructor(private fb: FormBuilder, private _postService: PostService, private router: Router, private aRouter: ActivatedRoute, private _customerService: CustomerService){
    this.formPost = this.fb.group({
      title:['', Validators.required],
      body:['', Validators.required],
      category:['', Validators.required],
      customer:['', Validators.required],
    })

    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getCustomers()
    if(this.id != 0){
      this.op = 'Editar '
      this.getPost(this.id);
    }
  }
  

  getCustomers(){
    this._customerService.getCustomers().subscribe((data: Customer[])=>{
      this.listCustomer = data;
    })
  }

  getPost(id: number){
    this._postService.getPost(id).subscribe((data:Post)=>{
      this.formPost.setValue({
        title: data.title,
        body: data.body,
        category: data.type,
        customer: data.customerId
      })
    })
  }

  addPost(){
    console.log(this.formPost.get('category'))
    let cat;
    const type = this.formPost.get('category')?.value
    if(type == '1'){
      cat = 'Farandula'
    } else if(type == '2'){
      cat = 'Politica'
    } else if(type == '3'){
      cat = 'Futbol'
    }
    const post: Post ={
      title: this.formPost.get('title')?.value,
      body: this.formPost.get('body')?.value,
      type: this.formPost.get('category')?.value,
      category: cat ? cat : '',
      customerId: this.formPost.get('customer')?.value
    }

    if(this.id !== 0){
      post.postId = this.id;
      this._postService.updatePost(post).subscribe(()=>{
        this.router.navigate(['/posts'])
      })
    }else{   
        this._postService.savePosts(post).subscribe(data=>{
          this.router.navigate(['/posts'])
      })
    }
  }
}
