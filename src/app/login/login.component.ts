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
    this._authenService.login(this.model.username,this.model.password,this.model.rememberme).subscribe(data=>{
      this.loading=false;
    })  
  }

}
