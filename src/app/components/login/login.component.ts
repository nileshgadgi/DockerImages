import { Login } from './../../models/login.model';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SecurityapiService } from 'src/app/services/securityapi.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataloaderapiService } from 'src/app/services/dataloaderapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(public dataloaderapiService:DataloaderapiService,public securityapiService:SecurityapiService,
    private toastr: ToastrService, private router: Router ) { }

  onGetUser(): void {
    this.securityapiService.user$.subscribe((response) => {
    });
  }
  login(){
    let login = new Login();
    login.Username =this.username;
    login.Password =this.password;
    this.securityapiService.login(login).then((response)=>{
      if(response===null || response ===undefined){
        this.toastr.error('An error has occurred, please try again!');
      }
      else{
          this.dataloaderapiService.setMenuPath('/home/dashboard');
          this.router.navigate(['/home/dashboard']);
      }
    });
  }
  ngOnInit(): void {
    this.onGetUser();
  }

}
