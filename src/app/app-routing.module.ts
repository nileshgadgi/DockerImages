import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { NotfoundComponent } from './components/common/notfound/notfound.component';
import { GeneralConfigurationComponent } from './components/configuration/general-configuration/general-configuration.component';
import { SapTableListComponent } from './components/configuration/sap-table-list/sap-table-list.component';
import { SapTablesAdminComponent } from './components/configuration/sap-tables-admin/sap-tables-admin.component';
import { SapTablesComponent } from './components/configuration/sap-tables/sap-tables.component';

import { ConnectionListComponent } from './components/configuration/sapConnection/connection-list/connection-list.component';

import { SapconnectionComponent } from './components/configuration/sapconnection/sapconnection.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateCustomerUserComponent } from './components/security/create-customer-user/create-customer-user.component';
import { CustomerUserListComponent } from './components/security/customer-user-list/customer-user-list.component';
import { ProfileComponent } from './components/security/profile/profile.component';
import { CreateTaskComponent } from './components/task/create-task/create-task.component';
import { TaskListComponent } from './components/task/task-list/task-list.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
      path: 'profile',
      component: ProfileComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'tasks',
        component: TaskListComponent
      },
      {
        path: 'task/create',
        component: CreateTaskComponent
      },
      {
        path: 'configuration/sap',
        component: ConnectionListComponent
      },
      {
        path: 'configuration/sap/tables',
        component: SapTablesComponent
      },
      {
        path: 'configuration/sap/customerTables',
        component: SapTableListComponent
      },
      {
        path: 'configuration/sap/connection/:uuid',
        component: SapconnectionComponent
      },
      {
        path: 'configuration/sap/connection',
        component: SapconnectionComponent
      },
      {
        path: 'configuration',
        component: GeneralConfigurationComponent
      },
      {
        path: 'configuration/sap/tables/admin',
        component: SapTablesAdminComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'users',
        component: CustomerUserListComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'user',
        component: CreateCustomerUserComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'user/:uuid',
        component: CreateCustomerUserComponent,
        canActivate:[AuthGuard]
      },
    ]
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
