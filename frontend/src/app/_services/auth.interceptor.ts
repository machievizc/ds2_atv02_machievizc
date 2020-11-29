import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {

    headers: HttpHeaders;

    constructor(private router: Router) {
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('token') !== null) {
            const cloneReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
            });
            return next.handle(cloneReq).pipe(
                tap(
                    succ => {},
                    err => {
                        if (err.status === 401) {
                            this.router.navigateByUrl('/login');
                        }
                    }
                )
            );
        } else {
            return next.handle(req.clone());
        }
    }
}