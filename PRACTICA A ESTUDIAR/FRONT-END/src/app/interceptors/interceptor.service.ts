import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
   console.log("paso por el interceptor")
   const headers=new HttpHeaders
   ({
     'Type-content':'aplication/json','Authorization':'Bearer '+localStorage.getItem("ACCESS_TOKEN")
    })
    const reqclone = req.clone({
      headers
    });
    return next.handle(reqclone)
  }
}
