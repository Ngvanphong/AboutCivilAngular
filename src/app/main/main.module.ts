import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {mainRoutes} from './main.router';
import {RouterModule} from '@angular/router';
import { SidebarMenuComponent } from '../shared/sidebar-menu/sidebar-menu.component';
import { TopbarMenuComponent } from '../shared/topbar-menu/topbar-menu.component';

@NgModule({
  declarations: [MainComponent,SidebarMenuComponent,TopbarMenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes)
  ]
})
export class MainModule { }
