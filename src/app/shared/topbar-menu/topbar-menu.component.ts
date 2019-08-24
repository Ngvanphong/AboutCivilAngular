import { Component, OnInit } from '@angular/core';
import { LoggedInUser } from 'src/app/core/domain/login.user';
import { SystemConstant } from 'src/app/core/common/system.constant';
import { AuthenService } from 'src/app/core/service/authen.service';
import { UtilityService } from 'src/app/core/service/utility.service';

@Component({
  selector: 'app-topbar-menu',
  templateUrl: './topbar-menu.component.html',
  styleUrls: ['./topbar-menu.component.css']
})
export class TopbarMenuComponent implements OnInit {

  public user:LoggedInUser;
  public baseFolder:string =SystemConstant.BASE_API;

  constructor(private _atuthenService:AuthenService,private _utilityService:UtilityService) { }

  ngOnInit() {
    this.user=this._atuthenService.getUserLogin(); 
  }
  
  logout(){
    localStorage.removeItem(SystemConstant.CURRENT_USER);
    this._utilityService.navigateToLogin();
  }

}
