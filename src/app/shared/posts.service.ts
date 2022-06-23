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
            response:
              | FirebaseDatabaseResponse
              | any /*try to remove any without causing errors*/
          ) => ({
            ...post,
            id: response.name,
            date: new Date(post.date),
          })
        )
      );
  }

  getPosts(): Observable<Post[]> {
    return this.http.get(`${environment.firebaseDatabaseURL}/posts.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date),
        }));
      })
    );
  }

  removePost(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.firebaseDatabaseURL}/posts/${id}.json`
    );
  }

  getPostById(id: string): Observable<Post> {
    return this.http
      .get<Post>(`${environment.firebaseDatabaseURL}/posts/${id}.json`)
      .pipe(
        map((post: Post) => {
          return {
            ...post,
            id,
            date: new Date(post.date),
          };
        })
      );
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.patch<Post>(
      `${environment.firebaseDatabaseURL}/posts/${post.id}.json`,
      post
    );
  }
}
