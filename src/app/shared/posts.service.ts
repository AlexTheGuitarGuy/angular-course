import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FirebaseDatabaseResponse, Post } from './interfaces';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http
      .post(`${environment.firebaseDatabaseURL}/posts.json`, post)
      .pipe(
        map(
          (
            r:
              | FirebaseDatabaseResponse
              | any /*try to remove any without causing errors*/
          ) => ({
            ...post,
            id: r.name,
            date: new Date(post.date),
          })
        )
      );
  }
}
