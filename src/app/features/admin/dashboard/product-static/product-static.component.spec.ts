import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStaticComponent } from './product-static.component';

describe('ProductStaticComponent', () => {
  let component: ProductStaticComponent;
  let fixture: ComponentFixture<ProductStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductStaticComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
