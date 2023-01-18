import { Component, OnInit } from '@angular/core';
import { GetTableCustomers } from 'src/app/models/getTableCustomers.model';
import { SAPTableCustomer } from 'src/app/models/sapTableCustomer.model';
import { User } from 'src/app/models/user.model';
import { DataloaderapiService } from 'src/app/services/dataloaderapi.service';
import { SecurityapiService } from 'src/app/services/securityapi.service';

@Component({
  selector: 'app-sap-table-list',
  templateUrl: './sap-table-list.component.html',
  styleUrls: ['./sap-table-list.component.css']
})
export class SapTableListComponent implements OnInit {
  sapTableCustomerList:SAPTableCustomer[]=[];
  currentUser:User=new User();
  isAdmin:boolean=false;
  constructor(public dataloaderapiService: DataloaderapiService,public securityapiService:SecurityapiService) {}

  load() {
    let getTableCustomers = new GetTableCustomers();
    getTableCustomers.customerUserId = this.currentUser.id;
    this.dataloaderapiService.getSAPTableCustomers(getTableCustomers).then((data)=>{
      this.sapTableCustomerList=data;
    })
  }
  onGetUser(): void {
    this.securityapiService.user$.subscribe((response) => {
      if(response!==null || response !==undefined){
        this.currentUser = response;
        this.isAdmin=this.currentUser.isAdmin;
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
