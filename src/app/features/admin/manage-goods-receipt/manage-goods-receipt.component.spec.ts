import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGoodsReceiptComponent } from './manage-goods-receipt.component';

describe('ManageGoodsReceiptComponent', () => {
  let component: ManageGoodsReceiptComponent;
  let fixture: ComponentFixture<ManageGoodsReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageGoodsReceiptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageGoodsReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
