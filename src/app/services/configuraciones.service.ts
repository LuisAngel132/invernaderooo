import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConfiguracionesService {
  apiURL = "http://localhost:3333/";


  constructor(private http:HttpClient) { }
  getconfiguraciones(id:string):Observable<[]>{
    return this.http.get<[]>(`${this.apiURL}verconfiguraciones/${id}`)
      }


}
