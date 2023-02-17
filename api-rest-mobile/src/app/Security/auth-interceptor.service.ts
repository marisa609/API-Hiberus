import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class AuthInterceptorService implements HttpInterceptor {

    constructor(private router:Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = sessionStorage.getItem("token");
        if (token != null) {
            var valor_token = JSON.parse(token);
            var request = req.clone({
                setHeaders: {
                    authorization: `${valor_token.tokenType} ${valor_token.accessToken}`
                }
            });
            return next.handle(request);
        } else {
            this.router.navigate(['/']);
            return next.handle(req);
        }
    }

}