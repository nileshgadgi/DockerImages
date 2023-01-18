import { CustomerConfiguration } from 'src/app/models/customerConfiguration.model';
import { SAPConnection } from 'src/app/models/sapConnection.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetSAPConnection } from 'src/app/models/getSAPConnection.model';
import { User } from 'src/app/models/user.model';
import { DataloaderapiService } from 'src/app/services/dataloaderapi.service';
import { SecurityapiService } from 'src/app/services/securityapi.service';
import { GetCustomerConfiguration } from 'src/app/models/getCustomerConfiguration.model';
import { ExtractionStatus } from 'src/app/models/enum/extractionStatus.enum';
import { GetTableCustomers } from 'src/app/models/getTableCustomers.model';
import { SAPTableCustomer } from 'src/app/models/sapTableCustomer.model';
import { ExtractionTask } from 'src/app/models/extractionTask.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  sourceSystemList:string[]=[];
  credentialList:SAPConnection[]=[];
  customerConfiguration:CustomerConfiguration=new CustomerConfiguration();
  templateList:SAPTableCustomer[]=[];
  dateStart:string= new Date().toLocaleDateString('en-US');
  dateEnd:string= this.addMonths(1,new Date()).toLocaleDateString('en-US');
  dataLocation:string='';
  status:string=ExtractionStatus.WAITING.toString();
  currentUser:User=new User();
  sourceSystem:string='SAP';
  credential:SAPConnection=new SAPConnection();
  template:SAPTableCustomer=new SAPTableCustomer();;
  constructor(public dataloaderapiService:DataloaderapiService,public securityapiService:SecurityapiService,private router: Router,private toastr: ToastrService) {

	}

   addMonths(numOfMonths:number, date = new Date()) {
    date.setMonth(date.getMonth() + numOfMonths);

    return date;
  }
  onGetUser(): void {
    this.securityapiService.user$.subscribe((response) => {
      if(response!==null || response !==undefined){
        this.currentUser = response;
      }
    });
  }
  load(){
    this.loadCredentials();
    this.loadGeneralConfiguration();
    this.loadTemplates();
    this.loadSourceSystem();
  }
  loadSourceSystem(){
    this.sourceSystemList=['SAP'];
  }
  loadCredentials(){
    let getSAPConnection = new GetSAPConnection();
    getSAPConnection.customerUserId = this.currentUser.id;
    this.dataloaderapiService
      .getAllSAPConnections(getSAPConnection)
      .then((data) => {
        this.credentialList = data;
      });
  }
  loadGeneralConfiguration(){
    let getCustomerConfiguration = new GetCustomerConfiguration();
    getCustomerConfiguration.customerUserId = this.currentUser.id;
    this.dataloaderapiService.getCustomerConfiguration(getCustomerConfiguration).then((response) => {
      if(response!==null)
      {
        this.customerConfiguration = response;
        this.dataLocation =  this.customerConfiguration.folderLocation;
      }
    });
  }
  loadTemplates(){
    let getTableCustomers = new GetTableCustomers();
    getTableCustomers.customerUserId = this.currentUser.id;
    this.dataloaderapiService.getSAPTableCustomers(getTableCustomers).then((data)=>{
      this.templateList=data;
    })
  }
  save(){
    let extractionTask =new ExtractionTask();
    extractionTask.resource=this.sourceSystem;
    extractionTask.customerSAPConfigurationId=this.credential.id;
    extractionTask.sapTableCustomerId=this.template.id;
    extractionTask.dateStart=new Date(this.dateStart);
    extractionTask.dateEnd=new Date(this.dateEnd);
    extractionTask.dataLocation=this.dataLocation;
    extractionTask.extractionStatus=this.status;
    extractionTask.totalItems=0
    extractionTask.extractedItems=0;
    extractionTask.customerUserId=this.currentUser.id;

    this.dataloaderapiService.saveExtractionTask(extractionTask).then((response)=>{
      if(response){
        this.toastr.success('New Task was created!', 'Successfully!');
      }
      else{
        this.toastr.error('There was an error!', 'Error!');
      }
    })
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
