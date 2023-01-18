import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { MenuComponent } from './components/common/menu/menu.component';
import { RightSideBarComponent } from './components/common/right-side-bar/right-side-bar.component';
import { SplashScreenComponent } from './components/common/splash-screen/splash-screen.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotfoundComponent } from './components/common/notfound/notfound.component';
import { RegisterComponent } from './components/register/register.component';
import { SapTablesComponent } from './components/configuration/sap-tables/sap-tables.component';
import { SapconnectionComponent } from './components/configuration/sapconnection/sapconnection.component';
import { ConnectionFormComponent } from './components/configuration/connection-form/connection-form.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeneralConfigurationComponent } from './components/configuration/general-configuration/general-configuration.component';


import { CreateTaskComponent } from './components/task/create-task/create-task.component';
import { TaskListComponent } from './components/task/task-list/task-list.component';

import { BasicComponent } from './components/configuration/sapconnection/basic/basic.component';
import { SncComponent } from './components/configuration/sapconnection/snc/snc.component';
import { LoadBalancingComponent } from './components/configuration/sapconnection/load-balancing/load-balancing.component';
import { ConnectionListComponent } from './components/configuration/sapConnection/connection-list/connection-list.component';
import { ProfileComponent } from './components/security/profile/profile.component';
import { SapTableListComponent } from './components/configuration/sap-table-list/sap-table-list.component';
import { TaskTableComponent } from './components/dashboard/task-table/task-table.component';
import { TaskActivityComponent } from './components/dashboard/task-activity/task-activity.component';
import { SapTablesAdminComponent } from './components/configuration/sap-tables-admin/sap-tables-admin.component';
import { CreateCustomerUserComponent } from './components/security/create-customer-user/create-customer-user.component';
import { CustomerUserListComponent } from './components/security/customer-user-list/customer-user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    RightSideBarComponent,
    SplashScreenComponent,
    HomeComponent,
    DashboardComponent,
    NotfoundComponent,
    RegisterComponent,
    SapTablesComponent,
    SapconnectionComponent,
    ConnectionFormComponent,
    GeneralConfigurationComponent,
    BasicComponent,
    SncComponent,
    LoadBalancingComponent,
    CreateTaskComponent,
    TaskListComponent,
    ConnectionListComponent,
    ProfileComponent,
    SapTableListComponent,
    TaskTableComponent,
    TaskActivityComponent,
    SapTablesAdminComponent,
    CreateCustomerUserComponent,
    CustomerUserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule ,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      //positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      timeOut: 5000,
      // newestOnTop: false,
       positionClass: "toast-top-center",
      // closeButton: true,
      //toastClass: "animated fadeInDown",
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
