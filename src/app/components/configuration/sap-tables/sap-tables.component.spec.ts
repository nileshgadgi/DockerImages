import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SapTablesComponent } from './sap-tables.component';

describe('SapTablesComponent', () => {
  let component: SapTablesComponent;
  let fixture: ComponentFixture<SapTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SapTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SapTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
