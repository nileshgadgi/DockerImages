import { Component, Input, OnInit } from '@angular/core';
import { ExtractionTask } from 'src/app/models/extractionTask.model';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit {
  @Input() data:ExtractionTask[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}
