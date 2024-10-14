import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSupplierComponent } from './manage-supplier.component';

describe('ManageSupplierComponent', () => {
  let component: ManageSupplierComponent;
  let fixture: ComponentFixture<ManageSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSupplierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
