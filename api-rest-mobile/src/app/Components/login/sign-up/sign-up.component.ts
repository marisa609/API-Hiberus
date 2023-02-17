import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../users/users.service';
import { SnackBarService } from "../../../Utils/snack-bar.service";
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from 'src/app/Utils/i18n.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  fotoFondo:string = 'assets/img/fondo.webp';
  fotoHiberusLogin:string = "assets/img/hiberusLogin.jpg";

  registrationForm = this.fb.group({
    name: [null, Validators.required],
    surname: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private fb: FormBuilder, private router: Router, private sUsers: UsersService, private sError: SnackBarService, public translate: TranslateService, public sI18n: I18nService) {
    var lang = this.sI18n.getLenguaje();
    this.translate.setDefaultLang(lang);
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const user = {
        name: `${this.registrationForm.value.name}`,
        surname: `${this.registrationForm.value.surname}`,
        email: `${this.registrationForm.value.email}`, 
        password: `${this.registrationForm.value.password}`

      };
      this.sUsers.insertUser(user).subscribe({
        error: (error:any) => this.sError.shootError(error),
        complete: () => this.router.navigate(['/'])
      })
    }
  }
}
