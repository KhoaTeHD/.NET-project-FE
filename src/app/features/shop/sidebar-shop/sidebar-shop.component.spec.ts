import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarShopComponent } from './sidebar-shop.component';

describe('SidebarShopComponent', () => {
  let component: SidebarShopComponent;
  let fixture: ComponentFixture<SidebarShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
