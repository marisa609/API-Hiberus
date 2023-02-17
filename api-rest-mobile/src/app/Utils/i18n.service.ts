import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  constructor(public translate: TranslateService) { }

  getLenguaje() {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    return this.translate.defaultLang;
  }

  setLenguaje(idioma: string) {
    this.translate.setDefaultLang(`${idioma}`);
    this.translate.use(`${idioma}`);
    return this.translate.defaultLang;
  }
}
