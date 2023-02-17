import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./Components/home/home.component";
import { NotFoundComponent } from './Components/not-found/not-found.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./Components/login/login.module').then(m => m.LoginModule) },
  { path: 'home', component: HomeComponent },
  { path: 'users', loadChildren: () => import('./Components/users/users.module').then(m => m.UsersModule) },
  /* {path: '**', component: NotFoundComponent } */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
