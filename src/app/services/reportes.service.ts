import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable,BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Reporte } from '../models/reporte';
import { Indentificador } from '../models/indentificador';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  apiURL = "https://invernaderoeq5.herokuapp.com/";
 autenticacion = new BehaviorSubject(false);
  private token : string;
  public archivos : any =[]
  constructor( private http:HttpClient) { }

  getreportes():Observable<Reporte[]>{
    return this.http.get<Reporte[]>(`${this.apiURL}reporte/`)
      }
      getid():Observable<Indentificador[]>{
        return this.http.get<Indentificador[]>(`${this.apiURL}user/`)
          }
}
