import { SAPConnection } from './../../../models/sapConnection.model';
import { Component, OnInit } from '@angular/core';
import { DataloaderapiService } from 'src/app/services/dataloaderapi.service';

@Component({
  selector: 'app-connection-form',
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.css']
})
export class ConnectionFormComponent implements OnInit {
  host: string = '';
  system:string = '0';
  client: string = '';
  username: string = '';
  password: string = '';
  isValidConnection: boolean | undefined;
  constructor(public dataloaderapiService:DataloaderapiService) { }

  createObject():SAPConnection{
    let sapConnection= new SAPConnection();
    sapConnection.host = this.host;
    sapConnection.noSystem = this.system;
    sapConnection.client = this.client;
    sapConnection.username = this.username;
    sapConnection.password = this.password;
    return sapConnection;
  }
  testConnection(){
    let sapConnection= this.createObject();
    this.dataloaderapiService.testSAPConnection(sapConnection).then((data)=>{
      this.isValidConnection = data;
    })
  }

  save(){
    let sapConnection= this.createObject();
  }
  ngOnInit(): void {
  }

}
