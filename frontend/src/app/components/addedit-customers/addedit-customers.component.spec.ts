import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditCustomersComponent } from './addedit-customers.component';

describe('AddeditCustomersComponent', () => {
  let component: AddeditCustomersComponent;
  let fixture: ComponentFixture<AddeditCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddeditCustomersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddeditCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
