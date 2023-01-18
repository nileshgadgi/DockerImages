import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerConfiguration } from 'src/app/models/customerConfiguration.model';
import { GetCustomerConfiguration } from 'src/app/models/getCustomerConfiguration.model';
import { User } from 'src/app/models/user.model';
import { DataloaderapiService } from 'src/app/services/dataloaderapi.service';
import { SecurityapiService } from 'src/app/services/securityapi.service';

@Component({
  selector: 'app-general-configuration',
  templateUrl: './general-configuration.component.html',
  styleUrls: ['./general-configuration.component.css'],
})
export class GeneralConfigurationComponent implements OnInit {
  folderLocation: string = '';
  batchSize: number = 0;
  joinChunkSize: number = 0;
  currentUser:User=new User();
  constructor(public dataloaderapiService: DataloaderapiService,
    private toastr: ToastrService,public securityapiService:SecurityapiService) {}
  save() {
    let customerConfiguration = new CustomerConfiguration();
    customerConfiguration.batchSize=this.batchSize;
    customerConfiguration.folderLocation=this.folderLocation;
    customerConfiguration.joinChunkSize=this.joinChunkSize;
    customerConfiguration.customerUserId = this.currentUser.id;
    this.dataloaderapiService
      .saveCustomerConfiguration(customerConfiguration)
      .then((response) => {
        if(response){
          this.toastr.success('New items were saved!', 'Successfully!');
          this.load();
        }
        else{
          this.toastr.error('There was an error!', 'Error!');
        }
      });
  }
  load(){
    let getCustomerConfiguration = new GetCustomerConfiguration();
    getCustomerConfiguration.customerUserId = this.currentUser.id;
    this.dataloaderapiService.getCustomerConfiguration(getCustomerConfiguration).then((response) => {
      if(response!==null)
      {
        this.folderLocation = response.folderLocation;
        this.batchSize = response.batchSize;
        this.joinChunkSize = response.joinChunkSize;
      }
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
