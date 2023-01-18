import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SortOfSAPConnection } from 'src/app/models/enum/sortOfSAPConnection.enum';
import { GetSAPConnection } from 'src/app/models/getSAPConnection.model';
import { SAPConnection } from 'src/app/models/sapConnection.model';
import { User } from 'src/app/models/user.model';
import { DataloaderapiService } from 'src/app/services/dataloaderapi.service';
import { SecurityapiService } from 'src/app/services/securityapi.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  @Input() data:SAPConnection | undefined;
  name: string = '';
  host: string = '';
  system: string = '0';
  client: string = '';
  username: string = '';
  password: string = '';
  language: string = 'EN';
  languages:string[]=['EN'];
  isValidConnection: boolean | undefined;
  currentUser:User=new User();
  constructor(public dataloaderapiService:DataloaderapiService,
    private toastr: ToastrService,public securityapiService:SecurityapiService,private router: Router) { }

  createObject():SAPConnection{
    let sapConnection= new SAPConnection();
    if(this.data!==undefined){
    sapConnection.uuid = this.data.uuid;
    }
    sapConnection.name = this.name;
    sapConnection.host = this.host;
    sapConnection.noSystem = this.system;
    sapConnection.client = this.client;
    sapConnection.username = this.username;
    sapConnection.password = this.password;
    sapConnection.customerUserId = this.currentUser.id;
    sapConnection.language =this.language;
    sapConnection.sortOfSAPConnection=SortOfSAPConnection.BASIC.toString();
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
    this.dataloaderapiService.saveSAPConfiguration(sapConnection).then((response)=>{
      if(response){
        this.toastr.success('The connection data was saved!', 'Successfully!');
        this.router.navigate(['/home/configuration/sap']);
      }
      else{
        this.toastr.error('There was an error!', 'Error!');
      }
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    this.load();
  }
  load(){
    if(this.data!==undefined){
      if(this.data.sortOfSAPConnection===SortOfSAPConnection.BASIC.toString()){
      this.host = this.data.host;
      this.name = this.data.name;
      this.system = this.data.noSystem;
      this.client = this.data.client;
      this.language = this.data.language;
      this.username = this.data.username;
      this.password = this.data.password;
      this.language=this.data.language;
      }
    }
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
  }

}
