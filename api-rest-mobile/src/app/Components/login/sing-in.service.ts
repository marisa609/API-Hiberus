import { Injectable } from '@angular/core';
import { ICliente } from "../../Models/Client";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingInService {
  private urlAPI= "http://51.38.51.187:5050/api/v1/auth/log-in";

  constructor(private http: HttpClient) { }

  logIn(cliente: ICliente): Observable<ICliente> {
    return this.http.post<ICliente>(this.urlAPI, cliente);
  }
  logUp(cliente: ICliente): Observable<ICliente> {
    return this.http.post<ICliente>(this.urlAPI, cliente);
  }
}
