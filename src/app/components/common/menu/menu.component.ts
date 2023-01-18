import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { DataloaderapiService } from 'src/app/services/dataloaderapi.service';
import { SecurityapiService } from 'src/app/services/securityapi.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  currentUser:User=new User();
  isAdmin:boolean=false;
  lastMenuPath:string='';
  constructor(public dataloaderapiService:DataloaderapiService,public securityapiService:SecurityapiService,private router: Router ) { }
  onGetMenuPath(): void {
    this.dataloaderapiService.menuPath$.subscribe((response) => {
      this.lastMenuPath=response;
    });
  }
  onGetUser(): void {
    this.securityapiService.user$.subscribe((response) => {
      this.currentUser = response;
      this.isAdmin=this.currentUser.isAdmin;
    });
  }
  menuPath(path:string){
    this.dataloaderapiService.setMenuPath(path);
  }
  logout(){
    this.securityapiService.logout();
    this.router.navigate(['/login']);
  }
  getSession(){
    this.securityapiService.getSession();
  }
  ngOnInit(): void {
    this.onGetMenuPath();
    this.onGetUser();
    this.getSession();
  }
}
