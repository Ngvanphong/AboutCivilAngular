import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {Routes,RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import{NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import{BsDatepickerModule, PaginationModule} from 'ngx-bootstrap';
import {ModalModule} from 'ngx-bootstrap';

const userRouter:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:UserComponent}
]

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(userRouter),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot()

  ]
})
export class UserModule { }
