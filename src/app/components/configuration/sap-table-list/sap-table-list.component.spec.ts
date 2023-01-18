import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SapTableListComponent } from './sap-table-list.component';

describe('SapTableListComponent', () => {
  let component: SapTableListComponent;
  let fixture: ComponentFixture<SapTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SapTableListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SapTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
