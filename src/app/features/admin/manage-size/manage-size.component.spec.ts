import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSizeComponent } from './manage-size.component';

describe('ManageSizeComponent', () => {
  let component: ManageSizeComponent;
  let fixture: ComponentFixture<ManageSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
