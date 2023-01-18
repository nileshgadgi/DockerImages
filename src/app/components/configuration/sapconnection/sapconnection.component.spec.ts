import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SapconnectionComponent } from './sapconnection.component';

describe('SapconnectionComponent', () => {
  let component: SapconnectionComponent;
  let fixture: ComponentFixture<SapconnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SapconnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SapconnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
