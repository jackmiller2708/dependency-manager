import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceHistoryLocalComponent } from './workspace-history-local.component';

describe('WorkspaceHistoryLocalComponent', () => {
  let component: WorkspaceHistoryLocalComponent;
  let fixture: ComponentFixture<WorkspaceHistoryLocalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspaceHistoryLocalComponent]
    });
    fixture = TestBed.createComponent(WorkspaceHistoryLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
