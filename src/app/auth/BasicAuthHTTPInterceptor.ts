import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import {Observable} from 'rxjs';

export class BasicAuthHttpInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem('name') && sessionStorage.getItem('authString')) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('authString')
        }
      });
    }
    return next.handle(req);
  }
}
