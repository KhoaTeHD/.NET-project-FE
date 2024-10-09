import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeComponent } from './size.component';

describe('SizeComponent', () => {
  let component: SizeComponent;
  let fixture: ComponentFixture<SizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
