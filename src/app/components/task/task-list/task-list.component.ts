import { ExtractionTask } from './../../../models/extractionTask.model';
import { Component, OnInit } from '@angular/core';
import { DataloaderapiService } from 'src/app/services/dataloaderapi.service';
import { GetExtractionTask } from 'src/app/models/getExtractionTask.model';
import { User } from 'src/app/models/user.model';
import { SecurityapiService } from 'src/app/services/securityapi.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks:ExtractionTask[]=[];
  currentUser:User=new User();
  constructor(public dataloaderapiService: DataloaderapiService,public securityapiService:SecurityapiService) {}

  load() {
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
    this.load();
  }

}
