import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBarComponent } from './mobile-bar.component';

describe('MobileBarComponent', () => {
  let component: MobileBarComponent;
  let fixture: ComponentFixture<MobileBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileBarComponent]
    });
    fixture = TestBed.createComponent(MobileBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
