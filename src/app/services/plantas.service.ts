import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable,BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Plantas } from '../models/plantas';

@Injectable({
  providedIn: 'root'
})
export class PlantasService {
  apiURL = "http://localhost:3333/";
  autenticacion = new BehaviorSubject(false);
  private token : string;
  public archivos : any =[]
  constructor( private http:HttpClient) { }
  register(planta:Plantas):Observable<any>{
    return this.http.post(`${this.apiURL}planta`,planta)
  }
  foto(id:string,body){
    return this.http.post(`${this.apiURL}plantafoto/${id}`,body)
  }
  getPlantas():Observable<Plantas[]>{
    return this.http.get<Plantas[]>(`${this.apiURL}misplantas`)
      }
   deleteplanta(id:string):Observable<{}>{
     return this.http.delete(`${this.apiURL}deleteplanta/${id}`)
   }
   deletefoto(id:string):Observable<{}>{
    return this.http.delete(`${this.apiURL}deletefoto/${id}`)
      }
}
