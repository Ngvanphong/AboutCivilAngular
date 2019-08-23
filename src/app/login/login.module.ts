import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {Routes,RouterModule} from '@angular/router'
import{FormsModule} from '@angular/forms';
import { AuthenService } from '../core/service/authen.service';
const loginRoutes:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:LoginComponent}
]
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(loginRoutes)
  ],
  providers:[
    AuthenService
  ]
  
})
export class LoginModule { }
