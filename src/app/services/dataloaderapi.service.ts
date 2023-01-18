import { SAPTableCustomer } from 'src/app/models/sapTableCustomer.model';
import { SAPTableDetailCustomer } from './../models/sapTableDetailCustomer.model';
import { SapconnectionComponent } from './../components/configuration/sapconnection/sapconnection.component';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  HttpClient
} from '@angular/common/http';
import { GetTable } from '../models/getTable.model';
import { DD03L } from '../models/dd03l.model';
import { DD02L } from '../models/dd02l.model';
import { SAPConnection } from '../models/sapConnection.model';
import { CustomerConfiguration } from '../models/customerConfiguration.model';
import { GetCustomerConfiguration } from '../models/getCustomerConfiguration.model';
import { GetSAPConnection } from '../models/getSAPConnection.model';
import { ExtractionTask } from '../models/extractionTask.model';
import { GetExtractionTask } from '../models/getExtractionTask.model';
import { BehaviorSubject } from 'rxjs';
import { GetTableCustomers } from '../models/getTableCustomers.model';
import { TableDetailWhereClause } from '../models/tableDetailWhereClause.model';
import { GetTableDetailWhereClause} from '../models/getTableDetailWhereClause.model';
import { GetTableDetailJoinClause } from '../models/getTableDetailJoinClause.model';
import { TableDetailJoinClause } from '../models/tableDetailJoinClause.model';

@Injectable({
  providedIn: 'root'
})
export class DataloaderapiService {
  private _ServiceURL: string;
  public menuPath = new BehaviorSubject<string>('');
  public menuPath$ = this.menuPath.asObservable();

  constructor(private _http: HttpClient) {
    this._ServiceURL = `${environment.mainAPI}`;
  }
  setMenuPath(path:string){
    this.menuPath.next(path);
  }
  geTables(getTable: GetTable): Promise<DD02L[]> {
    return this._http
      .post(`${this._ServiceURL}/DataLoader/SAP/GetTables`,  getTable )
      .toPromise()
      .then((result: any) =>{
        return result;
        })
      .catch(function (result) {});
  }

  geTableDetail(getTable: GetTable): Promise<DD03L[]> {
    return this._http
      .post(`${this._ServiceURL}/DataLoader/SAP/GetTable/Detail`, getTable )
      .toPromise()
      .then((result: any) =>{
        return result;
        })
      .catch(function (result) {});
  }
  geTableDetailAdmin(getTable: GetTable): Promise<DD03L[]> {
    return this._http
      .post(`${this._ServiceURL}/DataLoader/SAP/GetTable/Detail/Admin`, getTable )
      .toPromise()
      .then((result: any) =>{
        return result;
        })
      .catch(function (result) {});
  }
  testSAPConnection(sapConnection: SAPConnection): Promise<boolean> {
    return this._http
      .post(`${this._ServiceURL}/DataLoader/SAP/TestConnection`, sapConnection )
      .toPromise()
      .then((result: any) =>{
        return result;
        })
      .catch(function (result) {});
  }

  saveSAPTableCustomer(sapTableCustomer: SAPTableCustomer): Promise<boolean> {
    return this._http
      .post(`${this._ServiceURL}/DataLoader/SAP/TableCustomer`, sapTableCustomer )
      .toPromise()
      .then((result: any) =>{
        return result;
        })
      .catch(function (result) {});
  }

  saveSAPTableDetailCustomer(sapTableDetailCustomer: SAPTableDetailCustomer[]): Promise<boolean> {
    return this._http
      .post(`${this._ServiceURL}/DataLoader/SAP/TableDetailCustomer`, sapTableDetailCustomer )
      .toPromise()
      .then((result: any) =>{
        return result;
        })
      .catch(function (result) {});
  }

  saveCustomerConfiguration(customerConfiguration: CustomerConfiguration): Promise<boolean> {
    return this._http
      .post(`${this._ServiceURL}/DataLoader/Configuration/Save`, customerConfiguration )
      .toPromise()
      .then((result: any) =>{
        return result;
        })
      .catch(function (result) {});
  }

  getCustomerConfiguration(getCustomerConfiguration:GetCustomerConfiguration):Promise<CustomerConfiguration> {
    return this._http
    .post(`${this._ServiceURL}/DataLoader/Configuration`, getCustomerConfiguration )
    .toPromise()
    .then((result: any) =>{
      return result;
      })
    .catch(function (result) {});
  }

  saveSAPConfiguration(sapConnection: SAPConnection): Promise<boolean> {
    return this._http
      .post(`${this._ServiceURL}/DataLoader/SAP/SAPConfiguration/Save`, sapConnection )
      .toPromise()
      .then((result: any) =>{
        return result;
        })
      .catch(function (result) {});
  }

  getSAPConnection(getSAPConnection: GetSAPConnection): Promise<SAPConnection> {
    return this._http
      .post(`${this._ServiceURL}/DataLoader/SAP/SAPConfiguration/${getSAPConnection.uuid}`, getSAPConnection )
      .toPromise()
      .then((result: any) =>{
        return result;
        })
      .catch(function (result) {});
  }

  getAllSAPConnections(getSAPConnection: GetSAPConnection): Promise<SAPConnection[]> {
    return this._http
      .post(`${this._ServiceURL}/DataLoader/SAP/SAPConfiguration`, getSAPConnection )
      .toPromise()
      .then((result: any) =>{
        return result;
        })
      .catch(function (result) {});
  }

  saveExtractionTask(extractionTask: ExtractionTask): Promise<boolean> {
    return this._http
      .post(`${this._ServiceURL}/DataLoader/ExtractionTask/Save`, extractionTask )
      .toPromise()
      .then((result: any) =>{
        return result;
        })
      .catch(function (result) {});
  }
  getExtractionTaskByID(getExtractionTask: GetExtractionTask): Promise<ExtractionTask> {
    return this._http
      .post(`${this._ServiceURL}/DataLoader/ExtractionTask/ID`, getExtractionTask )
      .toPromise()
      .then((result: any) =>{
        return result;
        })
      .catch(function (result) {});
  }
  getExtractionTasks(getExtractionTask: GetExtractionTask): Promise<ExtractionTask[]> {
    return this._http
      .post(`${this._ServiceURL}/DataLoader/ExtractionTasks`, getExtractionTask )
      .toPromise()
      .then((result: any) =>{
        return result;
        })
      .catch(function (result) {});
  }
  getSAPTableCustomers(getTableCustomers: GetTableCustomers): Promise<SAPTableCustomer[]> {
    return this._http
      .post(`${this._ServiceURL}/DataLoader/SAP/TableCustomers`, getTableCustomers )
      .toPromise()
      .then((result: any) =>{
        return result;
        })
      .catch(function (result) {});
  }
  updateDD03lItems(dd03lList: DD03L[]): Promise<boolean> {
    return this._http
      .post(`${this._ServiceURL}/DataLoader/SAP/GetTable/Detail/Save`, dd03lList )
      .toPromise()
      .then((result: any) =>{
        return result;
        })
      .catch(function (result) {});
  }
  saveTableDetailWhereClause(tableDetailWhereClauses: TableDetailWhereClause[]): Promise<boolean> {
    return this._http
      .post(`${this._ServiceURL}/DataLoader/SAP/TableDetailWhereClause`, tableDetailWhereClauses )
      .toPromise()
      .then((result: any) =>{
        return result;
        })
      .catch(function (result) {});
  }
  getTableDetailWhereClause(getTableDetailWhereClauseDTO: GetTableDetailWhereClause): Promise<TableDetailWhereClause[]> {
    return this._http
      .post(`${this._ServiceURL}/DataLoader/SAP/TableDetailWhereClauses`, getTableDetailWhereClauseDTO )
      .toPromise()
      .then((result: any) =>{
        return result;
        })
      .catch(function (result) {});
  }
  saveTableDetailJoinClause(tableDetailWhereClauses: TableDetailJoinClause[]): Promise<boolean> {
    return this._http
      .post(`${this._ServiceURL}/DataLoader/SAP/TableDetailJoinClause`, tableDetailWhereClauses )
      .toPromise()
      .then((result: any) =>{
        return result;
        })
      .catch(function (result) {});
  }
  getTableDetailJoinClause(getTableDetailWhereClause: GetTableDetailJoinClause): Promise<TableDetailJoinClause[]> {
    return this._http
      .post(`${this._ServiceURL}/DataLoader/SAP/TableDetailJoinClauses`, getTableDetailWhereClause )
      .toPromise()
      .then((result: any) =>{
        return result;
        })
      .catch(function (result) {});
  }
}


