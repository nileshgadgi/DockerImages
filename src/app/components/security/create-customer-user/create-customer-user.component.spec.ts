import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerUserComponent } from './create-customer-user.component';

describe('CreateCustomerUserComponent', () => {
  let component: CreateCustomerUserComponent;
  let fixture: ComponentFixture<CreateCustomerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCustomerUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCustomerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
