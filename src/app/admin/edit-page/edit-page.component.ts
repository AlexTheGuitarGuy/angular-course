import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from '../../shared/posts.service';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.sass'],
})
export class EditPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  post!: Post;
  isSubmitting = false;
  updateSub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getPostById(params['id']);
        })
      )
      .subscribe((post: Post) => {
        const { required } = Validators;
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, required),
          text: new FormControl(post.text, required),
        });
      });
  }

  getTitle() {
    return this.form.get('title');
  }

  getText() {
    return this.form.get('text');
  }

  update() {
    const newPost = { ...this.post, ...this.form.value };
    if (!newPost) return;

    this.isSubmitting = true;

    this.updateSub = this.postsService.updatePost(newPost).subscribe(() => {
      this.isSubmitting = false;
      this.router.navigate(['/admin', 'dashboard']);
    });
  }

  ngOnDestroy() {
    if (this.updateSub) this.updateSub.unsubscribe();
  }
}
