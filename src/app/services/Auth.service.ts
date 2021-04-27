import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';
import { Acceso } from '../models/Acceso';
import { Fotos } from '../models/fotos';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
apiURL = "https://invernaderoeq5.herokuapp.com/";
autenticacion = new BehaviorSubject(false);
private token : string;
public archivos : any =[]


  constructor( private http:HttpClient) {

   }
   register(user:User):Observable<any>{
     return this.http.post(`${this.apiURL}users`,user)
   }
   foto(body){
    return this.http.post(`${this.apiURL}perfil`,body)
  }
   login(user:User):Observable<any>{
    return this.http.post(`${this.apiURL}login`,user).pipe(tap(
      (res: Acceso) => {
        if (res) {
          //guardar token
          //this.saveToken(res.dataUser.accesToken,res.dataUser.expiresIn)
          this.guardartoken(res.token)
        }
      })
    );
  }
  getAllusers():Observable<User[]>{
return this.http.get<User[]>(`${this.apiURL}perfil`)
  }


deletefoto():Observable<{}>{
    return this.http.delete(`${this.apiURL}perfil`)
      }

  logout(){
    this.token='';
    localStorage.removeItem("ACCESS_TOKEN");
    return this.http.delete(`${this.apiURL}logout`)

  }
  private guardartoken(token:string):void{
    localStorage.setItem("ACCESS_TOKEN",token);

  }
  public gettoken(): string {
    if(!this.token){
    this.token=localStorage.getItem("ACCESS_TOKEN");
  }
  return this.token
 }

}
