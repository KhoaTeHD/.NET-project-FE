import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialItemShopComponent } from './special-item-shop.component';

describe('SpecialItemShopComponent', () => {
  let component: SpecialItemShopComponent;
  let fixture: ComponentFixture<SpecialItemShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialItemShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialItemShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
