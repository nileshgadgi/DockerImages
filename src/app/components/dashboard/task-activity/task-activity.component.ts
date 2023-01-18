import { Component, Input, OnInit } from '@angular/core';
import { ExtractionTask } from 'src/app/models/extractionTask.model';

@Component({
  selector: 'app-task-activity',
  templateUrl: './task-activity.component.html',
  styleUrls: ['./task-activity.component.css']
})
export class TaskActivityComponent implements OnInit {
  @Input() data:ExtractionTask[]=[];
  constructor() { }
  getLastActivity(rangeOfTime:string){

  }
  ngOnInit(): void {
  }

}
