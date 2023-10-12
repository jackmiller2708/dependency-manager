import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationVerticalComponent } from './navigation-vertical.component';

describe('NavigationVerticalComponent', () => {
  let component: NavigationVerticalComponent;
  let fixture: ComponentFixture<NavigationVerticalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavigationVerticalComponent]
    });
    fixture = TestBed.createComponent(NavigationVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
