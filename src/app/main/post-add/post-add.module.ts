import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostAddComponent } from './post-add.component';
import {FormsModule} from '@angular/forms';
import {Routes,RouterModule} from '@angular/router';
import {ModalModule} from 'ngx-bootstrap';
import { CKEditorModule } from 'ngx-ckeditor';
const postAddRouter:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index/:id',component:PostAddComponent}
]
@NgModule({
  declarations: [PostAddComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    FormsModule,
    RouterModule.forChild(postAddRouter),
    ModalModule.forRoot()
  ],
})
export class PostAddModule { }
