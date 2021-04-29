import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { errorMessage, successDialog, timeMessage } from 'src/app/imagenes/functions/alerts';
import { Acceso } from 'src/app/models/Acceso';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/Auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  Acceso:User;
  registerform:FormGroup;
  user:User;
  public id:string

  constructor(private ac:ActivatedRoute,private fb:FormBuilder,private Authservice:AuthService,private router:Router) {
    this.id=this.ac.snapshot.paramMap.get('id');
    this.createform()
    this.createform2()
   }

  ngOnInit(): void {
  }

  login(): void {

    if(this.loginForm.invalid){
      return Object.values(this.loginForm.controls).forEach(control =>{control.markAsTouched();});
    }
    else{this.setuser()
      this.Authservice.login(this.Acceso).subscribe((data:any)=>{
        timeMessage('Iniciando..',1500).then(()=>
        successDialog('Iniciando'));
        this.router.navigate(['/usuarios'])
      },error =>{

      errorMessage('correo o contraseña erronea')  }
        )
    }
  }
  get validatenombre(){return(this.registerform.get('nombre').invalid && this.registerform.get('nombre').touched);}
  get validatecorreo(){return(this.loginForm.get('email').invalid && this.loginForm.get('email').touched);}
  get validatepassword(){return(this.loginForm.get('password').invalid && this.loginForm.get('password').touched);}
  get validatecorreo2(){return(this.registerform.get('email').invalid && this.registerform.get('email').touched);}
  get validatepassword2(){return(this.registerform.get('password').invalid && this.registerform.get('password').touched);}
 createform():void{
    this.loginForm = this.fb.group({
      email : ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required]]

    })

  }
  setuser(): void {
    this.Acceso = {
     email : this.loginForm.get('email').value,
     password : this.loginForm.get('password').value,

    };
   }
   register():void{

   if(this.registerform.invalid){
     return Object.values(this.registerform.controls).forEach(control =>{control.markAsTouched();});
    }

   else{this.setus()
  this.Authservice.register(this.user).subscribe((data:any)=>{
  timeMessage('Registrando..',1500).then(()=>
  successDialog('Registrocompletado'));
window.location.reload()
},error =>{

errorMessage('A ocurrido un error..')  }
  )
  }
  }

  createform2():void{
    this.registerform = this.fb.group({
      nombre : ['',[Validators.required]],
      email : ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required]]

    })
  }


  setus(): void {
   this.user = {
    nombre : this.registerform.get('nombre').value,
    email : this.registerform.get('email').value,
    password : this.registerform.get('password').value,

   };
  }

  }
