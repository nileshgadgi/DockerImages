import { GetSAPConnection } from './../../../../models/getSAPConnection.model';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SortOfSAPConnection } from 'src/app/models/enum/sortOfSAPConnection.enum';
import { SAPConnection } from 'src/app/models/sapConnection.model';
import { DataloaderapiService } from 'src/app/services/dataloaderapi.service';
import { SecurityapiService } from 'src/app/services/securityapi.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-snc',
  templateUrl: './snc.component.html',
  styleUrls: ['./snc.component.css']
})
export class SncComponent implements OnInit {
  @Input() data:SAPConnection | undefined;
  partnerName: string = '';
  libraryPath: string = '';
  protection: string = '';
  isValidConnection: boolean | undefined;
  currentUser:User=new User();
  constructor(public dataloaderapiService:DataloaderapiService,
    private toastr: ToastrService,public securityapiService:SecurityapiService,private router: Router) { }

  createObject():SAPConnection{
    let sapConnection= new SAPConnection();
    sapConnection.name = this.partnerName;
    sapConnection.libraryPath = this.libraryPath;
    sapConnection.protection = this.protection;
    sapConnection.customerUserId = this.currentUser.id;
    sapConnection.sortOfSAPConnection=SortOfSAPConnection.SNC.toString();
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
      if(this.data.sortOfSAPConnection===SortOfSAPConnection.SNC.toString()){
      this.partnerName = this.data.name;
      this.libraryPath = this.data.libraryPath;
      this.protection = this.data.protection;
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
  ngOnChanges(changes: SimpleChanges) {
    this.load();
  }
  ngOnInit(): void {
    this.onGetUser();
    this.getSession();
  }

}
