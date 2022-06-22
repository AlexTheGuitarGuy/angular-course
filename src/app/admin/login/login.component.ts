import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  queryParamsMessage: string = '';
  isSubmitting = false;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const { required, email, minLength } = Validators;

    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain'])
        this.queryParamsMessage = 'Please log in again.';
      if (params['authFailed'])
        this.queryParamsMessage = 'Authentication has failed.';
    });

    this.form = new FormGroup({
      email: new FormControl('', [email, required]),
      password: new FormControl('', [required, minLength(6)]),
    });
  }

  getEmail() {
    return this.form.get('email');
  }

  getPassword() {
    return this.form.get('password');
  }

  submit() {
    if (this.form.invalid) return;
    const user: User = this.form.value;

    this.isSubmitting = true;

    this.auth.login(user).subscribe({
      next: () => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.isSubmitting = false;
      },
      error: () => (this.isSubmitting = false),
    });
  }
}
