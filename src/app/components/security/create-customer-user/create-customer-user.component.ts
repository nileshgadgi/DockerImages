import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUser } from 'src/app/models/createUser.model';
import { GetCustomerUser } from 'src/app/models/getCustomerUser.model';
import { User } from 'src/app/models/user.model';
import { SecurityapiService } from 'src/app/services/securityapi.service';

@Component({
  selector: 'app-create-customer-user',
  templateUrl: './create-customer-user.component.html',
  styleUrls: ['./create-customer-user.component.css']
})
export class CreateCustomerUserComponent implements OnInit, OnDestroy {
  uuid: string='';
  private sub: any;
  currentUser:User=new User();
  userChose:User=new User();
  username: string = '';
  password: string = '';
  isAdmin:boolean=false;
  active:boolean=false;
  constructor(private route: ActivatedRoute,public securityapiService:SecurityapiService,private router: Router,private toastr: ToastrService) {

	}
  onGetUser(): void {
    this.securityapiService.user$.subscribe((response) => {
      if(response!==null || response !==undefined){
        this.currentUser = response;
      }
    });
  }
  load(){
    let getCustomerUser =new GetCustomerUser();
    getCustomerUser.uuid = this.uuid;
    getCustomerUser.customerId = this.currentUser.customerId;
    getCustomerUser.customerUserId = this.currentUser.id;
    this.securityapiService.getCustomerUser(getCustomerUser,this.uuid).then((data)=>{
      this.userChose=data;
      this.username = this.userChose.username;
      this.password = '';
      this.isAdmin = this.userChose.isAdmin;
      this.active = this.userChose.active;
      this.uuid = this.userChose.uuid;
    });
  }
  getSession(){
    this.securityapiService.getSession();
  }
  save(){
    let createUser=new CreateUser();
    createUser.username =this.username;
    createUser.password =this.password;
    createUser.isAdmin =this.isAdmin;
    createUser.active =this.active;
    createUser.uuid =this.uuid;
    createUser.customerId =this.currentUser.customerId;
    this.securityapiService.saveCustomerUser(createUser).then((response)=>{
      if(response){
        this.toastr.success('The user was saved!', 'Successfully!');
        this.router.navigate(['/home/users']);
      }
      else{
        this.toastr.error('There was an error!', 'Error!');
      }
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.onGetUser();
    this.getSession();
    this.load();
    this.sub = this.route.params.subscribe(params => {
      this.uuid =params['uuid'];
      if(this.uuid!==undefined){
        this.load();
       }
   });
  }

}
