import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from '../../shared/posts.service';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.sass'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts!: Post[];
  postsSub: Subscription = new Subscription();
  removeSub: Subscription = new Subscription();
  search = '';

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.postsSub = this.postsService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  remove(id: string) {
    this.removeSub = this.postsService.removePost(id).subscribe({
      next: () => {
        this.posts = this.posts.filter((post) => post.id !== id);
        this.alert.warning('Post deleted');
      },
      error: () => {
        this.alert.danger('Could not delete post');
      },
    });
  }

  ngOnDestroy() {
    if (this.postsSub) this.postsSub.unsubscribe();
    if (this.removeSub) this.removeSub.unsubscribe();
  }
}
