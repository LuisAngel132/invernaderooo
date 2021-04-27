import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/main/home/home.component';
import { from } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; //import actualizado para hacer peticiones a php y msql ya no trae .map
import { InterceptorService } from './interceptors/interceptor.service';
import { UsuariosComponent } from './components/vistas/usuarios/usuarios.component';
import { NgxFileDropModule } from 'ngx-file-drop';

import { MenuComponent } from './components/menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckloginGuard } from './guards/checklogin.guard';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'usuarios', component:UsuariosComponent,canActivate:[CheckloginGuard]},
  {path:'home',component:HomeComponent},
  {path:'configuraciones',component:ConfiguracionesComponent},

  {path:'', redirectTo:'home',pathMatch:'full'}
  ]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsuariosComponent,

    MenuComponent,

    ConfiguracionesComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    [RouterModule.forRoot(routes)],
    HttpClientModule,
    NgxFileDropModule,
    NgbModule
  ],
  providers: [
    {
      provide :HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi :true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
