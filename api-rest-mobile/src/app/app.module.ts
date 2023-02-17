import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from "./Utils/material.module";

import { LoginModule } from "./Components/login/login.module";
import { UsersModule } from "./Components/users/users.module";

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SnackBarService } from './Utils/snack-bar.service';
import { HomeComponent } from './Components/home/home.component';
import { ShellModule } from './Shell/shell.module';
import { NotFoundComponent } from './Components/not-found/not-found.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    UsersModule,
    MaterialModule,
    ShellModule,
    HttpClientModule,
    TranslateModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [ SnackBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
