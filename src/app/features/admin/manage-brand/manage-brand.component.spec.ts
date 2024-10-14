import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBrandComponent } from './manage-brand.component';

describe('ManageBrandComponent', () => {
  let component: ManageBrandComponent;
  let fixture: ComponentFixture<ManageBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
