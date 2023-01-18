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
  selector: 'app-load-balancing',
  templateUrl: './load-balancing.component.html',
  styleUrls: ['./load-balancing.component.css']
})
export class LoadBalancingComponent implements OnInit {
  @Input() data:SAPConnection | undefined;
  name: string = '';
  host: string = '';
  group: string = '';
  SID: string = '';
  isValidConnection: boolean | undefined;
  currentUser:User=new User();
  constructor(public dataloaderapiService:DataloaderapiService,
    private toastr: ToastrService,public securityapiService:SecurityapiService,private router: Router ) { }

  createObject():SAPConnection{
    let sapConnection= new SAPConnection();
    sapConnection.name = this.name;
    sapConnection.host = this.host;
    sapConnection.sapGroup = this.group;
    sapConnection.sid = this.SID;
    sapConnection.customerUserId = this.currentUser.id;
    sapConnection.sortOfSAPConnection=SortOfSAPConnection.LOADBALANCING.toString();
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

  load(){
    if(this.data!==undefined){
      if(this.data.sortOfSAPConnection===SortOfSAPConnection.LOADBALANCING.toString()){
      this.name = this.data.name;
      this.host = this.data.host;
      this.group = this.data.sapGroup;
      this.SID = this.data.sid;
    }
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    this.load();
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
  ngOnInit(): void {
    this.onGetUser();
    this.getSession();
  }
}
