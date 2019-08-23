import { Injectable } from '@angular/core';
import { LoggedInUser } from '../domain/login.user';
import { UtilityService } from '../service/utility.service';
import { NotificationService } from '../service/notification.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SystemConstant } from '../common/system.constant';
import { catchError, tap } from 'rxjs/operators';
import { UrlConstant } from '../common/url.constant';
const _httpOptionLogin = {
  headers: new HttpHeaders({
     'Content-Type': 'application/x-www-form-urlencoded'
 })
};
@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(private _http: HttpClient, private _notificationService: NotificationService, private _utilityService: UtilityService) { }
  login(userName: string, password: string, rememberMe: boolean) {
    let body = "userName=" + encodeURIComponent(userName) + "&password=" + encodeURIComponent(password) + "&rememberMe=" + rememberMe + "&grant_type=password";
    return this._http.post(SystemConstant.BASE_API+'/api/Account/login',body,_httpOptionLogin).pipe(
      tap((res:any)=>{
         if(res.token){
           localStorage.removeItem(SystemConstant.CURRENT_USER);
           localStorage.removeItem(SystemConstant.CURRENT_TOKEN);
           localStorage.setItem(SystemConstant.CURRENT_USER,JSON.stringify(res.userLogin));
           localStorage.setItem(SystemConstant.CURRENT_TOKEN,JSON.stringify(res.token));
           this._utilityService.navigate(UrlConstant.HOME);
         }
      }),
      catchError(
        this._notificationService.handleError<any>("Account isn't correct")
      )
    )
  }
  logout(){
    localStorage.removeItem(SystemConstant.CURRENT_TOKEN);
  }
  

}
