import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SapTablesAdminComponent } from './sap-tables-admin.component';

describe('SapTablesAdminComponent', () => {
  let component: SapTablesAdminComponent;
  let fixture: ComponentFixture<SapTablesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SapTablesAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SapTablesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
