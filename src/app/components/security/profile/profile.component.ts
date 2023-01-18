import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  constructor() { }
  save(){

  }
  ngOnInit(): void {
  }

}
