import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { ShellModule } from 'src/app/Shell/shell.module';
import { AuthInterceptorService } from 'src/app/Security/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsersService } from './users.service';
import { MaterialModule } from 'src/app/Utils/material.module';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    UsersListComponent,
    UsersFormComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ShellModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi:true
    },
    UsersService
  ]
})
export class UsersModule { }
