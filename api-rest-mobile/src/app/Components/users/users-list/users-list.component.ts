import { IUser } from 'src/app/Models/User';
import { AfterViewInit, Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { UsersService } from '../users.service';
import { UsersLstDataSource } from './users-list-datasource';
import { MatTable } from '@angular/material/table'

import { SnackBarService } from 'src/app/Utils/snack-bar.service';
import { Observable, of, take } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { I18nService } from 'src/app/Utils/i18n.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IUser>;
  lista!: IUser[];
  dataSource: UsersLstDataSource;
  displayedColumns = ['name', 'surname', 'email', 'edit', 'action'];

  constructor(private sUsers: UsersService, private snackBarService: SnackBarService, public sI18n: I18nService, public translate: TranslateService) {
    this.dataSource = new UsersLstDataSource([]);
    var lang = this.sI18n.getLenguaje();
    this.translate.setDefaultLang(lang);
  }

  ngAfterViewInit(): void {
    this.dataCollect();
  }

  dataCollect() {
    this.sUsers.getAllUsers().pipe(take(1)).subscribe(data => {
      this.lista = data.items!;
      this.listar(data.items!);
    });
  }

  listar(data: []) {
    this.dataSource = new UsersLstDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  delete(id?:string) {
    if (id) {
      this.sUsers.deleteUser(id).subscribe(data => {
      this.snackBarService.openSnackBar('Usuario', 'borrado');
      this.dataCollect();
    });
    }else {
      this.snackBarService.openErrorSnackBar('Usuario', 'borrado');
    }
  }
}
