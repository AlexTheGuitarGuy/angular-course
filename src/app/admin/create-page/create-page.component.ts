import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from '../../shared/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.sass'],
})
export class CreatePageComponent implements OnInit {
  form!: FormGroup;
  isSubmitting = false;

  constructor(private postService: PostsService, private alert: AlertService) {}

  ngOnInit() {
    const { required } = Validators;
    this.form = new FormGroup({
      title: new FormControl('', [required]),
      text: new FormControl('', [required]),
      author: new FormControl('', [required]),
    });
  }

  getTitle() {
    return this.form.get('title');
  }

  getAuthor() {
    return this.form.get('author');
  }

  getText() {
    return this.form.get('text');
  }

  submit() {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    const { title, text, author } = this.form.value;

    const post: Post = {
      title,
      text,
      author,
      date: new Date(),
    };

    this.postService.create(post).subscribe({
      next: () => {
        this.form.reset();
        this.isSubmitting = false;
        this.alert.success('Post created');
      },
      error: () => {
        this.isSubmitting = false;
        this.alert.success('Failed to create post');
      },
    });
  }
}
