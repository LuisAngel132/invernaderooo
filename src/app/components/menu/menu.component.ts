import { IvyParser } from '@angular/compiler';
import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
@Input() menu :Boolean
  constructor() {
    if( localStorage.getItem("ACCESS_TOKEN")){
      this.menu = true;
  }
  else{
  this.menu = false;
}
  }
  ngOnInit(): void {
}
}
