import { ConfiguracionesService } from 'src/app/services/configuraciones.service';
import { Configuraciones } from 'src/app/models/configuraciones';
import { errorMessage, successDialog, timeMessage } from 'src/app/imagenes/functions/alerts';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {
  public Configuraciones:Configuraciones[]

  constructor(private serviceConfiguraciones:ConfiguracionesService,private router:Router,private carrousel:NgbCarouselConfig) {
    this.carrousel.interval =1000;

  }

  ngOnInit(): void {
    this.serviceConfiguraciones.getconfiguraciones('1').subscribe(message=>this.Configuraciones = message
      )
  }

}
