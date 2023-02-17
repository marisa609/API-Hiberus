import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from 'src/app/Utils/i18n.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  fotoHiberusLogin:string = "assets/img/hiberusLogin.jpg";

  constructor(private router:Router, public translate: TranslateService, public sI18n: I18nService) { 
    var lang = this.sI18n.getLenguaje();
    this.translate.setDefaultLang(lang);
  }

  signOff() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
