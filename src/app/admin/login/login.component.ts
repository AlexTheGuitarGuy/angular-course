import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    const { required, email, minLength } = Validators;
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
    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
    });
  }
}
