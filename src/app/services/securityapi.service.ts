import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUser } from '../models/createUser.model';
import { GetCustomerUser } from '../models/getCustomerUser.model';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityapiService {
  private _sessionUser: string = 'huroDataSession';
  private _ServiceURL: string;
  public user = new BehaviorSubject<any>(undefined);
  public user$ = this.user.asObservable();

  constructor(private _http: HttpClient) {
    this._ServiceURL = `${environment.mainAPI}`;
  }
  getSession():User|null{
    var result=localStorage.getItem(this._sessionUser);
    if(result!==null){
      this.user.next(JSON.parse(result));
      return JSON.parse(result);
    }
    else
      return null;
  }
  isAuthenticated():boolean
  {
    return this.getSession()!=null;
  }
  logout(){
    this.user.next(undefined);
    localStorage.removeItem(this._sessionUser);
  }
  login(login: Login): Promise<User> {
    return this._http
      .post(`${this._ServiceURL}/Security/Login`,login)
      .toPromise()
      .then((result: any) =>{
        localStorage.setItem(this._sessionUser,JSON.stringify(result));
        this.user.next(result);
        return result;
        })
      .catch(function (result) {});
  }
  saveCustomerUser(createUser: CreateUser): Promise<boolean> {
    return this._http
      .post(`${this._ServiceURL}/Security/Customer/User`, createUser )
      .toPromise()
      .then((result: any) =>{
        return result;
        })
      .catch(function (result) {});
  }
  getCustomerUsers(getCustomerUser:GetCustomerUser):Promise<User[]> {
    return this._http
    .post(`${this._ServiceURL}/Security/Customer/Users`, getCustomerUser )
    .toPromise()
    .then((result: any) =>{
      return result;
      })
    .catch(function (result) {});
  }
  getCustomerUser(getCustomerUser:GetCustomerUser,uuid:string):Promise<User> {
    return this._http
    .post(`${this._ServiceURL}/Security/Customer/User/${uuid}`, getCustomerUser )
    .toPromise()
    .then((result: any) =>{
      return result;
      })
    .catch(function (result) {});
  }
}

