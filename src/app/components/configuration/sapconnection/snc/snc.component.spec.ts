import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SncComponent } from './snc.component';

describe('SncComponent', () => {
  let component: SncComponent;
  let fixture: ComponentFixture<SncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SncComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
