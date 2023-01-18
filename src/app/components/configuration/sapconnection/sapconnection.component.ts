import { SAPConnection } from 'src/app/models/sapConnection.model';
import { GetSAPConnection } from 'src/app/models/getSAPConnection.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataloaderapiService } from 'src/app/services/dataloaderapi.service';
import { SecurityapiService } from 'src/app/services/securityapi.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sapconnection',
  templateUrl: './sapconnection.component.html',
  styleUrls: ['./sapconnection.component.css']
})
export class SapconnectionComponent implements OnInit , OnDestroy {
  uuid: string='';
  private sub: any;
  currentUser:User=new User();
  data:SAPConnection=new SAPConnection();
  tabName:string='';
  constructor(private route: ActivatedRoute,public dataloaderapiService: DataloaderapiService,public securityapiService:SecurityapiService) {}

  ngOnInit() {
    this.onGetUser();
    this.getSession();
    this.sub = this.route.params.subscribe(params => {
       this.uuid =params['uuid'];
       if(this.uuid!==undefined){
        this.loadInformation();
       }
       else{
        this.tabName = 'Basic';
       }
    });
  }
  loadInformation(){
    let getSAPConnection =new GetSAPConnection();
    getSAPConnection.uuid = this.uuid;
    getSAPConnection.customerUserId = this.currentUser.id;
    this.dataloaderapiService.getSAPConnection(getSAPConnection).then((data)=>{
      this.data=data;
      this.tabName =this.data.sortOfSAPConnection;
    });
  }
  isTabActive(tabName:string):boolean{
    return this.tabName==tabName;
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
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
