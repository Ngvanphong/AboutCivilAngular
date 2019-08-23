import { Component, OnInit } from '@angular/core';
import {AuthenService} from '../core/service/authen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loading=false;
  public model:any={};
  constructor(private _authenService:AuthenService) { }

  ngOnInit() {
  }
  public login(){
    this.loading=true;  
  }

}
