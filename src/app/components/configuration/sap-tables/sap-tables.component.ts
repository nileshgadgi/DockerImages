import { filter } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { DD02L } from './../../../models/dd02l.model';
import { Component, OnInit } from '@angular/core';
import { DataloaderapiService } from 'src/app/services/dataloaderapi.service';
import { GetTable } from 'src/app/models/getTable.model';
import { DD03L } from 'src/app/models/dd03l.model';
import { SAPTableCustomer } from 'src/app/models/sapTableCustomer.model';
import { SAPTableDetailCustomer } from 'src/app/models/sapTableDetailCustomer.model';
import { SecurityapiService } from 'src/app/services/securityapi.service';
import { User } from 'src/app/models/user.model';
import { TableDetailWhereClause } from 'src/app/models/tableDetailWhereClause.model';
import { GetTableDetailWhereClause } from 'src/app/models/getTableDetailWhereClause.model';
import { GetTableCustomers } from 'src/app/models/getTableCustomers.model';
import { TableDetailJoinClause } from 'src/app/models/tableDetailJoinClause.model';

@Component({
  selector: 'app-sap-tables',
  templateUrl: './sap-tables.component.html',
  styleUrls: ['./sap-tables.component.css'],
})
export class SapTablesComponent implements OnInit {
  searchValue: string = '';
  searchValueNoSelected: string = '';
  searchValueSelected: string = '';
  tables: DD02L[] = [];
  generalDetails: DD03L[] = [];
  details: DD03L[] = [];
  detailsSelected: DD03L[] = [];
  whereClauseItems: TableDetailWhereClause[] = [];
  joinClauseItems: TableDetailJoinClause[] = [];
  table: DD02L = new DD02L();
  justStaticOnes:boolean=true;
  currentUser:User=new User();
  isNotPossibleToAddNewTable:boolean=false;
  actions: string[] = ['Equal','Not Equal'];
  joinActions: string[] = ['Exist','Not Exist'];
  sapTableCustomerList:SAPTableCustomer[]=[];
  whereClause: string = '';
  constructor(public dataloaderapiService: DataloaderapiService,
    private toastr: ToastrService,public securityapiService:SecurityapiService) {}
  searchNoSelected() {
    if(this.searchValueNoSelected!=='')
      this.details = this.generalDetails.filter(x=>!x.isChecked && x.fieldname.toLowerCase().includes(this.searchValueNoSelected.toLowerCase()));
    else
      this.details = this.generalDetails.filter(x=>!x.isChecked);
  }
  searchSelected() {
    if(this.searchValueSelected!=='')
      this.detailsSelected = this.generalDetails.filter(x=>x.isChecked && x.fieldname.toLowerCase().includes(this.searchValueSelected.toLowerCase()));
    else
      this.detailsSelected = this.generalDetails.filter(x=>x.isChecked);
  }
  search() {
    let getTable = new GetTable();
    getTable.TABName = this.searchValue;
    getTable.customerUserId = this.currentUser.id;
    getTable.JustStaticOnes = this.justStaticOnes;
    this.dataloaderapiService.geTables(getTable).then((data) => {
      this.tables = data;
      this.validateToAddNewTable();
    });
  }
  validateToAddNewTable(){
    this.isNotPossibleToAddNewTable = !(this.tables.length==0 && this.searchValue!='' && this.currentUser.isAdmin);
  }
  chooseTable(table: DD02L) {
    this.table = table;
    this.loadWhereClauseItems(this.table.tabname);
    this.getTableDetails(table);
  }
  getTableDetails(table: DD02L) {
    let getTable = new GetTable();
    getTable.TABName = table.tabname;
    getTable.customerUserId = this.currentUser.id;
    this.dataloaderapiService.geTableDetail(getTable).then((data) => {
      this.generalDetails=data;
      this.loadData();
    });
  }
  loadData(){
    this.details = this.generalDetails.filter(x=>!x.isChecked);
    this.detailsSelected = this.generalDetails.filter(x=>x.isChecked);
    if(this.table.tabname!=='')
      this.loadWhereClauseItems(this.table.tabname);
    this.loadtemplates();
  }
  saveSAPTableCustomer(){
    let sapTableCustomer = new SAPTableCustomer();
    sapTableCustomer.customerUserId = this.currentUser.id;
    sapTableCustomer.tabname = this.table.tabname;
    this.dataloaderapiService
      .saveSAPTableCustomer(sapTableCustomer)
      .then((response) => {
        if (response) {
          this.saveSAPTableDetailCustomer(sapTableCustomer);
        }
        else{
          this.toastr.error('There was an error!', 'Error!');
        }
      });
  }

  saveSAPTableDetailCustomer(sapTableCustomer:SAPTableCustomer){
    let sapTableDetailCustomerArr: SAPTableDetailCustomer[] = [];

    let itemsChecked = this.generalDetails.filter((x: any) => {
      return x.isChecked;
    });

    itemsChecked.forEach((item) => {
      let sapTableDetailCustomer= new SAPTableDetailCustomer();
      sapTableDetailCustomer.customerUserId = this.currentUser.id;
      sapTableDetailCustomer.FIELDNAME = item.fieldname;
      sapTableDetailCustomer.TABNAME = item.tabname;
      sapTableDetailCustomer.isChecked = item.isChecked;
      sapTableDetailCustomer.whereAction = item.whereAction;
      sapTableDetailCustomerArr.push(sapTableDetailCustomer);
    });
    this.dataloaderapiService.saveSAPTableDetailCustomer(sapTableDetailCustomerArr).then((response)=>{
      if(response){
        this.toastr.success('New items were saved!', 'Successfully!');
      }
      else{
        this.toastr.error('There was an error!', 'Error!');
      }
    })
  }

  saveChanges() {
    this.saveSAPTableCustomer();
  }

  checkEvent(isChecked: boolean, item: DD03L) {
    const foundItem = this.generalDetails.find((obj) => {
      return obj.fieldname === item.fieldname;
    });

    if (foundItem != undefined) {
      let index = this.generalDetails.indexOf(foundItem);

      foundItem.isChecked = !isChecked;

      this.generalDetails[index] = foundItem;
      this.loadData();
    }
  }
  addTable(){
    console.error(this.searchValue);
    this.validateToAddNewTable();
  }
  onGetUser(): void {
    this.securityapiService.user$.subscribe((response) => {
      if(response!==null || response !==undefined){
        this.currentUser = response;
      }
    });
  }
  getSession(){
    this.securityapiService.getSession();
  }
  createNewWhereClauseItem(field:any){
    var clone = { ...field };
    this.whereClauseItems.push(clone);
    this.whereClauseItems=this.orderItems(this.whereClauseItems);
  }
  createNewJoinClauseItem(field:any){
    var clone = { ...field };
    this.joinClauseItems.push(clone);
    this.joinClauseItems=this.orderItems(this.joinClauseItems);
  }
  orderItems(list:any[]):any[]{
    list= list.sort((a, b) => a.fieldname.localeCompare(b.fieldname));
    return list;
  }
  saveWhereClause(){
    var itemToSave = this.whereClauseItems.filter(x=>x.value!==undefined && x.value!=='' && x.value!==null);

    this.dataloaderapiService.saveTableDetailWhereClause(itemToSave).then((response)=>{
      if(response){
        this.toastr.success('New items were saved!', 'Successfully!');
      }
      else{
        this.toastr.error('There was an error!', 'Error!');
      }
    })
  }
  saveJoinClause(){
    var itemToSave = this.joinClauseItems.filter(x=>x.sapTableDetailCustomerId!==0);

    this.dataloaderapiService.saveTableDetailJoinClause(itemToSave).then((response)=>{
      if(response){
        this.toastr.success('New items were saved!', 'Successfully!');
      }
      else{
        this.toastr.error('There was an error!', 'Error!');
      }
    })
  }
  loadWhereClauseItems(tabName:string){

    let getTableDetailWhereClause = new GetTableDetailWhereClause();
    getTableDetailWhereClause.customerUserId=this.currentUser.id;
    getTableDetailWhereClause.tabname=tabName;
    this.dataloaderapiService.getTableDetailWhereClause(getTableDetailWhereClause).then((data)=>{
      this.whereClauseItems=data;
      this.addWhereClauseItemsEmpty();
    })
  }
  addWhereClauseItemsEmpty(){
    this.detailsSelected.forEach(x=>{
      let tableDetailWhereClause=new TableDetailWhereClause();
      tableDetailWhereClause.fieldname=x.fieldname;
      tableDetailWhereClause.tabname=x.tabname;
      tableDetailWhereClause.customerUserId=this.currentUser.id;
      tableDetailWhereClause.value = '';
      tableDetailWhereClause.action = '';
      if(this.whereClauseItems.filter(xx=>xx.fieldname===tableDetailWhereClause.fieldname).length===0)
        this.whereClauseItems.push(tableDetailWhereClause);
    })
  }
  loadtemplates() {
    let getTableCustomers = new GetTableCustomers();
    getTableCustomers.customerUserId = this.currentUser.id;
    this.dataloaderapiService.getSAPTableCustomers(getTableCustomers).then((data)=>{
      this.sapTableCustomerList=data;
    })
  }
  ngOnInit(): void {
    this.onGetUser();
    this.getSession();
    this.validateToAddNewTable();
  }
}
