import { Injectable } from '@angular/core';
import { IUser } from "src/app/Models/User";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private urlAPI= "http://51.38.51.187:5050/api/v1/users";
  private urlAPIRegister= "http://51.38.51.187:5050/api/v1/auth/sign-up";

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<IUser> {
    return this.http.get<IUser>(this.urlAPI);
  }

  insertUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.urlAPIRegister, user, {responseType: 'json'}).pipe(
      catchError(e => { return throwError(() => e); })
    );
  }

  findUserById(id: string): Observable<any> {
    let url = this.urlAPI + '/' + id;
    return this.http.get<IUser>(url);
  }

  editUser(user: IUser): Observable<any> {
    let url = this.urlAPI + '/' + user.id;
    delete user.id;
    return this.http.put(url, user);
  }

  deleteUser(id: string): Observable<any> {
    let url = this.urlAPI + '/' + id;
    return this.http.delete(url);
  }
}
