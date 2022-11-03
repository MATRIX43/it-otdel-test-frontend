import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostApiService {

  private baseUrl = '/api';

  constructor(
    private http: HttpClient,
  ) { }

  getAll(query: object = {}): Observable<Post[]> {
    const params = new HttpParams().appendAll(query as any);
    return this.http.get(this.baseUrl, { params }) as Observable<Post[]>
  }

  createOne(data: Post) {
    return this.http.post(this.baseUrl, { ...data });
  }

  search(param: { val: string; field: string }) {
    const filter = new HttpParams().set('field', param.field).set('val', param.val);
    return this.http.get(`${this.baseUrl}/search`, { params: filter }) as Observable<Post[]>
  }
}
