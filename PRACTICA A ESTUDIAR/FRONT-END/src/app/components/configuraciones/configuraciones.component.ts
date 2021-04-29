import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/Auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PlantasService } from 'src/app/services/plantas.service';
import { Plantas } from 'src/app/models/plantas';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { errorMessage, successDialog, timeMessage } from 'src/app/imagenes/functions/alerts';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Ws from '@adonisjs/websocket-client';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {
  public Usuarios:User[]
  public archivos : any =[]
  public previsualizacion :string
  plantas: Plantas[]
  public id:string
  public botton:false
  planta:Plantas
  ws:any
  chat:any
  mensajes:string[]=[]
  msg:string
menu :true

  nuevaplanta = new FormGroup({
    nombre: new FormControl(''),
 });
  constructor(private Authservice3:PlantasService,private config:NgbCarouselConfig,private Authservice:AuthService,private sanitizer: DomSanitizer,private router:Router,private Authservice2:PlantasService) {

  }


  ngOnInit(): void {

  }
  







}
