import { GetSAPConnection } from './../../../../models/getSAPConnection.model';
import { Component, OnInit } from '@angular/core';
import { SAPConnection } from 'src/app/models/sapConnection.model';
import { DataloaderapiService } from 'src/app/services/dataloaderapi.service';
import { SecurityapiService } from 'src/app/services/securityapi.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-connection-list',
  templateUrl: './connection-list.component.html',
  styleUrls: ['./connection-list.component.css'],
})
export class ConnectionListComponent implements OnInit {
  connections: SAPConnection[] = [];
  currentUser:User=new User();
  constructor(public dataloaderapiService: DataloaderapiService,public securityapiService:SecurityapiService) {}

  load() {
    let getSAPConnection = new GetSAPConnection();
    getSAPConnection.customerUserId = this.currentUser.id;
    this.dataloaderapiService
      .getAllSAPConnections(getSAPConnection)
      .then((data) => {
        this.connections = data;
      });
  }
  getSession(){
    this.securityapiService.getSession();
  }
  onGetUser(): void {
    this.securityapiService.user$.subscribe((response) => {
      if(response!==null || response !==undefined){
        this.currentUser = response;
      }
    });
  }
  chooseConnection(uuid:string){
    console.error(uuid);
  }
  ngOnInit(): void {
    this.onGetUser();
    this.getSession();
    this.load();
  }
}
