import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { I18nService } from './i18n.service';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar, public translate: TranslateService, public sI18n: I18nService) {
    var lang = this.sI18n.getLenguaje();
    this.translate.setDefaultLang(lang);
  }
  
  openSnackBar(identificador: string, mensaje: string) {
    this._snackBar.open(`${identificador} ${mensaje} correctamente.`, 'Cerrar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  openErrorSnackBar(identificador: string, mensaje: string) {
    this._snackBar.open(`Se ha producido un error al ${mensaje} un ${identificador}.`, 'Cerrar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  shootError(err: Error) {
    if (err instanceof HttpErrorResponse) {
      const keyTranslate = this.translate.translations.es[err.status];
      this._snackBar.open(`Se ha producido el siguiente error: ${keyTranslate}`, 'Cerrar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
      });
    }
  }
}
