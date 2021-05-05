import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/Auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PlantasService } from 'src/app/services/plantas.service';
import { Plantas } from 'src/app/models/plantas';
import { ReportesService } from 'src/app/services/reportes.service';
import { Reporte } from 'src/app/models/reporte';
import {Indentificador } from 'src/app/models/indentificador'
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { errorMessage, successDialog, timeMessage } from 'src/app/imagenes/functions/alerts';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Ws from '@adonisjs/websocket-client';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public Usuarios:User[]
  public archivos : any =[]
  public previsualizacion :string
  plantas: Plantas[]
  reporte: Reporte[]
  indentificador:Indentificador[]
  public id:string
  public botton:false
  planta:Plantas
  ws:any
  chat:any
  mensajes:string[]=[]
  msg:string
mostrar:Boolean =false

  nuevaplanta = new FormGroup({
    nombre: new FormControl(''),
 });
  constructor(private Authservice3:PlantasService,private config:NgbCarouselConfig,private Authservice:AuthService,private reportesdelusuario:ReportesService,private sanitizer: DomSanitizer,private router:Router,private Authservice2:PlantasService) {
this.config.interval =1500;
}

  ngOnInit(): void {


  this.Authservice.getAllusers().subscribe(data=>this.Usuarios = data
    )
    this.reportesdelusuario.getid().subscribe(data=>this.indentificador = data
      )
    this.reportesdelusuario.getreportes().subscribe(data=>this.reporte = data
      )
   this.ws =Ws("wss://invernanderointeligente.herokuapp.com/adonis-ws");
   this.ws.connect()
   this.chat = this.ws.subscribe("chat")
   this.chat.on("message",(data:any)=>{
     this.mensajes.push(data)
    })
console.log(this.indentificador)
  }
  enviarMensaje(){

    this.chat.emit("message",this.msg)
    this.mensajes.push(this.msg)
    this.msg = ""
  }
  subirArchivo(): any {
    try {
      const formularioDeDatos = new FormData();
      this.archivos.forEach(archivo => {
        formularioDeDatos.append('avatar', archivo)
      })
      // formularioDeDatos.append('_id', 'MY_ID_123')
      this.Authservice.foto(formularioDeDatos)
        .subscribe(res => {
          console.log('Respuesta del servidor', res);

        }, () => {
          alert('Error');
        })
    } catch (e) {
      console.log('ERROR', e);

    }
  }



  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

  capturarfile(event):any{
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);

    })
    this.archivos.push(archivoCapturado)

  }
  eliminarArchivo():void{

      this.Authservice.deletefoto().subscribe(res => {
        console.log('Respuesta del servidor', res);
        window.location.reload()
      })

  }



  get validatenombre(){return(this.nuevaplanta.get('nombre').invalid && this.nuevaplanta.get('nombre').touched);}

guardarid():void{
  this.Usuarios.forEach(element => {
this.id = element.id
console.log(this.id)
});

}
guardarid2(id,button){

  this.id = id
  this.botton =button
}

cerrarsesion(){
  this.Authservice.logout()
}
mostrasocket(id:string,mensaje:string){

  if( id == mensaje)
  {
return this.mostrar = true
  }
  return this.mostrar = false

}
nomostrasocket()
{
  return this.mostrar = false

}
}
