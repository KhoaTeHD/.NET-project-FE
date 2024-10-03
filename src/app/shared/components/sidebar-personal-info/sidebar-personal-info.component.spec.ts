import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPersonalInfoComponent } from './sidebar-personal-info.component';

describe('SidebarPersonalInfoComponent', () => {
  let component: SidebarPersonalInfoComponent;
  let fixture: ComponentFixture<SidebarPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarPersonalInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
