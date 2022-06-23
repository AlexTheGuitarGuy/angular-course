import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/interfaces';
import { PostsService } from '../shared/posts.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.sass'],
})
export class PostPageComponent implements OnInit {
  post$!: Observable<Post>;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getPostById(params['id']);
      })
    );
  }
}
