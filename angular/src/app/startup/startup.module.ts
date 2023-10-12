import { WorkspaceHistoryLocalComponent } from './components/workspace-history-local/workspace-history-local.component';
import { WorkspaceHistoryGitComponent } from './components/workspace-history-git/workspace-history-git.component';
import { StartupRoutingModule } from './startup-routing.module';
import { StartupComponent } from './startup.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    StartupComponent,
    WorkspaceHistoryLocalComponent,
    WorkspaceHistoryGitComponent,
  ],
  imports: [CommonModule, StartupRoutingModule],
})
export class StartupModule {}
