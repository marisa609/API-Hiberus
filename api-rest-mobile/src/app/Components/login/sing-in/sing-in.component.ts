import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SingInService } from '../sing-in.service';
import { SnackBarService } from "../../../Utils/snack-bar.service";
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from 'src/app/Utils/i18n.service';

@Component({
  selector: 'app-login',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent {

  //ToDo: ReactiveForms

  fotoFondo:string = 'assets/img/fondo.webp';
  fotoHiberusLogin:string = "assets/img/hiberusLogin.jpg";

  loginForm = this.fb.group({ 
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private fb: FormBuilder, private router: Router, private sLogin: SingInService, private sError: SnackBarService, public translate: TranslateService, public sI18n: I18nService) {
    var lang = this.sI18n.getLenguaje();
    this.translate.setDefaultLang(lang);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const cliente = { email: `${this.loginForm.value.email}`, password: `${this.loginForm.value.password}`};
      this.sLogin.logIn(cliente).subscribe({
        next: (token) => {
          sessionStorage.setItem('token', JSON.stringify(token));
          this.router.navigate(['/home']);
        },
        error: (error:any) => this.sError.shootError(error)
      })
    }
  }

  public signIn() {
    this.router.navigate(['signIn'])
  }
}
