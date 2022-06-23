import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { PostComponent } from '../shared/components/post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './shared/services/auth.guard';
import { QuillModule } from 'ngx-quill';
import { SearchPipe } from './shared/pipes/search.pipe';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from './shared/services/alert.service';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      {
        path: 'dashboard',
        component: DashboardPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'post/:id/edit',
        component: EditPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'create',
        component: CreatePageComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule,
    FormsModule,
  ],
  exports: [RouterModule, PostComponent],
  declarations: [
    AdminLayoutComponent,
    LoginComponent,
    DashboardPageComponent,
    EditPageComponent,
    CreatePageComponent,
    PostComponent,
    SearchPipe,
    AlertComponent,
  ],
  providers: [AuthGuard, AlertService],
})
export class AdminModule {}
