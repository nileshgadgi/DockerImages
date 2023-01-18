import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DD02L } from 'src/app/models/dd02l.model';
import { DD03L } from 'src/app/models/dd03l.model';
import { GetTable } from 'src/app/models/getTable.model';
import { SAPTableCustomer } from 'src/app/models/sapTableCustomer.model';
import { SAPTableDetailCustomer } from 'src/app/models/sapTableDetailCustomer.model';
import { User } from 'src/app/models/user.model';
import { DataloaderapiService } from 'src/app/services/dataloaderapi.service';
import { SecurityapiService } from 'src/app/services/securityapi.service';

@Component({
  selector: 'app-sap-tables-admin',
  templateUrl: './sap-tables-admin.component.html',
  styleUrls: ['./sap-tables-admin.component.css']
})
export class SapTablesAdminComponent implements OnInit {
  searchValue: string = '';
  searchValueFields: string = '';
  tables: DD02L[] = [];
  details: DD03L[] = [];
  generalDetails: DD03L[] = [];
  table: DD02L = new DD02L();
  justStaticOnes:boolean=true;
  currentUser:User=new User();
  isNotPossibleToAddNewTable:boolean=false;
  constructor(public dataloaderapiService: DataloaderapiService,
    private toastr: ToastrService,public securityapiService:SecurityapiService) {}

  searchFields() {
      if(this.searchValueFields!==''){
        this.details = this.generalDetails.filter(x=>x.fieldname.toLowerCase().includes(this.searchValueFields.toLowerCase()));
      }
      else
      {
        this.details = this.generalDetails;
      }
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
    this.isNotPossibleToAddNewTable = !(this.tables.length==0 && this.searchValue!='');
  }
  chooseTable(table: DD02L) {
    this.table = table;
    this.getTableDetails(table);
  }
  getTableDetails(table: DD02L) {
    let getTable = new GetTable();
    getTable.TABName = table.tabname;
    getTable.customerUserId = this.currentUser.id;
    this.dataloaderapiService.geTableDetailAdmin(getTable).then((data) => {
      this.generalDetails=data;
      this.details=this.generalDetails;
    });
  }
  saveSAPTableDetailCustomer(){
    let itemsChecked = this.generalDetails.filter((x: any) => {
      return x.isChecked;
    });

    this.dataloaderapiService.updateDD03lItems(itemsChecked).then((response)=>{
      if(response){
        this.toastr.success('New items were saved!', 'Successfully!');
      }
      else{
        this.toastr.error('There was an error!', 'Error!');
      }
    })
  }

  saveChanges() {
    this.saveSAPTableDetailCustomer();
  }

  checkEvent(isChecked: boolean, item: DD03L) {
    const foundItem = this.generalDetails.find((obj) => {
      return obj.fieldname === item.fieldname;
    });

    if (foundItem != undefined) {
      let index = this.generalDetails.indexOf(foundItem);

      foundItem.isChecked = !isChecked;

      this.generalDetails[index] = foundItem;
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
  ngOnInit(): void {
    this.onGetUser();
    this.getSession();
    this.validateToAddNewTable();
  }
}
