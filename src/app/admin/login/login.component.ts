import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  queryParamsMessage: string = '';
  isSubmitting = false;
  authSub: Subscription = new Subscription();

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    if (this.auth.isAuth()) this.router.navigate(['/admin', 'dashboard']);

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

    this.authSub = this.auth.login(user).subscribe({
      next: () => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.alert.success('Login successful');
        this.isSubmitting = false;
      },
      error: () => {
        this.alert.danger('Login failed');
        this.isSubmitting = false;
      },
    });
  }

  ngOnDestroy() {
    if (this.authSub) this.authSub.unsubscribe();
  }
}
