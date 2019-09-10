import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionComponent } from './function.component';
import {Routes,RouterModule} from '@angular/router';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import {TreeModule} from 'angular-tree-component'
const routerFunction:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:FunctionComponent}
]

@NgModule({
  declarations: [FunctionComponent],
  imports: [ 
    CommonModule,
    RouterModule.forChild(routerFunction),
    FormsModule,
    ModalModule.forRoot(),
    TreeModule.forRoot()
  ]
})
export class FunctionModule { }
