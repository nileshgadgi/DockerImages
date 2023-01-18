import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SecurityapiService } from 'src/app/services/securityapi.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser:User=new User();
  isAdmin:boolean=false;
  isAuthenticated:boolean=false;
  lastMenuPath:string='';
  constructor(public securityapiService:SecurityapiService,private router: Router ) { }

  load(){
    this.isAuthenticated=this.securityapiService.isAuthenticated();
  }
  logout(){
    this.securityapiService.logout();
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
  }

}
