import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap';
import {Routes,RouterModule} from '@angular/router';

const roleRouter:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index', component:RoleComponent}
]


@NgModule({
  declarations: [RoleComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(roleRouter),
  ]
})
export class RoleModule { }
