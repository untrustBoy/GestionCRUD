import { Component, OnInit } from '@angular/core';
import { Customer } from '../../interfaces/Customer';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/Post';
import { TruncatePipe } from '../../truncate.pipe';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-list-post',
  standalone: true,
  imports: [CommonModule, ListPostComponent, RouterModule, TruncatePipe],
  templateUrl: './list-post.component.html',
  styleUrl: './list-post.component.css'
})
export class ListPostComponent {
  listPosts: Post[] = []

  constructor(private _postService: PostService, private _customerService: CustomerService) {

  }

  ngOnInit() : void{
    this.getPosts()
  }

  getPosts(){
    this._postService.getPosts().subscribe((data: Post[])=>{
      console.log(data)
      this.listPosts = data;
    })
  }
  
  deletePost(id:number){
    this._postService.deletePost(id).subscribe(data=>{
        this.getPosts()        
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
