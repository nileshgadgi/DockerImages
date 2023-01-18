import { Component, OnInit } from '@angular/core';
import { GetCustomerUser } from 'src/app/models/getCustomerUser.model';
import { User } from 'src/app/models/user.model';
import { SecurityapiService } from 'src/app/services/securityapi.service';

@Component({
  selector: 'app-customer-user-list',
  templateUrl: './customer-user-list.component.html',
  styleUrls: ['./customer-user-list.component.css']
})
export class CustomerUserListComponent implements OnInit {
  users:User[]=[];
  currentUser:User=new User();
  constructor(public securityapiService:SecurityapiService) {}

  load() {
    let getCustomerUser = new GetCustomerUser();
    getCustomerUser.customerId = this.currentUser.customerId;
    this.securityapiService
      .getCustomerUsers(getCustomerUser)
      .then((data) => {
        this.users = data;
      });
  }
  onGetUser(): void {
    this.securityapiService.user$.subscribe((response) => {
      if(response!==null || response !==undefined){
        this.currentUser = response;
      }
    });
  }
  getSession(){
    this.securityapiService.getSession();
  }

  ngOnInit(): void {
    this.onGetUser();
    this.getSession();
    this.load();
  }

}
