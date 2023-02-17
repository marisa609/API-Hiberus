import { Subscription, take } from 'rxjs';
import { IUser } from 'src/app/Models/User';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SnackBarService } from 'src/app/Utils/snack-bar.service';
import { UsersService } from '../users.service';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from 'src/app/Utils/i18n.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit{

  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    surname: ['', Validators.required],
    password: ['', Validators.required],
    id: [''],
  });

  displayPassword = false;
  userEdited = { name: "", email: "", surname: "", id: "", password: "" };
  request: Subscription = new Subscription;
  

  constructor(private fb: FormBuilder, private sUsers: UsersService, private route:ActivatedRoute, private router:Router, private snackBarService: SnackBarService, public translate: TranslateService, public sI18n: I18nService) {
    var lang = this.sI18n.getLenguaje();
    this.translate.setDefaultLang(lang);
  }


  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(params => {
      if(params['id'] !== undefined)  {
        this.sUsers.findUserById(params['id']).subscribe(data => {
          if(data.id === params['id']) {
            this.userEdited = data;
            this.formEdit();
          } else this.router.navigate(["/home"]); 
        })
      } else this.displayPassword = true;
    })
  }

  formEdit() {
    this.userForm.setValue({
      name: `${this.userEdited.name}`,
      surname: this.userEdited.surname,
      email: this.userEdited.email,
      password: '',
      id: this.userEdited.id
    });
    this.userForm = this.fb.group(this.userEdited);
  }

  onSubmit(): void {
    this.route.params.pipe(take(1)).subscribe(params => {
      if(params['id'] !== undefined)  {
        this.edit();
      } else this.insert(); 
    })
  }
  edit() {
    const user = { 
      email: `${this.userForm.value.email}`,
      name: `${this.userForm.value.name}`,
      surname: `${this.userForm.value.surname}`,
      password: `${this.userForm.value.password}`,
      id: this.userEdited.id
    };
    this.userEdited = user;
    this.request = this.sUsers.editUser(this.userEdited).pipe(take(1)).subscribe({
      next: () => this.snackBarService.openSnackBar('Usuario', 'editado'),
      complete: () => this.router.navigate(["/users"]),
      error: (error: any) =>  {
        this.snackBarService.openErrorSnackBar('Usuario', 'editar'),
        console.log(error);
      }
    })
  }
  insert() {
    this.displayPassword = true;
    const newUser = { 
      email: `${this.userForm.value.email}`,
      name: `${this.userForm.value.name}`,
      surname: `${this.userForm.value.surname}`,
      password: `${this.userForm.value.password}`,
      id: this.userEdited.id
    };
    this.request = this.sUsers.insertUser(newUser).pipe(take(1)).subscribe({
      next: () => this.snackBarService.openSnackBar('Usuario', 'insertado'),
      complete: () => this.router.navigate(["/users"]),
      error: (error: any) =>  {
        this.snackBarService.openErrorSnackBar('Usuario', 'insertar'),
        console.log(error);
      }
    })
  }

}
