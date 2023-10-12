import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceHistoryGitComponent } from './workspace-history-git.component';

describe('WorkspaceHistoryGitComponent', () => {
  let component: WorkspaceHistoryGitComponent;
  let fixture: ComponentFixture<WorkspaceHistoryGitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspaceHistoryGitComponent]
    });
    fixture = TestBed.createComponent(WorkspaceHistoryGitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
