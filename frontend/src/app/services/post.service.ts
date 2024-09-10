import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/Post';

@Injectable({
  providedIn: 'any'
})
export class PostService {

  private api: string;

  constructor(private http: HttpClient) {
    this.api = 'http://localhost:5002';
  }

  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(`${this.api}/Post`);
  }

  deletePost(id:number): Observable<string>{
    return this.http.delete<string>(`${this.api}/Post/${id}`);
  }

  savePosts(customer:Post): Observable<Post>{
    return this.http.post<Post>(`${this.api}/Post`, customer);
  }

  getPost(id: number): Observable<Post>{
    return this.http.get<Post>(`${this.api}/Post/${id}`);
  }

  updatePost(customer:Post):Observable<void>{
    return this.http.put<void>(`${this.api}/Post`, customer);
  }
}
