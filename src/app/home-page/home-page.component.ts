import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/interfaces';
import { PostsService } from '../shared/posts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
})
export class HomePageComponent implements OnInit {
  posts$!: Observable<Post[]>;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.posts$ = this.postsService.getPosts();
  }
}
