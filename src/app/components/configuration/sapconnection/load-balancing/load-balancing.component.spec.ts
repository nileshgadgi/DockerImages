import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadBalancingComponent } from './load-balancing.component';

describe('LoadBalancingComponent', () => {
  let component: LoadBalancingComponent;
  let fixture: ComponentFixture<LoadBalancingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadBalancingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadBalancingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
