import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { AdminModule } from './admin/admin.module';
import { AuthInterceptor } from './shared/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './admin/shared/services/auth.service';
import { QuillModule } from 'ngx-quill';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, AdminModule, QuillModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [AuthService, INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
