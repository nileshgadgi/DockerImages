import { Component, OnInit } from '@angular/core';
import { ExtractionTask } from 'src/app/models/extractionTask.model';
import { GetExtractionTask } from 'src/app/models/getExtractionTask.model';
import { User } from 'src/app/models/user.model';
import { DataloaderapiService } from 'src/app/services/dataloaderapi.service';
import { SecurityapiService } from 'src/app/services/securityapi.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tasks:ExtractionTask[]=[];
  currentUser:User=new User();
  constructor(public dataloaderapiService: DataloaderapiService,public securityapiService:SecurityapiService) {}

  loadTasks() {
    let getExtractionTask = new GetExtractionTask();
    getExtractionTask.customerUserId = this.currentUser.id;
    this.dataloaderapiService
      .getExtractionTasks(getExtractionTask)
      .then((data) => {
        this.tasks = data;
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
    this.loadTasks();
  }

}
