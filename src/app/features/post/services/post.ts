import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  private API = 'http://localhost:10000/users/post/add'; // Ajusta si tu ruta difiere

  constructor(private http: HttpClient) {}

  createPost(postData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;

    return this.http.post(this.API, postData, { headers });
  }
}
